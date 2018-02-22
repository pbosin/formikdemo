import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Accounts from './accounts/Accounts';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/home' component={Home}/>
      <Route path='/accounts' component={Accounts}/>
    </Switch>
  </main>
)
export default Main;