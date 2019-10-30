import React, {Component} from 'react';
import {Layout, Menu, Icon, Alert, Switch as Swi} from 'antd';
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
        this.state = {
            theme: "light",
            swiColor: "#DACD77",
            collapsed: false
        };
    }

    /**
     * 更换主题
     */
    changeTheme = () => {
        const theme = this.state.theme === "light" ? "dark" : "light";
        const swiColor = this.state.swiColor === "#DACD77" ? "#C0C0C0" : "#DACD77";
        this.setState({
            theme,
            swiColor
        })
    };

    onCollapse = (collapsed) => {
        this.setState({
            collapsed
        });
    };

    render() {
        const pathname = this.props.history.location.pathname;
        const smk = pathname.split('/')[2];

        return (
            <div>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider
                        theme={this.state.theme}
                        width="300"
                        onCollapse={(collapsed) => this.onCollapse(collapsed)}
                        collapsed={this.state.collapsed}
                        collapsible
                    >
                        <div className="logo"/>
                        <Menu
                            theme={this.state.theme}
                            defaultOpenKeys={[smk ? smk : 'user']}
                            mode="inline"
                            selectedKeys={[pathname]}
                        >
                            <Menu.Item className="app-mi-index" key="index">
                                {
                                    this.state.collapsed
                                        ? <span>
                                            <Icon type="apple" />
                                            <span>锤子哦</span>
                                        </span>
                                        : <span>
                                             <Link to="/"/>
                                             <h3> 锤子哦 </h3>
                                          </span>
                                }
                            </Menu.Item>
                            <Menu.Item key="login">
                                <Icon type="desktop"/>
                                <span>
                                    <Link to="/"> 登录 / 切换账号 </Link>
                                    {
                                        this.state.collapsed
                                            ? null
                                            : <Swi
                                                className="app-mi-swi"
                                                style={{background: this.state.swiColor}}
                                                checkedChildren="白"
                                                unCheckedChildren="黑"
                                                onClick={this.changeTheme}
                                                defaultChecked
                                            />

                                    }
                                </span>
                            </Menu.Item>
                            {
                                routerConfigs.map(item => {
                                    return (
                                        <SubMenu
                                            key={item.key}
                                            title={item.title}
                                        >
                                            {
                                                item.mis.map(item => {
                                                    return (
                                                        <Menu.Item key={item.key}>
                                                            <Link to={item.key}> {item.content} </Link>
                                                        </Menu.Item>
                                                    );
                                                })
                                            }
                                        </SubMenu>
                                    );
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className="app-layout-header">
                            <Alert
                                className="app-layout-header-alert"
                                message="玩个 🔨 啊 ....."
                                type="warning"
                            />
                        </Header>
                        <Content className="app-layout-content">
                            <Switch>
                                {
                                    routerConfigs.map(item =>
                                        item.mis.map(item => {
                                            return (
                                                <Route path={item.key} component={item.component}/>
                                            );
                                        })
                                    )
                                }
                                <Redirect from="/app" to='/app/user/list'/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            PPH ©2019 Created by Zhi-yi
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

/**
 * 页面路由配置
 * @type {*[]}
 */
const routerConfigs = [
    {
        key: "user",
        title: <span>
            <Icon type="user"/>
            <span> User </span>
        </span>,
        mis: [
            {
                key: "/app/user/list",
                content: "用户列表",
                component: User
            },
            {
                key: "/app/user/charts",
                content: "图表统计",
                component: UserCharts
            },
            {
                key: "/app/user/antd/date",
                content: "DatePicker",
                component: AntdDatePicker
            }
        ]
    },
    {
        key: "team",
        title: <span>
            <Icon type="loading"/>
            <span> Team </span>
        </span>,
        mis: [
            {
                key: "/app/team/d1",
                content: "我是第一个",
                component: Demo
            },
            {
                key: "/app/team/d2",
                content: "我是第二个",
                component: Demo
            },
            {
                key: "/app/team/d3",
                content: "我是第三个",
                component: Demo
            }
        ]
    },
    {
        key: "file",
        title: <span>
            <Icon type="file"/>
            <span> File </span>
        </span>,
        mis: [
            {
                key: "/app/file/d1",
                content: "我是第一个",
                component: Demo
            }
        ]
    }
];