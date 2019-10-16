import React from 'react';
import setAuthToken from "./setAuthToken";
import {Modal} from 'antd';
import jwt_decode from 'jwt-decode'
import store from "../store";
import {logoutUser, setCurrentUser} from "../services/loginService";

const loginStateCheck = () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        // 解析token
        const decoded = jwt_decode(localStorage.token);
        store.dispatch(setCurrentUser(decoded));
        // 获取当前时间
        const currentTime = Date.now() / 1000;//由毫秒转成秒
        // 判断当前时间是否大于token中的exp时间;如果大于是为过期
        if (decoded.exp < currentTime) {
            store.dispatch(logoutUser);
            if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
                countDown(5, true);
            }
        }
    } else {
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
            countDown(3, false);
        }
    }
}

function countDown(time, flag) {
    const modal = Modal.warning({
        title: '请登录',
        content: flag ? <p>登录信息已过期，请先登录后再操作。<b style={{color: 'red'}}>{time}</b> 秒后自动跳转登录页面...</p>
            : <p> 您还未登录，请先登录后再操作。<b style={{color: 'red'}}>{time}</b> 秒后自动跳转登录页面...</p>,
        okText: '知道了',
        onOk: args => {
            modal.destroy();
            window.location.href = "/login";
        }
    });
    const timer = setInterval(() => {
        time -= 1;
        modal.update({
            title: '请登录',
            content: flag ? <p>登录信息已过期，请先登录后再操作。<b style={{color: 'red'}}>{time}</b> 秒后自动跳转登录页面...</p>
                : <p> 您还未登录，请先登录后再操作。<b style={{color: 'red'}}>{time}</b> 秒后自动跳转登录页面...</p>
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
        window.location.href = "/login";
    }, time * 1000);
}

export default loginStateCheck;