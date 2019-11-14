import React, {Component} from 'react';
import {
    Avatar, Button, Col, Comment, Form, Icon, Input, List, message as Message, Row, Tooltip,
    Spin, Popconfirm
} from 'antd';
import {withRouter} from 'react-router-dom'
import moment from 'moment';
import {userLike, commitContent} from '../../services/causerieService';

const {TextArea} = Input;

// const IconText = ({type, text}) => (
//     <span>
//     <Icon type={type} style={{marginRight: 8}}/>
//         {text}
//   </span>
// );
// renderItem={item => (
//     <List.Item
//         key={item.title}
//         actions={[
//             <IconText type="star-o" text="156" key="list-vertical-star-o"/>,
//             <IconText type="like-o" text="156" key="list-vertical-like-o"/>,
//             <IconText type="message" text="2" key="list-vertical-message"/>,
//         ]}
//         extra={
//             <div>
//                 <img
//                     width={100}
//                     alt="logo"
//                     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//                 />
//
//                 <img
//                     width={100}
//                     alt="logo"
//                     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//                 />
//             </div>
//         }
//     >
//         <List.Item.Meta
//             avatar={<Avatar src={item.avatar}/>}
//             title={<a href={item.href}>{item.title}</a>}
//             description={item.description}
//         />
//         {item.content}
//     </List.Item>
// )}

const spinIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

const CommentList = ({comments, loading}) => (
    <Spin
        tip="加载中..."
        indicator={spinIcon}
        spinning={loading}
    >
        <List
            dataSource={comments}
            // header={`共 ${comments.length} ${comments.length > 1 ? '条' : '条'}`}
            header=' '
            itemLayout="horizontal"
            renderItem={
                props => <Comment {...props} />
            }
            pagination={{
                onChange: page => {
                },
                pageSize: 4,
                showTotal: (total) => {
                    return `共 ${total} 条`;
                }
            }}
        />
    </Spin>
);

const Editor = ({onChange, onSubmit, loading, value}) => (
    <Spin
        tip="加载中..."
        indicator={spinIcon}
        spinning={loading}
    >
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
                onClick={onSubmit}
                type="primary">
                发布
            </Button>
        </Form.Item>
    </Spin>
);

class Causerie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false,
            commitLoading: false
        };
    }

    componentDidMount() {
        this.props.queryCauserieList({isPage: false})
    }

    getCauserieList = (data) => {
        let con = [];
        data && data.map(item => {
            con.push({
                actions: this.getActions(item['id'], item['authorUser'], item['authorName'], item['likes']),
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                author: <p> 作者:
                    <b
                        style={{color: '#FF99FF', cursor: 'pointer'}}
                        onClick={() => this.openUser(item['authorUser'])}
                    > {item['authorName']} </b>
                </p>,
                content: <p>{item['content']}</p>,
                datetime: moment(moment(item['commitTime']).format('YYYY-MM-DD')).fromNow()
            });
            return item;
        });
        return con;
    };

    openUser = (user) => {
        // this.props.history.push(`/app/user/list?user=${user}`)
        window.open(`/app/user/list?user=${user}`, '_blank')
    };

    userLike = (contentId, theme) => {
        userLike({contentId: contentId, user: this.props.jti, like: theme})
            .then(res => {
                const {success, message} = res;
                if (success) {
                    this.props.queryCauserieList({isPage: false});
                } else {
                    Message.error(message);
                }
            })
    };

    userComment = () => {
        Message.warning("评论个锤子，赶紧点赞去!")
    };

    userStar = () => {
        Message.warning("收藏个锤子，赶紧点赞去!")
    };

    userShareAlt = () => {
        Message.warning("分享个锤子，赶紧点赞去!")
    };

    delCommon = (id, user, name) => {
        if (user === this.props.jti) {
            Message.warning("敬请期待")
        } else {
            Message.error("仅作者 ~" + name + "~ 可删除！")
        }
    };

    getActions = (contentId, authorUser, authorName, likes) => {
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
            <span key="comment-basic-comment">
                <Tooltip title="评论">
                      <Icon
                          type="message"
                          onClick={() => this.userComment()}
                      /> 评论
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{0}</span>
            </span>,
            <span key="comment-star-comment">
                <Tooltip title="收藏">
                      <Icon
                          type="star"
                          onClick={() => this.userStar()}
                      /> 收藏
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{0}</span>
            </span>,
            <span key="comment-share-alt-comment">
                <Tooltip title="转发">
                      <Icon
                          type="share-alt"
                          onClick={() => this.userShareAlt()}
                      /> 分享
                </Tooltip>
            </span>,
            <Popconfirm
                title="确定要删除吗？"
                onConfirm={() => this.delCommon(contentId, authorUser, authorName)}
                okText="狠心删除"
                cancelText="我再想想"
                trigger={"hover"}
            >
                <span
                    style={{
                        position: "absolute", right: 0, marginTop: -14,
                        color: authorUser === jti ? "gray" : "#FF5566"
                    }}
                >
                    <Icon
                        type="delete"
                    /> 删除
                </span>
            </Popconfirm>
        ];
    };

    handleSubmit = () => {
        const {value} = this.state;
        const {jti, queryCauserieList} = this.props;
        if (!value) {
            return;
        }

        this.setState({commitLoading: true});
        commitContent({content: value, user: jti})
            .then(res => {
                setTimeout(() => {
                    this.setState({commitLoading: false, value: ''})
                }, 1000);
                const {success, data, message} = res;
                if (success) {
                    Message.info(data);
                    queryCauserieList({isPage: false})
                } else {
                    Message.error(message);
                }
            });
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {value} = this.state;
        const {causerieObj} = this.props;
        let comments = this.getCauserieList(causerieObj.data);

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
                                    loading={this.state.commitLoading}
                                    value={value}
                                />
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={15} offset={4}>
                        {
                            comments.length > 0 && <CommentList
                                comments={comments}
                                loading={this.state.loading}
                            />
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Causerie);