import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {message, notification, Icon} from 'antd';
import './Login.css';
import * as loginService from "../../services/loginService";
import LoginForm from "../../pages/login/LoginForm";
import LoginInform from "../../pages/login/LoginInform";
import moment from "moment";

class Login extends Component {

    componentWillReceiveProps(nextProps, nextContext) {
        const {isExists, user, msg} = nextProps;
        if (isExists) {
            loginService.queryLoginLog({user: user.jti})
                .then(res => {
                    if (res.success) {
                        notification.open({
                            message: msg,
                            description: <div>
                                欢迎回来: <b style={{color: '#1890ff'}}>{user.jti}</b>
                                <br/>
                                上次登录时间：
                                <b style={{color: '#1890ff'}}>
                                    {moment(res.data.entryTime).format('YYYY-MM-DD HH:mm:ss')}
                                </b>
                            </div>,
                            icon: <Icon type="smile" style={{color: '#108ee9'}}/>
                        });
                    } else {
                        message.error(res.message)
                    }
                });
            this.props.history.push('/app')
        }
    }

    render() {
        return (
            <Fragment>
                <LoginForm
                    login={this.props.login}
                />
                <LoginInform/>
            </Fragment>
        );
    }
}

const mapStateToProps = (initState) => {
    let state = initState.login;
    return {
        isExists: state.user,
        msg: state.msg,
        user: state.user
    };
};

const dispatchToProps = (dispatch) => {
    return {
        login(params) {
            dispatch(loginService.loginUser(params));
        }
    };
};

export default connect(mapStateToProps, dispatchToProps)(Login);