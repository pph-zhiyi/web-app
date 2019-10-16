import React from 'react';
import {Row, Col, Form, Icon, Input, Button, Checkbox} from 'antd';

class LoginForm extends React.Component {

    loginSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    user: values['username'],
                    password: values['password']
                };
                this.props.login(params);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='external-div'>
                <div className='internal-div'>
                    <Row
                        align='middle'
                        justify='center'
                        type='flex'
                    >
                        <h1 style={{color: '#CC6600'}}> 有空一起玩锤子 </h1>
                    </Row>
                    <Row
                        align='middle'
                        justify='center'
                        type='flex'
                    >
                        <Col>
                            <Form onSubmit={this.loginSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Please input your username!'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="用户名"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type="password"
                                            placeholder="密码"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox> 记住用户 </Checkbox>)}
                                    <a className="login-form-forgot" href="/"> 忘记密码 </a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        登录
                                    </Button>
                                    <Button onClick={() => this.props.form.resetFields()} className="login-form-button">
                                        清空
                                    </Button> 或者 <a href="/"> 立即注册！ </a>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Form.create()(LoginForm);