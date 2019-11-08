import React, {Component} from 'react';
import {Comment, Avatar, Form, Button, List, Input, Icon, Tooltip, Row, Col} from 'antd';
import moment from 'moment';

const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        header={`共 ${comments.length} ${comments.length > 1 ? '条' : '条'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea
                placeholder="随便写点儿什么吧..."
                rows={5}
                onChange={onChange}
                value={value}
            />
        </Form.Item>
        <Form.Item>
            <Button
                icon="check"
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary">
                提交
            </Button>
        </Form.Item>
    </div>
);

class Causerie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
            action: null,
            likes: 0,
            dislikes: 0,
        };
    }

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };

    del = (e) => {
        console.log('删除', e)
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            const {action, likes, dislikes} = this.state;
            console.log(this.state);
            const actions = [
                <span key="comment-basic-like">
                <Tooltip title="Like">
                      <Icon
                          type="like"
                          theme={action === 'liked' ? 'filled' : 'outlined'}
                          onClick={() => this.like()}
                      />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{likes}</span>
                </span>,
                <span key=' key="comment-basic-dislike"'>
                    <Tooltip title="Dislike">
                          <Icon
                              type="dislike"
                              theme={action === 'disliked' ? 'filled' : 'outlined'}
                              onClick={() => this.dislike()}
                          />
                    </Tooltip>
                    <span style={{paddingLeft: 8, cursor: 'auto'}}>{dislikes}</span>
                </span>,
                <span key="comment-basic-reply-to"> 赞一个 </span>,
                <Tooltip title="删除">
                    <span style={{position: "absolute", right: 0, marginTop: -14}}>
                        <Icon
                            type="delete"
                            theme={action === 'liked' ? 'filled' : 'outlined'}
                            onClick={(e) => this.del(e)}
                        /> 删除
                    </span>
                </Tooltip>
            ];
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        actions: actions,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        author: '锤子哦',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow()
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {comments, submitting, value} = this.state;
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <div style={{backgroundColor: "wheat"}}>a</div>
                    </Col>
                    <Col span={15}>
                        <Comment
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                    </Col>
                    <Col span={5}>
                        <div style={{backgroundColor: "wheat"}}>b</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div style={{backgroundColor: "wheat"}}>c</div>
                    </Col>
                    <Col span={15}>
                        {
                            comments.length > 0 && <CommentList comments={comments}/>
                        }
                    </Col>
                    <Col span={5}>
                        <div style={{backgroundColor: "wheat"}}>d</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Causerie;