import axios from 'axios';
import {message} from 'antd';
import loginStateCheck from "./loginStateCheck";

let api = axios.create({
    timeout: 1000 * 6,
    transformRequest: [data => JSON.stringify(data)]
});

export const DEFAULT_REQUEST_HOST = 'http://localhost:8888';
export const DEFAULT_REQUEST_CONFIGS = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
};

export function getRequestConf(token) {
    return {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            token: token
        }
    };
}

api.interceptors.request.use(config => {
    return config;
}, err => {
    message.error('请求超时！');
    return Promise.resolve();
});

api.interceptors.response.use(res => {
        loginStateCheck();
        if (res.status === 200) {
            return res.data;
        } else if (res['headers']['content-disposition']
            && res['headers']['content-disposition'].indexOf('filename=') > 0) {
            // 若是文件流，直接返回
            return res;
        } else {
            message.error(res['message']);
        }
    }, err => {
        loginStateCheck();
        try {
            const response = err.response;
            if (response.status === 504 || response.status === 404) {
                message.error("服务器异常");
            } else if (response.status === 401 || response.status === 403) {
                message.error("权限异常");
            } else {
                message.error(response.message);
            }
            return Promise.reject(err);
            // return Promise.resolve(error);
        } catch (e) {
            message.error("请求服务器异常");
        }
    }
);

export default api;