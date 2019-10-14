import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Login from '../components/login/Login';
import MyIndex from '../components/MyIndex';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" to='/login' exact/>
                <Route path="/login" exact component={Login}/>
                <Route path="/my/index" component={MyIndex}/>
            </Switch>
        </BrowserRouter>
    )
};

export default AppRouter;
