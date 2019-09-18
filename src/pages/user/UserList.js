import React from 'react';
import {
    Table,
    Menu,
    Popconfirm,
    Dropdown,
    Icon,
    Tag,
    Button,
    Input,
    Row,
    Col,
    Tooltip,
    Pagination,
    Modal,
    message
} from 'antd';
import '../../App.css';
import moment from "moment";
import Edit from "./Edit";
import Add from "./Add";
import CallUtils from "../../utils/CallUtils";

const {Search} = Input;
let defPage = {
    'pageNo': 1,
    'pageSize': 13,
    'name': null
}

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
            addVisible: false
        }
    }

    componentDidMount() {
        this.getObj();
    }

    getObj = () => {
        // fetch(
        //     'http://localhost:8888/user/query',
        //     {
        //         method: "POST",
        //         body: JSON.stringify(defPage),
        //         headers: {'Content-Type': 'application/json;charset=utf-8'}
        //     }
        // ).then(res => res.json()).then(data => {
        //     this.setState({obj: data})
        // }).catch(e => console.log('错误:', e));

        CallUtils.doPost('/user/query', defPage).then(data => {
            if (data['code'] === 200) {
                this.setState({obj: data['data']})
            } else {
                message.error(data['message']);
            }
        });

    };

    // getObj = async () => {
    //     return await CallUtils.doPost('/user/query', defPage);
    // };

    onPageChangeHandler = (pageNo, pageSize) => {
        defPage = {
            'pageNo': pageNo,
            'pageSize': pageSize
        };
        this.getObj();
    };

    onShowSizeChange = (pageNo, pageSize) => {
        defPage = {
            'pageNo': pageNo,
            'pageSize': pageSize
        };
        this.getObj();
    };

    showAddModule = () => {
        this.setState({
            addVisible: true
        })
    };

    hideAddModule = () => {
        this.setState({
            addVisible: false
        })
    };

    render() {
        const columns = [
            {
                title: 'User',
                dataIndex: 'user',
                key: 'user',
                render: (text, record) => {
                    return (<span>{text}</span>);
                },
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    return (<span>{text}</span>);
                },
            },
            {
                title: 'Sex',
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
                title: 'Age',
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
                    let delData = () => {
                        alert("删除个🔨")
                    }

                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <span>
                                    <Edit
                                        data={record}
                                    />
                                </span>
                            </Menu.Item>
                            <Menu.Item>
                                <Popconfirm
                                    title="确定删除吗？"
                                    onConfirm={delData}
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
                                    onSearch={value => console.log(value)}
                                    enterButton/>
                            </Col>
                            <Col span={6} offset={12}>
                                <Button
                                    className={'topRightBtn'}
                                    icon={"plus"}
                                    onClick={this.showAddModule}
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
                        dataSource={this.state.obj.data}
                        rowKey={record => record.id}
                        // pagination={this.state.pagination}
                        pagination={false}
                        loading={this.state.loading}
                        // onChange={this.handleTableChange}
                    />
                    <div>
                        <Pagination
                            className='ant-pagination ant-table-pagination'
                            total={this.state.obj.total}
                            showTotal={total => `共 ${total} 项`}
                            current={this.state.obj.pageNo}
                            onChange={this.onPageChangeHandler}
                            onShowSizeChange={this.onShowSizeChange}
                            showSizeChanger
                            showQuickJumper
                        />
                    </div>
                </div>
                <Modal
                    visible={this.state.addVisible}
                    title="新增用户"
                    okText={'提交'}
                    cancelText={'取消'}
                    onCancel={this.hideAddModule}
                    footer={null}
                >
                    <Add
                        hideAddModule={this.hideAddModule}
                        getObj={this.getObj}
                    />
                </Modal>
            </div>
        );
    }
}