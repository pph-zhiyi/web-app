import React from 'react';
import {Drawer, Form, Button, Input, Select, Icon, DatePicker, message} from 'antd';
import moment from 'moment';
import {editUser} from '../../services/userService';

const {Option} = Select;
const {TextArea} = Input;

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    hiddenDrawer = () => {
        this.setState({
            visible: false,
        });
    };

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                editUser(values).then(res => {
                    if (res.success) {
                        const {queryList} = this.props;
                        message.success('编辑用户成功');
                        queryList && queryList({});
                        this.hiddenDrawer();
                    } else {
                        message.error(res.message);
                    }
                });
            }
        })
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 2, offset: 20},
            wrapperCol: {span: 14}
        };
        const {getFieldDecorator} = this.props.form;
        const {data} = this.props;

        return (
            <div>
                <span onClick={this.showDrawer}>
                    <Icon type="edit"/> <b> 编辑用户 </b>
                </span>
                <Drawer
                    title="用户信息编辑"
                    width={720}
                    onClose={this.hiddenDrawer}
                    visible={this.state.visible}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item {...formItemLayout} label="">
                            {
                                getFieldDecorator('id',
                                    {
                                        initialValue: data['id']
                                    }
                                )(<Input hidden/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="用户名:">
                            {
                                getFieldDecorator('user', {
                                        rules: [{required: true, message: '请输入用户名！'}],
                                        initialValue: data['user']
                                    }
                                )(<Input disabled/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="密码:">
                            {
                                getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码！'}],
                                        initialValue: data['password']
                                    }
                                )(<Input type="password" placeholder="Please enter password"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="姓名:">
                            {
                                getFieldDecorator('name',
                                    {
                                        initialValue: data['name'],
                                        rules: [{required: true, message: '请输入姓名！'}],
                                    }
                                )(<Input placeholder="Please enter name"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="性别:">
                            {
                                getFieldDecorator('sex',
                                    {
                                        initialValue: data['sex'],
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
                                        initialValue: moment(data['birthday'])
                                    }
                                )(<DatePicker
                                    style={{width: '100%'}}
                                    placeholder="Please select an birthday"
                                />)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="地址:">
                            {
                                getFieldDecorator('address', {
                                        rules: [{required: true, message: '请输入地址！'}],
                                        initialValue: data['address']
                                    }
                                )(<Input placeholder="Please enter user address"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="描述:">
                            {
                                getFieldDecorator('description', {
                                        rules: [{required: true, message: '请输入描述！'}],
                                        initialValue: data['description']
                                    }
                                )(<TextArea rows={3} placeholder="Please enter user description"/>)
                            }
                        </Form.Item>
                    </Form>
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
                            icon="undo"
                            onClick={() => this.props.form.resetFields()}
                            style={{marginRight: 8}}
                        >
                            撤回
                        </Button>
                        <Button
                            icon="check"
                            onClick={this.onSubmit}
                            type="primary"
                        >
                            提交
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Form.create()(Edit);