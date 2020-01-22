import axios from 'axios';
import {message} from 'antd';
import loginStateCheck from "./loginStateCheck";

let api = axios.create({
    timeout: 1000 * 6,
    transformRequest: [data => JSON.stringify(data)]
});

export const DEFAULT_REQUEST_HOST = 'http://localhost:8888';

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
        try {
            if (res.status === 200) {
                let {data} = res;
                if (data.code === 200) {
                    return data;
                } else if (data.code === 401) {
                    loginStateCheck();
                }
            } else if (res['headers']['content-disposition']
                && res['headers']['content-disposition'].indexOf('filename=') > 0) {
                // 若是文件流，直接返回
                return res;
            } else {
                message.error(res['message']);
            }
        } catch (e) {
            message.error("请求服务器异常");
        }
    }, err => {
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

/**
 * GET
 *
 * @param action
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function doGet(action, params) {
    let url = DEFAULT_REQUEST_HOST.concat(action && !action.startsWith("/") ? "/" : '', action);
    if (params) {
        let flag = 1;
        Object.keys(params).map(key => {
            url += flag === 1 ? "?" : "&";
            url += key.concat("=", params[key]);
            flag++;
            return key;
        });
    }
    return api.get(
        url,
        getRequestConf(localStorage.token)
    );
}

/**
 * POST
 *
 * @param action
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function doPost(action, params) {
    return api.post(
        DEFAULT_REQUEST_HOST.concat(action && !action.startsWith("/") ? "/" : '', action),
        params,
        getRequestConf(localStorage.token)
    );
}

export function Pro(action, params) {
    return new Promise(function (resolve, reject) {
        doPost(action, params).then(function (ret) {
            resolve(ret);
        }).catch(function (err) {
            reject(err);
        })
    })
}

export default api;