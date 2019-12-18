import React from 'react';
import {Button, DatePicker, Drawer, Form, Input, message, Select} from 'antd';
import {addUser} from "../../services/userService";

const {Option} = Select;
const {TextArea} = Input;

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onOK = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                addUser(values).then(res => {
                    if (res.success) {
                        const {hideAddModule, queryList} = this.props;
                        message.success('新增用户成功');
                        this.props.form.resetFields();
                        hideAddModule && hideAddModule();
                        queryList && queryList({});
                    } else {
                        message.error(res.message);
                    }
                });
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 18}
        };

        return (
            <div>
                <Drawer
                    title="用户注册"
                    width={720}
                    onClose={() => this.props.changeRegisterVisible(false)}
                    visible={this.props.visible}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item {...formItemLayout} label="用户名 / 账号:">
                            {
                                getFieldDecorator('user', {
                                        rules: [{required: true, message: '请输入用户名！'}],
                                    }
                                )(<Input placeholder="用户名创建后将不可修改，请谨慎选择"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="密码:">
                            {
                                getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码！'}],
                                    }
                                )(<Input type="password" placeholder="Please enter password"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="确认密码:">
                            {
                                getFieldDecorator('dPassword', {
                                        rules: [{required: true, message: '请再次输入密码！'}],
                                    }
                                )(<Input type="password" placeholder="Please enter password"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="昵称:">
                            {
                                getFieldDecorator('name', {
                                        rules: [{required: true, message: '请输入昵称！'}],
                                    }
                                )(<Input placeholder="Please enter name"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="性别:">
                            {
                                getFieldDecorator('sex', {
                                        rules: [{required: true, message: '请选择性别！'}],
                                    }
                                )(
                                    <Select placeholder="Please select an sex">
                                        <Option value="男"> 男 </Option>
                                        <Option value="女"> 女 </Option>
                                    </Select>,
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="生日:">
                            {
                                getFieldDecorator('birthday', {
                                        rules: [{required: true, message: '请选择生日！'}],
                                    }
                                )(<DatePicker style={{width: '100%'}} placeholder="Please select an birthday"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="地址:">
                            {
                                getFieldDecorator('address', {
                                        rules: [{required: false, message: '请输入地址！'}],
                                    }
                                )(<Input placeholder="Please enter user address"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="自我描述:">
                            {
                                getFieldDecorator('description', {
                                        rules: [{required: false, message: '请输入描述！'}],
                                    }
                                )(<TextArea rows={3} placeholder="Please enter user description"/>)
                            }
                        </Form.Item>
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Button
                                icon="redo"
                                onClick={() => this.props.form.resetFields()}
                                style={{marginRight: 8}}
                            >
                                重制
                            </Button>
                            <Button
                                icon="check"
                                onClick={this.onOK}
                                type="primary"
                            >
                                注册
                            </Button>
                        </div>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default Form.create()(RegisterForm);