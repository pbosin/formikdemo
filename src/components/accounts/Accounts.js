import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AccountListContainer} from './AccountListContainer';
import {AccountDetailContainer} from './AccountDetailContainer';
import {AccountInvoiceListContainer} from './AccountInvoiceListContainer';
import {AccountInvoiceDetailContainer} from './AccountInvoiceDetailContainer';

const Accounts = () => (
    <div className="main-content">
      <h1> Accounts </h1>
      <Switch>
        <Route exact path='/accounts' component={AccountListContainer}/>
        <Route exact path='/accounts/:id' component={AccountDetailContainer}/>
        <Route exact path='/accounts/:id/invoices' component={AccountInvoiceListContainer}/>
        <Route exact path='/accounts/:id/invoices/:invoiceid' component={AccountInvoiceDetailContainer}/>
      </Switch>
    </div>
);

export default Accounts;