import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './Login.css';
// import { BrowserRouter, Route, Redirect ,Switch} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            isRegister: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                fetch(
                    'http://localhost:8888/login/exists',
                    {
                        method: "POST",
                        body: JSON.stringify({
                            "user": values['username'],
                            "password": values['password']
                        }),
                        headers: { 'Content-Type': 'application/json;charset=utf-8' }
                    }
                ).then(res => res.json()).then(data => {
                    console.log(data)
                    if (data === true) {
                        // window.location.href = './my/index';
                        // window.open('/my/index')
                        this.props.history.push('/my/index')
                    } else {
                        message.error("用户名密码错误，请重新输入！");
                    }
                }).catch(e => console.log('错误:', e));
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='external-div'>
                <div className='internal-div'>
                    <Row align='middle' justify='center' type='flex'>
                        <Col>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox>Remember me</Checkbox>)}
                                    <a className="login-form-forgot" href="/"> Forgot password </a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    <Button className="login-form-button">
                                        Register
                                    </Button> Or <a href="/"> register now! </a>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(Login);
export default WrappedRegistrationForm;