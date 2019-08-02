import React from 'react';
import {Drawer, Form, Button, Input, Select, Icon} from 'antd';
import CallUtils from '../../utils/CallUtils';

const {Option} = Select;

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            visible: false
        };
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let d1 = CallUtils.doPost("user/query", {});
                d1.then(res => {
                    console.log("1111111", res)
                })
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
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item {...formItemLayout} label="Id:">
                            {
                                getFieldDecorator('id',
                                    {
                                        initialValue: data['id']
                                    }
                                )(<Input disabled/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Name:">
                            {
                                getFieldDecorator('name',
                                    {
                                        initialValue: data['name'],
                                        rules: [{required: true, message: '请输入用户名！'}],
                                    }
                                )(<Input placeholder="Please enter user name"/>)
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Sex:">
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
                        <Form.Item {...formItemLayout} label="Age:">
                            {
                                getFieldDecorator('age',
                                    {
                                        initialValue: data['age'],
                                        rules: [
                                            {required: true, message: '请输入年龄！'},
                                            {pattern: new RegExp(/^[1-8]{1}[0-9]{1}$/, "g"), message: '请输入有效年龄'}
                                        ],
                                    }
                                )(<Input placeholder="Please enter user age"/>)
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
                            icon={"close"}
                            onClick={this.onClose}
                            style={{marginRight: 8}}
                        >
                            取消
                        </Button>
                        <Button
                            icon={"check"}
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