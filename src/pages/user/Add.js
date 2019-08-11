import React from "react";
import {Form, Input, Select, DatePicker, Button, message} from 'antd';
import CallUtils from "../../utils/CallUtils";

const {Option} = Select;
const {TextArea} = Input;

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        };
    }

    onReset = () => {
        const {resetFields} = this.props.form;
        resetFields();
    };

    onOK = () => {
        this.props.form.validateFields((err, values) => {
            // values['birthday'] = values['birthday'] * 1;
            // let val = {
            //     'name': values['name'],
            //     'birthday': new Date(values['birthday']),
            //     'sex': values['sex'],
            //     'age': values['age'],
            //     'address': values['address'],
            //     'description': values['description']
            // };
            CallUtils.doPost("/user/create", values).then(result => {
                if (result['success']) {
                    const {hideAddModule, getObj} = this.props;
                    hideAddModule && hideAddModule();
                    getObj && getObj();
                    message.success("新增用户成功！");
                } else {
                    message.error("新增用户失败！");
                }
            });
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
                <Form.Item {...formItemLayout} label="Name:">
                    {
                        getFieldDecorator('name', {
                                rules: [{required: true, message: '请输入用户名！'}],
                            }
                        )(<Input placeholder="Please enter user name"/>)
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
                <Form.Item {...formItemLayout} label="Age:">
                    {
                        getFieldDecorator('age', {
                                rules: [
                                    {required: true, message: '请输入年龄！'},
                                    {pattern: new RegExp(/^[1-8]{1}[0-9]{1}$/, "g"), message: '请输入有效年龄'}
                                ],
                            }
                        )(<Input placeholder="Please enter user age"/>)
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
                        icon={"close"}
                        onClick={this.onReset}
                        style={{marginRight: 8}}
                    >
                        重制
                    </Button>
                    <Button
                        icon={"check"}
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