import React, {Component, Fragment} from 'react';
import {Layout, Menu, Icon, Alert, Switch as Swi, Avatar, Tooltip} from 'antd';
import '../index.css';
import {Link, Route, Redirect, Switch} from 'react-router-dom';
import {routerConfigs} from '../utils/routerConfigs';
import jwt_decode from 'jwt-decode'
import moment from "moment";

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

    userOnClick = (user) => {
        if (this.props.history.location.pathname !== '/app/user/list') {
            this.props.history.push(`/app/user/list?name=${user}`)
        }
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
                                            <Icon type="apple"/>
                                            <span> 锤子哦 </span>
                                        </span>
                                        : <span>
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
                            {
                                this.appHeader()
                            }
                        </Header>
                        <Content className="app-layout-content">
                            {
                                this.appContent()
                            }
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            {
                                this.appFooter()
                            }
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }

    appHeader = () => {
        let msg = {};
        routerConfigs.map(item =>
            item.mis.map(item => {
                msg[item.key] = item.content;
                return item;
            })
        );
        const {jti} = jwt_decode(localStorage.token);
        const {pathname} = this.props.history.location;
        return (
            <Fragment>
                <Alert
                    className="app-layout-header-alert"
                    message={msg[pathname]}
                    type="warning"
                />
                <Tooltip
                    className="app-layout-header-span"
                    placement="left"
                    title={"当前用户：".concat(jti)}
                >
                    <span onClick={() => this.userOnClick(jti)}>
                        <Avatar size="default" icon="user"/>
                    </span>
                </Tooltip>
            </Fragment>
        );
    };

    appContent = () => {
        return (
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
        );
    };

    appFooter = () => {
        return (
            <Fragment>
                PPH ©2019 - {moment(new Date()).format('YYYY')} Created by Zhi-yi
            </Fragment>
        );
    };
}