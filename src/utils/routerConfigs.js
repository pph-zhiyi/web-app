import React from 'react';
import {Icon} from 'antd';
import Blog from '../components/blog/Blog';

import 'antd/dist/antd.css';

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
    }
];