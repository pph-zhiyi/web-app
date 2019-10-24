import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '../../pages/user/List';
import {
    USER_QUERY_LIST,
    USER_SHOW_ADD_MODEL,
    USER_HIDE_ADD_MODEL,
    USER_EDIT_INFO,
    USER_DELETE_INFO
} from '../../store/actionTypes';
import * as userService from '../../services/userService';

let globalQueryParams;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryParams: {
                pageNo: 1,
                pageSize: 12,
                name: null
            }
        };
    }

    changeName = (name) => {
        let params = this.state.queryParams;
        params.name = name;
        this.setState({
            queryParams: params
        })
    };

    render() {
        const {
            queryList, onPageChangeHandler, onShowSizeChange, editUser,
            deleteUser, showAddModule, hideAddModule
        } = this.props;
        let {obj, addVisible, loading} = this.props;
        globalQueryParams = this.state.queryParams;

        return (
            <List
                queryParams={this.state.queryParams}
                changeName={this.changeName}
                obj={obj}
                addVisible={addVisible}
                loading={loading}
                queryList={queryList}
                onPageChangeHandler={onPageChangeHandler}
                onShowSizeChange={onShowSizeChange}
                editUser={editUser}
                deleteUser={deleteUser}
                showAddModule={showAddModule}
                hideAddModule={hideAddModule}
            />
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
        },
        onPageChangeHandler(pageNo, pageSize) {
            globalQueryParams.pageNo = pageNo;
            globalQueryParams.pageSize = pageSize;
            userService.queryUserList(globalQueryParams).then(res => {
                if (res) {
                    let action = {
                        type: USER_QUERY_LIST,
                        obj: res.data
                    };
                    dispatch(action);
                }
            });
        },
        onShowSizeChange(pageNo, pageSize) {
            globalQueryParams.pageNo = pageNo;
            globalQueryParams.pageSize = pageSize;
            userService.queryUserList(globalQueryParams).then(res => {
                if (res) {
                    let action = {
                        type: USER_QUERY_LIST,
                        obj: res.data
                    };
                    dispatch(action);
                }
            });
        },
        showAddModule() {
            let action = {
                type: USER_SHOW_ADD_MODEL,
                addVisible: true
            };
            dispatch(action);
        },
        hideAddModule() {
            let action = {
                type: USER_HIDE_ADD_MODEL,
                addVisible: false
            };
            dispatch(action);
        },
        editUser(params) {
            let action = {
                type: USER_EDIT_INFO,
                params
            };
            dispatch(action);
        },
        deleteUser(index) {
            let action = {
                type: USER_DELETE_INFO,
                index
            };
            dispatch(action);
        }
    };
};

export default connect(mapStateToProps, dispatchToProps)(User);