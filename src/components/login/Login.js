import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {message} from 'antd';
import './Login.css';
import * as loginService from "../../services/loginService";
import LoginForm from "../../pages/login/LoginForm";
import LoginInform from "../../pages/login/LoginInform";

class Login extends Component {

    componentWillReceiveProps(nextProps, nextContext) {
        const {isExists, user, msg} = nextProps;
        if (isExists) {
            message.success(<span> 你好 <b style={{color: '#1890ff'}}>{user.jti}</b> {msg} </span>);
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