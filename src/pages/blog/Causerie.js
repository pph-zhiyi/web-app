import React, {Component} from 'react';
import {Avatar, Button, Col, Comment, Form, Icon, Input, List, message as Message, Row, Tooltip} from 'antd';
import moment from 'moment';
import {queryCauserieList, userLike} from '../../services/causerieService';

const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        // header={`共 ${comments.length} ${comments.length > 1 ? '条' : '条'}`}
        header=' '
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
        pagination={{
            onChange: page => {
            },
            pageSize: 4,
            showTotal: (total) => {
                return `共 ${total} 条`;
            }
        }}
    />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea
                placeholder="随便写点儿什么吧....."
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
            value: ''
        };
    }

    componentDidMount() {
        this.queryCauserieList({isPage: false});
    }

    queryCauserieList = (params) => {
        queryCauserieList(params)
            .then(res => {
                const {success, message, data} = res;
                if (success) {
                    let con = [];
                    data.data.map(item => {
                        con.push({
                            actions: this.getActions(item['id'], item['likes']),
                            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                            author: <p>
                                作者：<a target="view_frame"
                                      href={"localhost:3000/app/user/list?name=" + item['authorUser']}>
                                {item['authorName']}</a>
                            </p>,
                            content: <p>{item['content']}</p>,
                            datetime: moment(moment(item['commitTime']).format('YYYY-MM-DD')).fromNow()
                        });
                        return item;
                    });
                    this.setState({
                        comments: con
                    })
                } else {
                    Message.error(message);
                }
            });
    };

    userLike = (contentId, theme) => {
        userLike({contentId: contentId, user: this.props.jti, like: theme})
            .then(res => {
                const {success, message} = res;
                if (success) {
                    this.queryCauserieList({isPage: false});
                } else {
                    Message.error(message);
                }
            })
    };

    userComment = () => {
        Message.warning("评论个锤子，赶紧点赞去")
    };

    del = (e) => {
        Message.info("删除个锤子")
    };

    getActions = (contentId, likes) => {
        let link = 0, dislike = 0, theme;
        let linkName = '暂无', dislikeName = '暂无';
        const {jti} = this.props;
        likes.map(item => {
            if (item['isLike'] === 1) {
                linkName = linkName === '暂无' ? '' : linkName;
                theme = jti === item['likeUser'] ? 1 : theme;
                link++;
                linkName += ','.concat(item['likeName']);
            } else if (item['isLike'] === 0) {
                dislikeName = dislikeName === '暂无' ? '' : dislikeName;
                theme = jti === item['likeUser'] ? 0 : theme;
                dislike++;
                dislikeName += ', '.concat(item['likeName']);
            }
            return item;
        });
        return [
            <span key="comment-basic-like">
                <Tooltip title={linkName === '暂无' ? linkName : linkName.substring(1)}>
                      <Icon
                          type="like"
                          theme={theme === 1 ? "filled" : "outlined"}
                          onClick={() => this.userLike(contentId, theme === 1 ? null : 1)}
                      />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{link}</span>
                </span>,
            <span key="comment-basic-dislike">
                <Tooltip title={dislikeName === '暂无' ? dislikeName : dislikeName.substring(1)}>
                      <Icon
                          type="dislike"
                          theme={theme === 0 ? "filled" : "outlined"}
                          onClick={() => this.userLike(contentId, theme === 0 ? null : 0)}
                      />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{dislike}</span>
            </span>,
            <span key="comment-basic-like-to"> 赞一个 </span>,
            <span key="comment-basic-comment">
                <Tooltip title="评论">
                      <Icon
                          type="message"
                          onClick={() => this.userComment()}
                      />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{0}</span>
            </span>,
            <span key="comment-basic-reply-to"> 评论 </span>,
            <Tooltip title="删除">
                <span style={{position: "absolute", right: 0, marginTop: -14}}>
                    <Icon
                        type="delete"
                        onClick={(e) => this.del(e)}
                        disabled={true}
                    /> 删除
                </span>
            </Tooltip>
        ];
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        actions: this.getActions([]),
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
                    <Col span={15} offset={4}>
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
                </Row>
                <Row>
                    <Col span={15} offset={4}>
                        {
                            comments.length > 0 && <CommentList comments={comments}/>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Causerie;