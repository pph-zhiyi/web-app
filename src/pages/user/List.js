import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {
    Table, Menu, Popconfirm, Dropdown, Icon, Tag, Button, Input, Row, Col, Tooltip, Pagination, Modal, message
} from 'antd';
import Edit from "./Edit";
import Add from "./Add";
import '../../index.css';
import moment from "moment";
import {deleteUser} from '../../services/userService';

const {Search} = Input;

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.queryList(this.props.queryParams);
    }

    render() {
        const {
            queryList, onPageChangeHandler, onShowSizeChange, hideAddModule, showAddModule
        } = this.props;
        let {obj, loading, addVisible, queryParams, changeName} = this.props;

        let queryUserList = (name) => {
            changeName(name);
            queryList(queryParams);
        };

        const columns = [
            {
                title: '用户名',
                dataIndex: 'user',
                key: 'user',
                render: (text, record) => {
                    return (<span>{text}</span>);
                },
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    return (<span>{text}</span>);
                },
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render: (text, record) => {
                    let color = text === "男" ? "blue" : text === "女" ? "red" : "gray";
                    return (
                        <Tag color={color} key={text}>
                            {text || "暂无"}
                        </Tag>
                    );
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',
                render: (text, record) => {
                    return (<span>{moment(text).format('YYYY-MM-DD')}</span>);
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                render: (text, record) => {
                    let now = moment(new Date()).format('YYYY');
                    let birthday = moment(new Date(record['birthday'])).format('YYYY');
                    return (<span>{now - birthday}</span>);
                },
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
                render: (text, record) => {
                    let str = text;
                    if (text && text.length > 10) {
                        str = text.substring(0, 5).concat('...');
                    }
                    return (
                        <Tooltip placement="top" title={text}>
                            <span> {str} </span>
                        </Tooltip>
                    );
                }
            },
            {
                title: '创建时间',
                dataIndex: 'gmtCreate',
                key: 'gmtCreate',
                render: (text, record) => {
                    return (<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>);
                }
            },
            {
                title: '修改时间',
                dataIndex: 'gmtModify',
                key: 'gmtModify',
                render: (text, record) => {
                    return (<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>);
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    let delUser = () => {
                        deleteUser({id: record.id}).then(res => {
                            if (res.success) {
                                message.success('删除用户成功');
                                queryList && queryList({});
                            } else {
                                message.error(res.message);
                            }
                        });
                    };

                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <span>
                                    <Edit
                                        data={record}
                                        queryList={queryList}
                                    />
                                </span>
                            </Menu.Item>
                            <Menu.Item>
                                <Popconfirm
                                    title="确定删除吗？"
                                    onConfirm={delUser}
                                >
                                    <span>
                                        <Icon type="delete"/>
                                       <b> 删除用户 </b>
                                    </span>
                                </Popconfirm>
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <Dropdown
                            overlay={menu}>
                            <span> Open <Icon type="down"/> </span>
                        </Dropdown>
                    );
                },
            },
        ];

        return (
            <div className="ant-table-warpper">
                <div>
                    <div>
                        <Row>
                            <Col span={6}>
                                <Search
                                    className={'topLeftBtn'}
                                    placeholder="请输入用户名"
                                    onSearch={(value) => {
                                        queryUserList(value)
                                    }}
                                    enterButton/>
                            </Col>
                            <Col span={6} offset={12}>
                                <Button
                                    className={'topRightBtn'}
                                    icon={"plus"}
                                    onClick={showAddModule}
                                    type="primary"
                                >
                                    新增用户
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        dataSource={obj.data}
                        rowKey={record => record.id}
                        // pagination={this.state.pagination}
                        pagination={false}
                        loading={loading}
                        // onChange={this.handleTableChange}
                    />
                    <div>
                        <Pagination
                            className='ant-pagination ant-table-pagination'
                            total={obj.total}
                            showTotal={total => `共 ${total} 项`}
                            current={obj.pageNo}
                            onChange={onPageChangeHandler}
                            onShowSizeChange={onShowSizeChange}
                            showSizeChanger
                            showQuickJumper
                        />
                    </div>
                </div>
                <Modal
                    visible={addVisible}
                    title="新增用户"
                    okText={'提交'}
                    cancelText={'取消'}
                    onCancel={hideAddModule}
                    footer={null}
                >
                    <Add
                        hideAddModule={hideAddModule}
                        queryList={queryList}
                    />
                </Modal>
            </div>
        );
    }
}

export default List;