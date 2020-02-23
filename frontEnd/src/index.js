import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import './index.css';
import Player from './Components/Apps/Player';
import PlayerForm from './Components/Apps/PlayerForm';
import ItemSearch from './Components/Apps/ItemSearch';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={withRouter(PlayerForm)}/>
            <Route exact path="/players/:id" component={withRouter(Player)}/>
            <Route exact path="/itemsearch" component={withRouter(ItemSearch)}/>
            <Redirect to="/"/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));