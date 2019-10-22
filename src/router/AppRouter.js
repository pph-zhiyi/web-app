import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from '../components/login/Login';
import App from '../components/App';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" to='/login' exact/>
                <Route path="/login" exact component={Login}/>
                <Route path="/app" component={App}/>
            </Switch>
        </BrowserRouter>
    )
};

export default AppRouter;
