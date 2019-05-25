import React from 'react';
import { Button, Icon, Menu } from 'antd';
import { Link } from 'dva/router';
import styles from './Main.css';

const { SubMenu } = Menu;

export default class MainSider extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {
        collapsed: false
    };

    toggle = () => {
        if (!this.state.collapsed) {

        }
    }

    componentDidMount = () => {

    }

    render() {
        const location = this.props.location;
        let defaultSelectedKeys = location.pathname;
        let defaultOpenKeys = location.pathname.split('/')[1] || null;

        return (
            <div className="ant-layout-sider" style={{ flex: this.UNSAFE_componentWillMount.state.collapsed ? '0 0 80px' : '0 0 200px' }}>
                <div className={styles.logo} style={{ display: this.UNSAFE_componentWillMount.state.collapsed ? 'none' : '' }}>
                    <span style={{ width: 156, height: 49, marginTop: 11 }}>
                        锤子
                    </span>
                </div>
                <Button
                    type="primary"
                    onClick={this.toggle}
                    style={{ position: "absolute", top: 18, left: this.state.collapsed ? 82 : 210 }}
                >
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <SubMenu key="base"
                    title={<span>
                        <Icon type="user">
                            <span>基础管理</span>
                        </Icon>
                    </span>}
                >
                    <Menu.Item key="/base/user/list">
                        <Link to="/base/user/list">
                            <Icon type="setting" /> 用户管理
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/base/c1">
                        <Link to="loading">
                            <Icon type="loading" /> 敬请期待一
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/base/c2">
                        <Link to="loading">
                            <Icon type="loading" /> 敬请期待二
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/base/c3">
                        <Link to="loading">
                            <Icon type="loading" /> 敬请期待三
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/base/c4">
                        <Link to="loading">
                            <Icon type="loading" /> 敬请期待四
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="q1"
                    title={<span>
                        <Icon type="user">
                            <span>敬请期待一</span>
                        </Icon>
                    </span>}
                >
                    <Menu.Item key="/q1/c1">
                        <Link to="loading">
                            <Icon type="loading" /> 敬请期待一
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/q1/c2">
                        <Link to="loading">
                            <Icon type="loading" /> 敬请期待二
                        </Link>
                    </Menu.Item>
                </SubMenu>

            </div>
        );
    }
}