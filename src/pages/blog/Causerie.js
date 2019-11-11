import React, {Component} from 'react';
import {Comment, Avatar, Form, Button, List, Input, Icon, Tooltip, Row, Col, message as Message} from 'antd';
import jwt_decode from 'jwt-decode'
import moment from 'moment';
import {queryCauserieList} from '../../services/causerieService';

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
            value: '',
            action: null,
            likes: 0,
            dislikes: 0,
        };
    }

    componentDidMount() {
        queryCauserieList({isPage: false})
            .then(res => {
                const {success, message, data} = res;
                if (success) {
                    let con = [];
                    data.data.map(item => {
                        con.push({
                            actions: this.getActions(item['likes']),
                            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                            author: item['authorName'],
                            content: <p>{item['content']}</p>,
                            datetime: moment(item['commitTime']).fromNow()
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

    getActions = (likes) => {
        const {jti} = jwt_decode(localStorage.token);
        let link = 0, dislike = 0, theme;
        let linkName = '暂无', dislikeName = '暂无';
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
                dislikeName += ','.concat(item['likeName']);
            }
            return item;
        });
        return [
            <span key="comment-basic-like">
                <Tooltip title={linkName === '暂无' ? linkName : linkName.substring(1)}>
                      <Icon
                          type="like"
                          theme={theme === 1 ? "filled" : "outlined"}
                          onClick={() => this.like()}
                      />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{link}</span>
                </span>,
            <span key="comment-basic-dislike">
                <Tooltip title={dislikeName === '暂无' ? dislikeName : dislikeName.substring(1)}>
                      <Icon
                          type="dislike"
                          theme={theme === 0 ? "filled" : "outlined"}
                          onClick={() => this.dislike()}
                      />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{dislike}</span>
            </span>,
            <span key="comment-basic-reply-to"> 赞一个 </span>,
            <Tooltip title="删除">
                <span style={{position: "absolute", right: 0, marginTop: -14}}>
                    <Icon
                        type="delete"
                        onClick={(e) => this.del(e)}
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