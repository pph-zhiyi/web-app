import { INPUT_VALUE, ADD_ITEM, DELETE_ITEM } from '../actionTypes';

const initState = {
    inputValue: '',
    list: []
};

export default (state = initState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case INPUT_VALUE:
            newState.inputValue = action.value;
            break;
        case ADD_ITEM:
            if (newState.inputValue) {
                newState.list.push(newState.inputValue);
                newState.inputValue = '';
            }
            break;
        case DELETE_ITEM:
            newState.list.splice(action.index, 1);
            break;
        default:
            break;
    }
    return newState;
}