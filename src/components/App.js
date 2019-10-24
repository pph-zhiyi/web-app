import React, {Component} from 'react';
import {Layout, Menu, Icon, Alert} from 'antd';
import '../index.css';
import User from '../components/user/User';
import UserCharts from "./user/UserCharts";
import AntdDatePicker from './demo/AntdDatePicker';
import Demo from "../pages/Demo";
import {Link, Route, Redirect, Switch} from 'react-router-dom';

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const pathname = this.props.history.location.pathname;
        const smk = pathname.split('/')[2];

        return (
            <div>
                <Layout
                    style={{minHeight: '100vh'}}
                >
                    <Sider
                        collapsible
                        theme="light"
                        width="300"
                    >
                        <div className="logo"/>
                        <Menu
                            theme="light"
                            defaultOpenKeys={[smk ? smk : 'user']}
                            mode="inline"
                            selectedKeys={[pathname]}
                        >
                            <Menu.Item key="index">
                                <Link to="/"/>
                                <h3 style={{fontSize: 25, textAlign: "center"}}> 锤子哦 </h3>
                            </Menu.Item>
                            <Menu.Item key="login">
                                <Icon type="desktop"/>
                                <span><a href="/"> 登录 / 切换账号 </a></span>
                            </Menu.Item>
                            <SubMenu
                                key="user"
                                title={
                                    <span>
                                        <Icon type="user"/>
                                        <span> User </span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/app/user/list">
                                    <Link to="/app/user/list"> 用户管理 </Link>
                                </Menu.Item>
                                <Menu.Item key="/app/user/charts">
                                    <Link to="/app/user/charts"> 图表统计 </Link>
                                </Menu.Item>
                                <Menu.Item key="/app/user/antd/date">
                                    <Link to="/app/user/antd/date"> DatePicker </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="team"
                                title={
                                    <span>
                                        <Icon type="team"/>
                                        <span> Team </span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/app/team/d1">
                                    <Link to="/app/team/d1"> 我的第一个 </Link>
                                </Menu.Item>
                                <Menu.Item key="/app/team/d2">
                                    <Link to="/app/team/d2"> 我的第二个 </Link>
                                </Menu.Item>
                                <Menu.Item key="/app/team/d3">
                                    <Link to="/app/team/d3"> 我的第三个 </Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="file">
                                <Icon type="file"/>
                                <span> File </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <div>
                                <Alert
                                    style={{marginTop: 12, textAlign: "center", marginLeft: 10, marginRight: 10}}
                                    message="玩个 🔨 啊..."
                                    type="info"
                                    banner="true"
                                    // closable={true}
                                />
                            </div>
                        </Header>
                        <Content style={{margin: '0 16px'}}>
                            <Switch>
                                <Route path="/app/user/list" component={User}/>
                                <Route path="/app/user/charts" component={UserCharts}/>
                                <Route path="/app/user/antd/date" component={AntdDatePicker}/>
                                <Route path="/app/team/d1" component={Demo}/>
                                <Route path="/app/team/d2" component={Demo}/>
                                <Route path="/app/team/d3" component={Demo}/>
                                <Redirect from="/app" to='/app/user/list'/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            PPH ©2019 Created by Zhiyi
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}