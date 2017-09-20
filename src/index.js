import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory,IndexRoute} from 'react-router';
import Main from './containers/Main';
import wrapperComponent  from './components/wrapperComponent';
import Relation from './application/relation/Main';

import './assets/css/index.css';
import './assets/css/md.css';

render((
    <Router history={hashHistory}>
        <Route path="/" component={Main} />
        <Route path="relation" component={wrapperComponent(Relation,'relation')} />
    </Router>
), document.getElementById('app'));
