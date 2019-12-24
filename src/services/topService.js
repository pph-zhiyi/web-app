import {doGet, doPost} from '../utils/api';

/**
 * 获取用户列表信息
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryDataList(params) {
    return doPost('/top/query', params);
}

/**
 * 获取过滤信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryFilter() {
    return doGet('/top/query/filter');
}