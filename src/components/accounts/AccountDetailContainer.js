import React from 'react';
import { Redirect } from 'react-router';
import AccountDetail from './AccountDetail';
import AccountService from '../../utils/AccountService';

export class AccountDetailContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      account: {}, // object, which properties pre-populate the form
      newName: '', // model for input binding
      redirect: false // react-router hacky way to make redirects work
    };
    this.accountId = parseInt(props.match.params.id, 10); // router puts url params in props.match.params
  }

  componentDidMount() {
    if (this.accountId) {
      AccountService.getAccount(this.accountId).then(result => {
        this.setState({account: result, newName: result.name});
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
    // not elegant, but the best known way to programmatically redirect to the list; react-router should do better :(
    if (this.state.redirect) {
      return <Redirect to="/accounts" push={true}/>
    }
    // save is passed to FormContainer to be called within handleSubmit and to be able to set state.redirect
    // name is passed separately from account since formik maps tag properties by default
    return (
        <AccountDetail name={this.state.newName} account={this.state.account} save={this.save.bind(this)}/>
    );
  }

}

