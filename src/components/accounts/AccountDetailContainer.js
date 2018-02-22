import React from 'react';
import { Redirect } from 'react-router';
import { withFormik } from 'formik';
import Yup from 'yup';
import {AccountDetail} from './AccountDetail';
import AccountService from '../../utils/AccountService';

const FormContainer = withFormik({
  mapPropsToValues: props => {
    return {
      account: props.account || {id: 0, name: '', invoices: []},
      name: props.name,
      save: props.save
    }},
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required')
  }),
  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    if(!values.name) {
      setErrors({name: 'Please enter account name'})
    } else {
      values.save(Object.assign(values.account, {name: values.name}));
    }
  }
})(AccountDetail);


export class AccountDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {account: {}, newName: '', redirect: false};
    this.accountId = this.getAccountFromUrl(props.match.params.id);
  }

  getAccountFromUrl(id) {
    let s = id.replace(':','');
    return parseInt(s);
  }

  componentDidMount() {
    if (isNaN(this.accountId)) {
      this.accountId = this.getAccountFromUrl(this.props.match.params.id);
    }
    if (this.accountId > 0) {
      AccountService.getAccount(this.accountId).then(result => {
        this.setState({account: result});
        this.setState({newName: result.name});
      });
    } else {
      this.setState({account: {id: 0, name: '', invoices: []}});
    }
  }

  save(account) {
    AccountService.saveAccount(account).then(() => {
      this.setState({redirect: true});
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/accounts" push={true}/>
    }
    return (
        <FormContainer name={this.state.newName} account={this.state.account} save={this.save.bind(this)}/>
    );
  }

}

