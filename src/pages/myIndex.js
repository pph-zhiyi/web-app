import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import '../App.css';
import UserList from './user/UserList';
import AntdTest from '../components/AntdTest';
import { Link,Route,HashRouter as Router } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class MyIndex extends React.Component {


    render() {
        return (
            <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible 
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['userList']} mode="inline">
                        {/* <Menu.Item key="1">
                            <Link to="/" />
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item> */}
                        <Menu.Item key="1">
                            <Link to="/" />
                            <Icon type="desktop" />
                            <span>登录 / 切换账号</span>
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
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                    <Route path="/user/list" component={UserList} />
                    <Route path="/antd/test" component={AntdTest} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}> PPH ©2019 Created by Zhiyi</Footer>
                </Layout>
            </Layout>

            </Router>
        );
    }
}