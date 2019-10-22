import api, {DEFAULT_REQUEST_HOST, getRequestConf} from '../utils/api';

/**
 * 获取用户列表信息
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryUserList(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/user/query'), params, getRequestConf(localStorage.token));
}

/**
 * 新增用户
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addUser(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/user/create'), params, getRequestConf(localStorage.token));
}

/**
 * 编辑用户
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function editUser(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/user/update'), params, getRequestConf(localStorage.token));
}

/**
 * 删除用户
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteUser(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/user/delete'), params, getRequestConf(localStorage.token));
}

/**
 * 查询用户登录记录
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryLoginLogByUser(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/login/query/login/log/by/user'), params,
        getRequestConf(localStorage.token));
}