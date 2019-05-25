import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
import {Router, Redirect, Switch, Route} from 'dva/router';
import dynamic from 'dva/dynamic';

// const AppRouter = () => {
//     return (
//         <BrowserRouter>
//             <Route exact path="/" component={SiderIndex} />
//             <Route path="/login" component={Login} />
//             <Route path="/antd" component={AntdTest} />
//             <Route path="/sider" component={Sider} />
//             <Route path="/user/list" component={UserList} />
//         </BrowserRouter>
//     )
// }

function AppRouter({ history, app }) {
    const UserList = dynamic({
        app,
        models: () => [
            import('./models/UserModel'),
        ],
        component: () => import('./router/user/User'),
    });

    return (
        <Router history={history}>
            <Switch>
                <Redirect from="/" exact to="/base/user" />
                <Route path="/" exact component={UserList} />
                <Route path="/base/user" exact component={UserList} />
            </Switch>
        </Router>
    );
}

export default AppRouter;
