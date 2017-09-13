import React from 'react';
import { render } from 'react-dom';
import { Router, Route, createMemoryHistory,hashHistory, IndexRoute } from 'react-router';
import Main from '../containers/Main';
import Organize from '../components/Organize';
import Time from '../components/Time';
import Employee from '../components/Employee';
import Home from '../components/Home';

export default (
  <Router history={hashHistory()}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="time" component={Time} />
      <Route path="organize" component={Organize} />
      <Route path="employee" component={Employee} />
    </Route>
  </Router>
)
