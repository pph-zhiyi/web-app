import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../components/Login';
import Sider from '../components/Sider';
import AntdTest from '../components/AntdTest';
import SiderIndex from '../pages/SiderIndex';
import UserList from '../pages/user/UserList';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={SiderIndex} />
            <Route path="/login" component={Login} />
            <Route path="/antd" component={AntdTest} />
            <Route path="/sider" component={Sider} />
            <Route path="/user/list" component={UserList} />
        </BrowserRouter>
    )
}

export default AppRouter;
