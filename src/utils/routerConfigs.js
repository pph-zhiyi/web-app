import React from 'react';
import {Icon} from 'antd';
import User from '../components/user/User';
import UserCharts from "../components/user/UserCharts";
import AntdDatePicker from '../components/demo/AntdDatePicker';
import Demo from "../pages/Demo";
import Top from "../pages/Top/Top";
import Blog from '../components/blog/Blog';
import Stack from '../components/stack/Stack';

/**
 * 页面路由配置
 * @type {*[]}
 */
export const routerConfigs = [
    {
        key: "blog",
        title: <span>
            <Icon type="fire"/>
            <span> Blog </span>
        </span>,
        mis: [
            {
                key: "/app/blog/index",
                content: "我的博客",
                component: Blog
            }
        ]
    },
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
        key: "stack",
        title: <span>
            <Icon type="monitor"/>
            <span> Stack </span>
        </span>,
        mis: [
            {
                key: "/app/stack/index",
                content: "堆栈监控",
                component: Stack
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
        key: "bank",
        title: <span>
            <Icon type="bank"/>
            <span> Top </span>
        </span>,
        mis: [
            {
                key: "/app/bank/d1",
                content: "Top产品详情",
                component: Top
            }
        ]
    }
];