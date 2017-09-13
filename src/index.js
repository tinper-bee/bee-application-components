import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory,IndexRoute} from 'react-router';
import Main from './containers/Main';
import Relation from './application/relation/Main';

import './assets/css/index.css';

render((
    <Router history={hashHistory}>
        <Route path="/" component={Main} />
        <Route path="relation" component={Relation} />
    </Router>
), document.getElementById('app'));
