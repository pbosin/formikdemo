import axios from 'axios';

class AccountService {

  constructor() {
    axios.defaults.baseURL = 'http://pb-acct-demo.getsandbox.com/'; //'http://thinkful-pb-1.getsandbox.com';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getBlankAccount() {
    return {id: '', name: '', invoices: []};
  }

  getAccounts() {
    return axios.get(`/accounts`).then(response => {
      return response.data;
    });
  }

  getAccount(id) {
    return axios.get(`/accounts/${id}`).then(response => {
      return response.data;
    });
  }

  getInvoice(accountId, invoiceId) {
    return axios.get(`/accounts/${accountId}`).then(response => {
      return response.data && response.data.invoices
          ? response.data.invoices.filter(invoice => invoice.id === invoiceId)[0] || {}
          : {};
    });
  }

  saveAccount(account) {
    if (!account.id) {
      //create new
      return axios.post(`/accounts`, account).then(() => this.getAccounts());
    } else {
      //update
      return axios.post(`/accounts/${account.id}`,account).then(() => this.getAccounts());
    }
  }

  saveInvoice(invoice) {
    if (!invoice.id) {
      //create new
      return axios.post(`/accounts/${invoice.accountId}/invoices`, invoice).then(() => this.getAccounts());
    } else {
      //update
      return axios.post(`/accounts/${invoice.accountId}/invoices/${invoice.id}`,invoice).then(() => this.getAccounts());
    }
  }

  deleteAccount(accountId) {
    return axios.delete(`/accounts/${accountId}`);
  }

  deleteInvoice(accountId, invoiceId) {
    return axios.delete(`/accounts/${accountId}/invoices/${invoiceId}`);
  }

}
export default new AccountService();