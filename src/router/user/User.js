import React from 'react';
import {connect } from 'dva';
import MainLayout from '../../pages/main/MainLayout';
import UserList from '../../pages/user/UserList';

function User ({location}) {
    return (<MainLayout location={location}>
        <div>
            <UserList />
        </div>
    </MainLayout>);
}

export default connect()(User);