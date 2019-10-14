import {combineReducers} from 'redux';
import reducer from "./reducer";
import user from "./user";

const reducers = combineReducers({
    reducer,
    user
});

export default reducers;