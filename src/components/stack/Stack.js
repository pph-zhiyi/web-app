import React, {Component} from 'react';
import {Card, List, message as Message, Icon} from 'antd';

import * as causerieService from "../../services/stackService";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stacks: []
        };
    }

    componentDidMount() {
        causerieService.get()
            .then(res => {
                const {success, data, message} = res;
                if (success) {
                    this.setState({
                        stacks: data
                    })
                } else {
                    Message.error(message);
                }
            }).catch(e => {
            Message.error("请求异常！");
        })
    }

    render() {
        const {stacks} = this.state;

        return (<div>
            <List
                header={
                    <div style={{textAlign: "right"}}>
                        <Icon type="loading"/> 刷新
                    </div>
                }
                style={{margin: 50}}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 1,
                }}
                dataSource={stacks}
                renderItem={item => (
                    <List.Item>
                        <Card title={"线程: " + item.threadName}>
                            <List
                                style={{padding: 30, textAlign: "center"}}
                                size="large"
                                dataSource={item.element}
                                renderItem={item => (
                                    <List.Item>
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </div>);
    }
}

export default Blog;