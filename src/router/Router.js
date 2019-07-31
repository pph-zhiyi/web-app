import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from '../pages/login/Login';
import SiderIndex from '../pages/SiderIndex';
import MyIndex from '../pages/myIndex';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/index" component={SiderIndex} />
                <Route path="/my/index" component={MyIndex} />
                <Redirect from="/" to='/login' exact />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;
