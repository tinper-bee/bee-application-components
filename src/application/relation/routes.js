import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import MainPage from './Main';

export default (
    <Router history={hashHistory}>
        <Route path="/" component={MainPage}/>
        <IndexRoute component={Home}/>
        <Route path="time" component={Time} />
        <Route path="organize" component={Organize} />
        <Route path="employee" component={Employee} />
    </Router>
)




