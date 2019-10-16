import {LOG_OUT_USER, LOGIN, SET_CURRENT_USER} from '../actionTypes';

const initState = {
    isExists: false,
    msg: '',
    user: ''
};

export default (state = initState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case LOGIN:
            const {isExists, token, msg} = action.data;
            newState.isExists = isExists;
            newState.token = token;
            newState.errorMsg = msg;
            break;
        case SET_CURRENT_USER:
            newState.isExists = action.isExists;
            newState.msg = action.msg;
            newState.user = action.user;
            break;
        case LOG_OUT_USER:
            newState.isExists = false;
            newState.token = '暂无';
            newState.msg = '权限过期，请登录';
            newState.user = '暂无';
            break;
        default:
            break;
    }
    return newState;
}