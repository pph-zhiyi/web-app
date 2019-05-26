import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../components/Login';
import Sider from '../components/Sider';
import AntdTest from '../components/AntdTest';
import SiderIndex from '../pages/SiderIndex';
import MyIndex from '../pages/myIndex';
import UserList from '../pages/user/UserList';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/index" component={SiderIndex} />
            <Route  path="/my_index" component={MyIndex}></Route>

            <Route path="/antd" component={AntdTest} />
            <Route path="/sider" component={Sider} />
            <Route path="/user/list" component={UserList} />
        </BrowserRouter>
    )
}

export default AppRouter;
