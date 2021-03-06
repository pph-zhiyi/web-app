import {doPost} from '../utils/api';
import {GET_ERRORS, LOG_OUT_USER, SET_CURRENT_USER} from '../store/actionTypes';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {message} from 'antd';

/**
 * 登录验证
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function login(params) {
    return doPost('/login/login', params);
}

/**
 * 登录
 * @param params
 * @param history
 * @returns {Function}
 */
export const loginUser = (params, history) => dispatch => {
    doPost('/login/login', params).then(res => {
        //对返回的token进行解构,并存储
        const {isExists, token, msg} = res.data;
        let decoded = undefined;
        if (isExists) {
            localStorage.setItem('token', token);
            //设置axios的headers token
            setAuthToken(token);
            // 解析token
            decoded = jwt_decode(token);
        } else {
            message.error(msg);
        }
        // 解析之后用dispatch分发
        dispatch(setCurrentUser(isExists, token, msg, decoded));
    }).catch(err => {
        // 在登录息错误的时候用dispatch把信息返回回去
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    });
};

export const setCurrentUser = (isExists, token, msg, decoded) => {
    // 设置type,下一步return到reducers/authReducer.js中
    return {
        type: SET_CURRENT_USER,
        user: decoded,
        isExists: isExists,
        msg: msg
    }
};

export const logoutUser = () => dispatch => {
    return dispatch({
        type: LOG_OUT_USER
    });
};

export function queryLoginLog(params) {
    return doPost('/login/query/lately/login', params);
}
