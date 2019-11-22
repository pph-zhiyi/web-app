import {doPost} from '../utils/api';

/**
 * 获取数据集合
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryCauserieList(params) {
    return doPost("/causerie/query", params);
}

/**
 * 点赞
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function userLike(params) {
    return doPost("/causerie/like", params);
}

/**
 * 新增
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function commitContent(params) {
    return doPost("/causerie/add", params);
}

/**
 * 删除
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteContent(params) {
    return doPost("/causerie/delete", params);
}

/**
 * 新增评论
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addComment(params) {
    return doPost("/causerie/add/comment", params);
}