import React from 'react';
import { Redirect } from 'react-router';
import { withFormik } from 'formik';
import Yup from 'yup';
import {AccountDetail} from './AccountDetail';
import AccountService from '../../utils/AccountService';

const FormContainer = withFormik({
  mapPropsToValues: props => {
    return {
      account: props.account || AccountService.getBlankAccount(),
      name: props.name,
      save: props.save
    }},
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required')
  }),
  // handleSubmit takes form values and formicBag, from which we take setErrors and form component props
  handleSubmit(values, {setErrors, props}) {
    if(!values.name) {
      setErrors({name: 'Please enter account name'})
    } else {
      values.save(Object.assign(props.account, {name: values.name}));
    }
  }
})(AccountDetail);


export class AccountDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {account: {}, newName: '', redirect: false};
    this.accountId = parseInt(props.match.params.id);
  }

  componentDidMount() {
    if (this.accountId) {
      AccountService.getAccount(this.accountId).then(result => {
        this.setState({account: result});
        this.setState({newName: result.name});
      });
    } else {
      this.setState({account: AccountService.getBlankAccount()});
    }
  }

  save(account) {
    AccountService.saveAccount(account).then(() => {
      this.setState({redirect: true});
    });
  }

  render() {
    // not elegant, but the best imho way to programmatically redirect to the list; react-router should do better :(
    if (this.state.redirect) {
      return <Redirect to="/accounts" push={true}/>
    }
    // save is passed to FormContainer to be called within handleSubmit and to be able to set state.redirect
    // name is passed separately from account since formik maps tag properties by default
    return (
        <FormContainer name={this.state.newName} account={this.state.account} save={this.save.bind(this)}/>
    );
  }

}

