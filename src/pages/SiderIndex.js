import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import '../App.css';
// import UserList from './user/UserList';
// import AntdTest from '../components/AntdTest';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderIndex extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         collapsed: false,
    //         content: <UserList />,
    //         contentKey: {
    //             "userList": <UserList />,
    //             "antdTest": <AntdTest />
    //         }
    //     }
    // }

    // onCollapse = collapsed => {
    //     console.log(collapsed);
    //     this.setState({ collapsed });
    // };

    // changeContent = (key) => {
    //     console.log("key: ", key);
    //     this.setState({ content: this.state.contentKey[key] });
    // }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
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
                            <Menu.Item key="userList" onClick={this.changeContent("userList")}> 用户管理列表 </Menu.Item>
                            <Menu.Item key="antdTest" onClick={this.changeContent("antdTest")}> Bill </Menu.Item>
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
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.state.content}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}> PPH ©2019 Created by Zhiyi</Footer>
                </Layout>
            </Layout>
        );
    }
}