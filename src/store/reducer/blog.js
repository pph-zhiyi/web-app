import {USER_QUERY_LIST} from "../actionTypes";

const initState = {
    text: '敬请期待'
};

export default (state = initState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case USER_QUERY_LIST:
            newState.obj = action.obj;
            break;
        default:
            break;
    }
    return newState;
};