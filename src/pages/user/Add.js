import React from "react";
import {Form, Input, Select, DatePicker, Button, message} from 'antd';
import {addUser} from '../../services/userService';

const {Option} = Select;
const {TextArea} = Input;

class Add extends React.Component {
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
            <Form layout="vertical" hideRequiredMark>
                <Form.Item {...formItemLayout} label="用户名:">
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
                <Form.Item {...formItemLayout} label="姓名:">
                    {
                        getFieldDecorator('name', {
                                rules: [{required: true, message: '请输入姓名！'}],
                            }
                        )(<Input placeholder="Please enter name"/>)
                    }
                </Form.Item>
                <Form.Item {...formItemLayout} label="Sex:">
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
                                rules: [{required: true, message: '请输入地址！'}],
                            }
                        )(<Input placeholder="Please enter user address"/>)
                    }
                </Form.Item>
                <Form.Item {...formItemLayout} label="描述:">
                    {
                        getFieldDecorator('description', {
                                rules: [{required: true, message: '请输入描述！'}],
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
                        提交
                    </Button>
                </div>
            </Form>
        );
    }
}

export default Form.create()(Add);