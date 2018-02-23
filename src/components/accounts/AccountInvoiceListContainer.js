import React from 'react';
import { AccountInvoiceList } from './AccountInvoiceList';
import AccountService from '../../utils/AccountService';

export class AccountInvoiceListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: AccountService.getBlankAccount() };
    this.accountId = parseInt(props.match.params.id);
  }

  componentDidMount() {
    if (this.accountId) {
      AccountService.getAccount(this.accountId).then(result => {
        this.setState({account: result});
      });
    }
  }

  deleteInvoice(accountId, invoiceId) {
    AccountService.deleteInvoice(accountId, invoiceId).then(() => {
      this.componentDidMount();
    });
  }

  render() {
    return (
        <AccountInvoiceList
            account={this.state.account}
            deleteInvoice={this.deleteInvoice.bind(this)}
        />
    )
  }
}
