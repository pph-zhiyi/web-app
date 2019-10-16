import React from 'react';
import {connect} from 'react-redux';
import List from '../../pages/user/List';
import {
    USER_QUERY_LIST,
    USER_SHOW_ADD_MODEL,
    USER_HIDE_ADD_MODEL,
    USER_ADD_INFO,
    USER_EDIT_INFO,
    USER_DELETE_INFO
} from '../../store/actionTypes';
import * as userService from '../../services/userService';

let defPage = {
    'pageNo': 1,
    'pageSize': 13,
    'name': null
};

class User extends React.Component {

    render() {
        const {
            queryList, onPageChangeHandler, onShowSizeChange, addItem, editItem,
            deleteItem, showAddModule, hideAddModule
        } = this.props;
        let {token, obj, addVisible, loading} = this.props;

        return (
            <List
                token={token}
                obj={obj}
                addVisible={addVisible}
                loading={loading}
                queryList={queryList}
                onPageChangeHandler={onPageChangeHandler}
                onShowSizeChange={onShowSizeChange}
                addItem={addItem}
                editItem={editItem}
                deleteItem={deleteItem}
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
                let action = {
                    type: USER_QUERY_LIST,
                    obj: res.data
                };
                dispatch(action);
            });
        },
        onPageChangeHandler(pageNo, pageSize) {
            defPage = {
                'pageNo': pageNo,
                'pageSize': pageSize
            };
            this.queryList(defPage);
        },
        onShowSizeChange(pageNo, pageSize) {
            defPage = {
                'pageNo': pageNo,
                'pageSize': pageSize
            };
            this.queryList(defPage);
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
        addItem(params) {
            let action = {
                type: USER_ADD_INFO,
                params
            };
            dispatch(action);
        },
        editItem(params) {
            let action = {
                type: USER_EDIT_INFO,
                params
            };
            dispatch(action);
        },
        deleteItem(index) {
            let action = {
                type: USER_DELETE_INFO,
                index
            };
            dispatch(action);
        }
    };
};

export default connect(mapStateToProps, dispatchToProps)(User);