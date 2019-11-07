import React from 'react';
import {Icon} from 'antd';
import User from '../components/user/User';
import UserCharts from "../components/user/UserCharts";
import AntdDatePicker from '../components/demo/AntdDatePicker';
import Demo from "../pages/Demo";
import Blog from '../components/blog/Blog';

/**
 * 页面路由配置
 * @type {*[]}
 */
export const routerConfigs = [
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
    },
    {
        key: "blog",
        title: <span>
            <Icon type="book"/>
            <span> Blog </span>
        </span>,
        mis: [
            {
                key: "/app/blog/d1",
                content: "博客首页",
                component: Blog
            }
        ]
    }
];