import React from 'react';
import { Table, Tag, Menu, Popconfirm, Dropdown, Icon, } from 'antd';
import '../../App.css';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    return (<span>text</span>);
                },
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    let delData = () => {
                        alert("调用删除")
                    }
                    let updateData = () => {
                        alert("调用修改")
                    }

                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <span onClick={updateData}>
                                    <b>修改</b>
                                </span>
                            </Menu.Item>
                            <Menu.Item>
                                <Popconfirm
                                    title="确定删除吗？"
                                    onConfirm={delData}
                                >
                                    <span>删除</span>
                                </Popconfirm>
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <Dropdown
                            overlay={menu}>
                            <span> Open <Icon type="down" /> </span>
                        </Dropdown>
                    );
                },
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ];

        return (
            <div className="ant-table-warpper">
                <div>
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        dataSource={data}
                        rowKey={record => record.id}
                    />
                </div>
            </div>
        );
    }
}