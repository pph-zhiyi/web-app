import React, {Component} from 'react';
import {Card, Icon, List, message as Message, Spin} from 'antd';

import * as causerieService from "../../services/stackService";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stacks: [],
            loading: false
        };
    }

    componentDidMount() {
        this.query();
    }

    query = () => {
        this.setState({loading: true});
        causerieService.get()
            .then(res => {
                const {success, data, message} = res;
                if (success) {
                    setTimeout(
                        () => {
                            this.setState({
                                loading: false,
                                stacks: data
                            })
                        },
                        1000)
                } else {
                    this.setState({loading: false});
                    Message.error(message);
                }
            })
    };

    render() {
        const {stacks, loading} = this.state;

        return (<div>
            <List
                loading={loading}
                header={
                    <div style={{textAlign: "right"}}>
                        {
                            loading
                                ? <Spin
                                    tip="加载中..."
                                    indicator={<Icon style={{fontSize: 14}} type="loading" spin/>}
                                />
                                : <span
                                    className='blueBtn'
                                    onClick={this.query}
                                >
                                    <Icon type="redo"/> 刷新
                                </span>
                        }
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