import React from 'react';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import '../index.css';


export default class Login extends React.Component {
    state = {
        date: null,
    };

    render() {
        return (
            <center>
                <h1><span>登录个锤子</span></h1>
                <a href="http://localhost:3000/index">点个锤子</a>
            </center>
        );
    }
}