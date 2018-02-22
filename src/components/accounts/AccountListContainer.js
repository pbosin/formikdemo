import React from 'react';
import {AccountList} from './AccountList';
import AccountService from '../../utils/AccountService';

export class AccountListContainer extends React.Component {
  state = { accounts: [] };

  componentDidMount() {
    AccountService.getAccounts().then(result => {
      this.setState({accounts: result});
    });
  }

  deleteAccount(account) {
    AccountService.deleteAccount(account.id).then(() => {
      this.componentDidMount();
    });
  }

  render() {
    return (
        <AccountList
            accounts={this.state.accounts}
            deleteAccount={this.deleteAccount.bind(this)}
        />
    )
  }
}
