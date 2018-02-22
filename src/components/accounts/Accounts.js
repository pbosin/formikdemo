import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AccountListContainer} from './AccountListContainer';
import {AccountDetailContainer} from './AccountDetailContainer';
import AccountInvoiceList from './AccountInvoiceList';
import AccountInvoiceDetail from './AccountInvoiceDetail';

const Accounts = () => (
    <div style={{marginLeft: '100px'}}>
      <h1> Accounts </h1>
      <Switch>
        <Route exact path='/accounts' component={AccountListContainer}/>
        <Route exact path='/accounts/:id' component={AccountDetailContainer}/>
        <Route exact path='/accounts/:id/invoices' component={AccountInvoiceList}/>
        <Route path='/accounts/:id/invoices/:invoiceid' component={AccountInvoiceDetail}/>
      </Switch>
    </div>
);

export default Accounts;