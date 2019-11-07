import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {
    Table, Menu, Popconfirm, Dropdown, Icon, Tag, Button, Input, Row, Col, Tooltip, Pagination, Modal, message,
    Badge, LocaleProvider
} from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import Edit from "./Edit";
import Add from "./Add";
import '../../index.css';
import moment from "moment";
import {deleteUser, queryLoginLogByUser} from '../../services/userService';

const {Search} = Input;

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedData: {},
            expandedLoading: false
        };
    }

    componentDidMount() {
        this.props.queryList(this.props.queryParams);
    }

    onExpand = (expanded, record) => {
        if (expanded) {
            this.setState({
                expandedLoading: true
            });
            queryLoginLogByUser({user: record.user})
                .then(res => {
                    if (res.success) {
                        let oldExpandedData = this.state.expandedData;
                        oldExpandedData[record.user] = res.data;
                        this.setState({
                            expandedLoading: false,
                            expandedData: oldExpandedData
                        });
                    } else {
                        message.error(res.message);
                    }
                });
        }
    };

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
                render: (text) => {
                    return (<span>{text}</span>);
                },
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text) => {
                    return (<span>{text}</span>);
                },
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render: (text) => {
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
                render: (text) => {
                    return (<span>{moment(text).format('YYYY-MM-DD')}</span>);
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                // defaultSortOrder: 'descend',
                sorter: (a, b) => {
                    let now = moment(new Date()).format('YYYY');
                    let b1 = moment(new Date(a['birthday'])).format('YYYY');
                    let b2 = moment(new Date(b['birthday'])).format('YYYY');

                    return ((now - b1) - (now - b2));
                },
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
                render: (text) => {
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
                title: '注册时间',
                dataIndex: 'gmtCreate',
                key: 'gmtCreate',
                render: (text) => {
                    return (<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>);
                }
            },
            {
                title: '最近修改',
                dataIndex: 'gmtModify',
                key: 'gmtModify',
                render: (text) => {
                    return (<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>);
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
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
                            <span className='blueBtn'> Open <Icon type="down"/> </span>
                        </Dropdown>
                    );
                },
            },
        ];

        const expandedRowRender = (record) => {
            const childColumns = [
                {
                    title: '用户名',
                    dataIndex: 'user',
                    key: 'user'
                },
                {
                    title: '密码',
                    dataIndex: 'password',
                    key: 'password',
                    render: (text, record) => {
                        if (record.isLogin === 1) {
                            text = "***";
                        }
                        return (
                            <span>{text}</span>
                        );
                    }
                },
                {
                    title: '登录时间',
                    dataIndex: 'entryTime',
                    key: 'entryTime',
                    render: (text) => {
                        return (<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>);
                    }
                },
                {
                    title: '是否通过',
                    key: 'isLogin',
                    dataIndex: 'isLogin',
                    render: (text) => {
                        let status = text ? "success" : "error";
                        let msg = text ? "成功" : "失败";
                        return (
                            <span>
                                <Badge status={status}/>
                                {msg}
                            </span>
                        );
                    }
                },
                {
                    title: '用户信息',
                    dataIndex: 'userInfo',
                    key: 'userInfo',
                    render: (text) => {
                        let str = text;
                        if (text && text.length > 30) {
                            str = text.substring(0, 20).concat('......');
                        }
                        if (!text) {
                            str = '暂无';
                        }
                        return (
                            <Tooltip placement="top" title={text}>
                                <span className='blueBtn'> {str} </span>
                            </Tooltip>
                        );
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    dataIndex: 'action',
                    render: () => {
                        return (
                            <span className='blueBtn'> 详情 </span>
                        );
                    }

                }
            ];
            return (
                <Table
                    columns={childColumns}
                    dataSource={this.state.expandedData[record.user]}
                    rowKey={record => record.id}
                    pagination={true}
                    loading={this.state.expandedLoading}
                />
            );
        };

        return (
            <div className="ant-table-warpper">
                <div>
                    <div>
                        <Row>
                            <Col span={6}>
                                <Search
                                    style={{marginLeft: 10}}
                                    className={'topLeftBtn'}
                                    placeholder="请输入用户名（全局模糊匹配）"
                                    onSearch={(value) => {
                                        queryUserList(value)
                                    }}
                                    defaultValue={this.props.queryParams.name}
                                    enterButton
                                />
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
                        pagination={false}
                        loading={loading}
                        expandedRowRender={record => {
                            return expandedRowRender(record)
                        }}
                        onExpand={(expanded, record) => this.onExpand(expanded, record)}
                        expandRowByClick={false}
                    />
                    <div>
                        <LocaleProvider locale={zhCN}>
                            <Pagination
                                className='ant-pagination ant-table-pagination'
                                total={obj.total}
                                showTotal={total => `共 ${total} 项`}
                                current={obj.pageNo}
                                pageSize={obj.pageSize}
                                onChange={onPageChangeHandler}
                                onShowSizeChange={onShowSizeChange}
                                showSizeChanger
                                showQuickJumper
                            />
                        </LocaleProvider>
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