import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userService from "../../services/userService";
import {
    USER_QUERY_LIST,
} from "../../store/actionTypes";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div> 博客首页 </div>
        );
    }
}

const mapStateToProps = (initState) => {
    let state = initState.user;
    return {
        obj: state.obj,
        addVisible: state.addVisible,
        loading: state.loading
    };
};

const dispatchToProps = (dispatch) => {
    return {
        queryList(params) {
            userService.queryUserList(params).then(res => {
                if (res) {
                    let action = {
                        type: USER_QUERY_LIST,
                        obj: res.data
                    };
                    dispatch(action);
                }
            });
        }
    };
};

export default connect(mapStateToProps, dispatchToProps)(Blog);