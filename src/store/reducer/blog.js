import {CAUSERIE_QUERY_LIST} from "../actionTypes";

const initState = {
    text: '敬请期待',
    causerieObj: {}
};

export default (state = initState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case CAUSERIE_QUERY_LIST:
            newState.causerieObj = action.obj;
            break;
        default:
            break;
    }
    return newState;
};