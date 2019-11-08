import {combineReducers} from 'redux';
import login from "./login";
import user from "./user";
import blog from "./blog";

const reducers = combineReducers({
    login,
    user,
    blog
});

export default reducers;