import {doPost, doGet} from '../utils/api';

/**
 * 获取用户列表信息
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryUserList(params) {
    return doPost('/user/query', params);
}

/**
 * 新增用户
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addUser(params) {
    return doPost('/user/create', params);
}

/**
 * 编辑用户
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function editUser(params) {
    return doPost('/user/update', params);
}

/**
 * 删除用户
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteUser(params) {
    return doPost('/user/delete', params);
}

/**
 * 查询用户登录记录
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryLoginLogByUser(params) {
    return doPost('/login/query/login/log/by/user', params);
}

/**
 * 删除用户
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryUserLoginCount(params) {
    return doPost('/login/query/user/login/count', params);
}

export function queryUsers() {
    return doGet('/user/query/users');
}