import {USER_QUERY_LIST, USER_SHOW_ADD_MODEL, USER_HIDE_ADD_MODEL} from '../actionTypes';

const initState = {
    obj: {},
    addVisible: false,
    loading: false
};

export default (state = initState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case USER_QUERY_LIST:
            newState.obj = action.obj;
            break;
        case USER_SHOW_ADD_MODEL:
            newState.addVisible = action.addVisible;
            break;
        case USER_HIDE_ADD_MODEL:
            newState.addVisible = action.addVisible;
            break;
        default:
            break;
    }
    return newState;
}