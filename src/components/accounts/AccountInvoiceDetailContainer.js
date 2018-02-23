import React from 'react';
import { Redirect } from 'react-router';
import AccountInvoiceDetail from './AccountInvoiceDetail';
import AccountService from '../../utils/AccountService';

export class AccountInvoiceDetailContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {account: {}, invoice: {}, redirect: false};
    this.accountId = parseInt(props.match.params.id, 10);
    this.invoiceId = parseInt(props.match.params.invoiceid, 10);
  }

  componentDidMount() {
    if (this.accountId) {
      AccountService.getAccount(this.accountId).then(result => {
        let invoice = (this.invoiceId) ?
            this.findInvoiceById(result.invoices, this.invoiceId) : AccountService.getBlankInvoice();
        this.setState({account: result, invoice: invoice});
      });
    } else {
      // this.setState({account: AccountService.getBlankAccount(), invoice: AccountService.getBlankInvoice()});
    }
  }

  findInvoiceById(invoices, invoiceId) {
    let filteredInvoices = invoices.filter(invoice => invoice.id === invoiceId);
    // if not found, return a blank invoice (antipattern ?)
    return (filteredInvoices.length) ? filteredInvoices[0] : AccountService.getBlankInvoice();
  }

  save(invoice) {
    invoice.accountId = this.state.account.id;
    AccountService.saveInvoice(invoice).then(() => {
      this.setState({redirect: true});
    });
  }

  render() {
    // not elegant, but the best imho way to programmatically redirect to the list; react-router should do better :(
    if (this.state.redirect) {
      return <Redirect to={`/accounts/${this.state.account.id}/invoices`} push={true}/>
    }
    // save is passed to FormContainer to be called within handleSubmit and to be able to set state.redirect
    // name is passed separately from account since formik maps tag properties by default
    return (
        <AccountInvoiceDetail account={this.state.account} invoice={this.state.invoice} save={this.save.bind(this)}/>
    );
  }

}