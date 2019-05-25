// import React from 'react';
// import { Layout, Menu, Icon, Breadcrumb } from 'antd';
// import '../App.css';
// import UserList from '../user/UserList';

// const { Header, Content, Footer, Sider } = Layout;
// const SubMenu = Menu.SubMenu;

// export default class SiderIndex extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             collapsed: false,
//         }
//     }

//     onCollapse = collapsed => {
//         console.log(collapsed);
//         this.setState({ collapsed });
//     };

//     render() {
//         return (
//             <Layout style={{ minHeight: '100vh' }}>
//                 <Sider collapsible collapsed={this.state.collapsed}
//                     onCollapse={this.onCollapse}
//                 >
//                     <div className="logo" />
//                     <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//                         <Menu.Item key="1">
//                             <Icon type="pie-chart" />
//                             <span>Option 1</span>
//                         </Menu.Item>
//                         <Menu.Item key="2">
//                             <Icon type="desktop" />
//                             <span>Option 2</span>
//                         </Menu.Item>
//                         <SubMenu
//                             key="sub1"
//                             title={
//                                 <span>
//                                     <Icon type="user" />
//                                     <span>User</span>
//                                 </span>
//                             }
//                         >
//                             <Menu.Item key="3">Tom</Menu.Item>
//                             <Menu.Item key="4">Bill</Menu.Item>
//                             <Menu.Item key="5">Alex</Menu.Item>
//                         </SubMenu>
//                         <SubMenu
//                             key="sub2"
//                             title={
//                                 <span>
//                                     <Icon type="team" />
//                                     <span>Team</span>
//                                 </span>
//                             }
//                         >
//                             <Menu.Item key="6">Team 1</Menu.Item>
//                             <Menu.Item key="8">Team 2</Menu.Item>
//                         </SubMenu>
//                         <Menu.Item key="9">
//                             <Icon type="file" />
//                             <span>File</span>
//                         </Menu.Item>
//                     </Menu>
//                 </Sider>
//                 <Layout>
//                     <Header style={{ background: '#fff', padding: 0 }} />
//                     <Content style={{ margin: '0 16px' }}>
//                         <Breadcrumb style={{ margin: '16px 0' }}>
//                             <Breadcrumb.Item>User</Breadcrumb.Item>
//                             <Breadcrumb.Item>Bill</Breadcrumb.Item>
//                         </Breadcrumb>
//                         <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
//                             <UserList />
//                         </div>
//                     </Content>
//                     <Footer style={{ textAlign: 'center' }}> PPH ©2019 Created by Zhiyi</Footer>
//                 </Layout>
//             </Layout>
//         );
//     }
// }

import React from 'react';
import { Layout } from 'antd';
import MainSider from './MainSider';
import MainHeader from './MainHeader';
import styles from './Main.css';

const { Content } = Layout;

const MainLayout = ({ children, location }) => {
    return (<Layout className="ant-layout ant-layout-has-sider" style={{ minHeight: '100vh' }}>
        <MainSider location={location} />
        <Layout>
            <MainHeader location={location} />
            <Layout className={styles.contentPadding}>
                <Content className="ant-layout ant-layout-content" className={styles.contentCss}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    </Layout>);
}

export default MainLayout;