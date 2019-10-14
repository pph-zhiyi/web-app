import axios from 'axios';
import {message} from 'antd';

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

api.interceptors.response.use(
    function (response) {
        // console.log('api response', response);
        const result = response.data;
        if (result.code === 401) {
            // TODO 跳转登录
            message.error('请先登录！');
        } else if (response['headers']['content-disposition']
            && response['headers']['content-disposition'].indexOf('filename=') > 0) {
            // 若是文件流，直接返回
            return response;
        } else {
            return result;
        }
    },
    function (error) {
        // console.log("api error", error);
        const code = error.response.code;
        if (code === 401) {
            //    TODO 跳转登录
        } else if (code === 500) {
            message.error('请求失败, 错误代码 ['.concat(error.response.message).concat(']'))
        } else {
            message.error('请求失败, 错误代码 ['.concat(error.response.message).concat(']'))
        }
        return Promise.reject(error);
    }
);

export default api;