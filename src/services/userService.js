import api, {DEFAULT_REQUEST_HOST, DEFAULT_REQUEST_CONFIGS} from '../utils/api';

/**
 * 获取用户列表信息
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function queryUserList(params) {
    return api.post(DEFAULT_REQUEST_HOST.concat('/user/query'), params, DEFAULT_REQUEST_CONFIGS);
}

