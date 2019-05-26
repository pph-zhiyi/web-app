import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../components/Login';
import SiderIndex from '../pages/SiderIndex';
import MyIndex from '../pages/myIndex';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/index" component={SiderIndex} />
            <Route  path="/my/index" component={MyIndex}></Route>
        </BrowserRouter>
    )
}

export default AppRouter;
