import React from 'react';
import { Layout, Menu, Icon, Alert } from 'antd';
import '../App.css';
import UserList from './user/UserList';
import AntdTest from '../components/AntdTest';
import { Link, Route, BrowserRouter } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class MyIndex extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible >
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['userList']} mode="inline">
                            <Menu.Item key="index">
                                <Link to="/" />
                                <span style={{ fontSize: 20, marginLeft: 48 }}> 锤子 </span>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <Icon type="desktop" />
                                <span><a href="/"> 登录 / 切换账号 </a></span>
                            </Menu.Item>
                            <SubMenu
                                key="user"
                                title={
                                    <span>
                                        <Icon type="user" />
                                        <span>User</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="userList" > <Link to="/user/list" >用户管理列表 </Link></Menu.Item>
                                <Menu.Item key="antdTest" >  <Link to="/antd/test" >ANTD test </Link> </Menu.Item>
                                <Menu.Item key="5"> Alex </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="team" />
                                        <span>Team</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="6">Team 1</Menu.Item>
                                <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                                <Icon type="file" />
                                <span>File</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} >
                            <div>
                                <Alert style={{ marginTop: 12, textAlign: "center" }}
                                    message="玩个 🔨 啊"
                                    type="info"
                                    banner="true"
                                     />
                            </div>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Route path="/user/list" component={UserList} />
                            <Route path="/antd/test" component={AntdTest} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            PPH ©2019 Created by Zhiyi
                        </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}