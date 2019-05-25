import React from 'react';
import {connect } from 'dva';
import SiderIndex from '../../pages/main/SiderIndex';
import User from '../../pages/user/User';

function User ({location}) {
    return (<SiderIndex location={location}>
        <div>
            <User></User>
        </div>
    </SiderIndex>);
}

export default connect()(UserList);