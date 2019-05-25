import queryString from 'query-string';
import * as UserService from '../services/UserService';
import { message } from 'react';

const defPageNum = 1, defPageSize = 11;

export default {
    namespace: 'userModel',
    state: {
        query: {},
        userListData: [],
        userListPageNum: 0,
        userListPageSize: 0,
        userListTotal: 0,
        userValues: null,
        userListData: []
    },
    reducers: {
        initPageParameterSave(state, { payload: { query } }) {
            return { ...state, query };
        },
        userListDataSave(state, { payload: { userListData, userListPageNum, userListPageSize, userListTotal, userValues } }) {
            return { ...state, userListData, userListPageNum, userListPageSize, userListTotal, userValues };
        }
    },
    effects: {
        // page
        *saveInitPageParameter({ payload: query }, { call, put }) {
            yield put({
                type: 'initPageParameterSave',
                payload: {
                    query: query
                }
            });
        },
        // list
        *queryUserListAction({ payload: { userValues } }, { call, put, select }) {
            let values = {};

            if (!userValues) {
                const userValues = yield select(state => state.userModel.userValues);

                if (userValues) {
                    values = {
                        pageNum: userValues['pageNum'],
                        pageSize: userValues['pageSise']
                    };
                } else {
                    values = Object.assign({}, userValues)
                }

                const { data } = yield call(UserService.querUserList, values);

                yield put({
                    type: 'userListDataSave',
                    payload: {
                        userListData: data.data,
                        userListPageNum: data.pageNo,
                        userListPageSize: data.pageSise,
                        userListTotal: data.total,
                        userValues: values
                    }
                })
            }
        },
        // save
        *saveUserAction({ payload: { values } }, { call, put, select }) {
            const { code } = yield call(UserService.saveUserAction, values);
            code == 200 ? message.success("新增成功！") : message.error("新增失败！");

            let userValues = {
                "pageNum": defPageNum,
                "pageSize": defPageSize
            }
            yield put({ type: 'queryUserListAction', payload: { userValues } });
        },
        // delete
        *deleteUserByIdAction({ payload: { values } }, { call, put, select }) {
            const { code } = yield call(UserService.deleteUserByIdAction, values);
            code == 200 ? message.success("删除成功！") : message.error("删除失败！");

            let userValues = {
                "pageNum": defPageNum,
                "pageSize": defPageSize
            }
            yield put({ type: 'queryUserListAction', payload: { userValues } });
        },
        // edit
        *editUserByIdAction({ payload: { values } }, { call, put, select }) {
            const { code } = yield call(UserService.editUserByIdAction, values);
            code == 200 ? message.success("修改成功！") : message.error("修改失败！");

            let userValues = {
                "pageNum": defPageNum,
                "pageSize": defPageSize
            }
            yield put({ type: 'queryUserListAction', payload: { userValues } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                console.log(pathname);

                const query = queryString.parse(search);
                dispatch({ type: 'saveInitPageParameter', payload: query });

                let values = {};
                dispatch({ type: 'queryUserListAction', payload: { values } })
            })
        }
    }
};