import api, {DEFAULT_REQUEST_HOST, DEFAULT_REQUEST_CONFIGS, doPost} from '../utils/api';

/**
 * 获取数据集合
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryCauserieList(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/causerie/query'), params, DEFAULT_REQUEST_CONFIGS);
}

/**
 * 点赞
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function userLike(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/causerie/like'), params, DEFAULT_REQUEST_CONFIGS);
}

/**
 * 新增
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function commitContent(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat("/causerie/add"), params, DEFAULT_REQUEST_CONFIGS);
}

/**
 * 删除
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteContent(params) {
    return doPost("/causerie/delete", params);
}