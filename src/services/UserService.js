import api from '../utils/ApiUtil';

export const queryUserListAction = (values) => {
    return api.post(
        `localhost:8888/user/query`,
        {
            "pageNo": values.pageNum,
            "pageSize": values.pageSize,
            "name": values.name,
            "sex": values.sex,
            "age": values.age
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    );
}

export const saveUserAction = (values) => {
    return api.post(
        `localhost:8888/user/query`,
        {
            "pageNo": values.pageNum,
            "pageSize": values.pageSize,
            "name": values.name,
            "sex": values.sex,
            "age": values.age
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    );
}

export const deleteUserByIdAction = (values) => {
    return api.post(
        `localhost:8888/user/query`,
        {
            "pageNo": values.pageNum,
            "pageSize": values.pageSize,
            "name": values.name,
            "sex": values.sex,
            "age": values.age
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    );
}

export const editUserByIdAction = (values) => {
    return api.post(
        `localhost:8888/user/query`,
        {
            "pageNo": values.pageNum,
            "pageSize": values.pageSize,
            "name": values.name,
            "sex": values.sex,
            "age": values.age
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    );
}