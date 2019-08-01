import React from 'react';
import {Table, Menu, Popconfirm, Dropdown, Icon, Tag} from 'antd';
import '../../App.css';
import moment from "moment";
import Edit from "./Edit";

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        }
    }

    componentDidMount() {
        fetch(
            'http://localhost:8888/user/query',
            {
                method: "POST",
                body: JSON.stringify({}),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }
        ).then(res => res.json()).then(data => {
            this.setState({listData: data.data})
        }).catch(e => console.log('错误:', e));
    }


    render() {
        const columns = [
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
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                render: (text, record) => {
                    if (text) {
                        return (<span> {text} </span>);
                    } else {
                        return (<Tag color="gray" key={text}> 暂无 </Tag>);
                    }
                },
            },
            {
                title: '创建时间',
                dataIndex: 'gmt_create',
                key: 'gmt_create',
                render: (text, record) => {
                    return (<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>);
                }
            },
            {
                title: '修改时间',
                dataIndex: 'gmt_modify',
                key: 'gmt_modify',
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
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        dataSource={this.state.listData}
                        rowKey={record => record.id}
                    />
                </div>
            </div>
        );
    }
}