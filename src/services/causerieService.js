import api, {DEFAULT_REQUEST_HOST, getRequestConf} from '../utils/api';

/**
 * 获取数据集合
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryCauserieList(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/causerie/query'), params, getRequestConf(localStorage.token));
}