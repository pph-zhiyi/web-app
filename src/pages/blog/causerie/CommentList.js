import React, {Component} from 'react';
import {
    Comment, Divider, Icon, List, message as Message, Popconfirm, Spin, Tooltip, Popover,
    Input, Button, Avatar
} from 'antd';
import moment from 'moment';
import {deleteContent, queryCauserieList, userLike, addComment} from '../../../services/causerieService';
import InfiniteScroll from 'react-infinite-scroller';
import './style.css'
import CommentEditor from "./CommentEditor";

const {TextArea} = Input;

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hasMore: true,
            data: [],
            total: 0,
            pageNo: 1,
            pageSize: 5,
            basicVal: '',
            arrBasicVisible: []
        };
    }

    componentDidMount() {
        const {pageNo, pageSize} = this.state;
        queryCauserieList({pageNo, pageSize}).then((res) => {
            const {data} = res;
            let {arrBasicVisible} = this.state;
            data.data.forEach((item, index) => {
                arrBasicVisible[index] = true;
            });
            this.setState({
                arrBasicVisible,
                data: data.data,
                total: data.total
            })
        }).catch((e) => {
            Message.error("请求结果异常");
        });
    }

    getCauserieList = (data) => {
        let con = [];
        data && data.map((item, index) => {
            con.push({
                actions: this.getActions(item, index),
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                author: <p> 作者:
                    <b className='author-text-b'
                       onClick={() => this.openUser(item['authorUser'])}
                    > {item['authorName']} </b>
                </p>,
                content: <i><b>{item['content']}</b></i>,
                datetime: moment(moment(item['commitTime']).format('YYYY-MM-DD')).fromNow()
            });
            return item;
        });
        return con;
    };

    setBasicVal = (e) => {
        this.setState({
            basicVal: e.target.value
        })
    };

    setBasicVisible = (index, visible) => {
        let {arrBasicVisible} = this.state;
        arrBasicVisible[index] = visible;
        this.setState({arrBasicVisible})
    };

    getActions = (item, index) => {
        let contentId = item['id'];
        let authorUser = item['authorUser'], authorName = item['authorName'];
        let likes = item['likes'], comments = item['comments'];

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
                <Tooltip title="赞">
                    <Icon
                        type="like"
                        theme={theme === 1 ? "filled" : "outlined"}
                        onClick={() => this.userLike(contentId, theme === 1 ? null : 1)}
                    />
                </Tooltip>
                <Tooltip title={linkName === '暂无' ? linkName : linkName.substring(1)}>
                    <span className='action-basic-span'>{link}</span>
                </Tooltip>
                </span>,
            <span key="comment-basic-dislike">
                <Tooltip title="踩">
                    <Icon
                        type="dislike"
                        theme={theme === 0 ? "filled" : "outlined"}
                        onClick={() => this.userLike(contentId, theme === 0 ? null : 0)}
                    />
                </Tooltip>
                <Tooltip title={dislikeName === '暂无' ? dislikeName : dislikeName.substring(1)}>
                    <span className='action-basic-span'>{dislike}</span>
                </Tooltip>
            </span>,
            <span key="comment-basic-comment">
                <Tooltip title="评论">
                    <Popover
                        key={contentId}
                        title={<span>想对 <i className='comment-basic-comment-red-i'>{authorName}</i> 说些什么呢.....</span>}
                        trigger="click"
                        content={(
                            <div className='comment-basic-comment-div'>
                                <TextArea
                                    placeholder="随便写点儿什么吧....."
                                    rows={5}
                                    value={this.state.basicVal}
                                    onChange={(e) => this.setBasicVal(e)}
                                />
                                <Button
                                    className='comment-basic-comment-button'
                                    type='link'
                                    icon='message'
                                    onClick={() => this.userComment(contentId, authorUser, authorUser === jti, item['content'], index)}
                                > 评论
                                </Button>
                            </div>
                        )}
                        placement="bottomRight"
                    >
                        <Icon
                            type="message"
                        /> 评论
                    </Popover>
                </Tooltip>
                <span className='action-basic-span'>
                    {comments.length}
                    {comments.length ? this.state.arrBasicVisible[index]
                        ? <span onClick={() => this.setBasicVisible(index, false,)}><Icon type="caret-down"/> 展开 </span>
                        : <span onClick={() => this.setBasicVisible(index, true)}><Icon type="caret-up"/> 收起 </span>
                        : ""
                    }
                </span>
            </span>,
            <span key="comment-star-comment">
                <Tooltip title="收藏">
                      <Icon
                          type="star"
                          onClick={() => this.userStar()}
                      /> 收藏
                </Tooltip>
                <span className='action-basic-span'>{0}</span>
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
                onConfirm={() => this.delCommon(contentId, authorUser, authorName, jti)}
                okText="狠心删除"
                cancelText="我再想想"
                trigger="hover"
            >
                <span
                    className='action-basic-del'
                    style={{color: authorUser === jti ? "gray" : "#FF5566"}}
                >
                    <Icon
                        type="delete"
                    /> 删除
                </span>
            </Popconfirm>,
            <span hidden={this.state.arrBasicVisible[index]}>
                {
                    comments.length > 0 &&
                    <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={item => (
                            <List.Item
                                extra={
                                    <Popover
                                        key={item['id']}
                                        title={
                                            <span>
                                                想对
                                                <i
                                                    className='comment-basic-comment-red-i'
                                                >
                                                    {item['commentName']}
                                                </i>
                                                说些什么呢.....
                                            </span>
                                        }
                                        trigger="click"
                                        content={(
                                            <div className='comment-basic-comment-div'>
                                                <TextArea
                                                    placeholder="随便写点儿什么吧....."
                                                    rows={5}
                                                    value={this.state.basicVal}
                                                    onChange={(e) => this.setBasicVal(e)}
                                                />
                                                <Button
                                                    className='comment-basic-comment-button'
                                                    type='link'
                                                    icon='message'
                                                    onClick={
                                                        () => this.userComment(contentId, item['commentUser'],
                                                            jti === authorUser,
                                                            item['commentContent'], index)
                                                    }
                                                > 评论
                                                </Button>
                                            </div>
                                        )}
                                        placement="bottom"
                                    >
                                        <Icon
                                            type="message"
                                        /> 评论
                                    </Popover>
                                }
                                // actions={['demo']}
                            >
                                <List.Item.Meta
                                    className='list-item-meta-width'
                                    avatar={<Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                    }
                                    title={
                                        <span className='list-item-meta-title-span-all'>
                                            {
                                                item['isContentAuthor'] && authorUser === item['authorUser']
                                                    ? (
                                                        <span
                                                            style={{color: item['isContentAuthor'] ? '#FF99FF' : '#1890ff'}}
                                                        >
                                                            {item['commentName']}{item['isContentAuthor'] ? '(作者)' : ''}
                                                        </span>
                                                    )
                                                    : (
                                                        <span>
                                                            <span
                                                                style={{color: item['isContentAuthor'] ? '#FF99FF' : '#1890ff'}}
                                                            >
                                                                {item['commentName']}{item['isContentAuthor'] ? '(作者)' : ''}
                                                            </span>
                                                            <span> 回复  </span>
                                                            <span
                                                                style={{color: item['authorUser'] === authorUser ? '#FF99FF' : '#1890ff'}}
                                                            >
                                                                {item['authorName']} {item['authorUser'] === authorUser ? '(作者)' : ''}
                                                            </span>
                                                        </span>
                                                    )
                                            }
                                            <Tooltip
                                                title={item['oldContent']}
                                            >
                                                <span
                                                    className='list-item-meta-title-old-content'
                                                >
                                                    {
                                                        item['oldContent'].length > 15
                                                            ? item['oldContent'].substring(0, 15).concat("......")
                                                            : item['oldContent']
                                                    }
                                                </span>
                                            </Tooltip>
                                        </span>
                                    }
                                    description={<i><b>{item['commentContent']}</b></i>}
                                />
                            </List.Item>
                        )}
                    />
                }
            </span>
        ];
    };

    openUser = (user) => {
        // this.props.history.push(`/app/user/list?user=${user}`)
        window.open(`/app/user/list?user=${user}`, '_blank')
    };

    userLike = (contentId, theme) => {
        userLike({contentId: contentId, user: this.props.jti, like: theme}).then(res => {
            const {success, message} = res;
            if (success) {
                const {pageSize} = this.state;
                queryCauserieList({pageNo: 1, pageSize, id: contentId}).then((res) => {
                    const {data} = res;
                    let da = this.state.data;
                    this.state.data.map((item, index) => {
                        if (item.id === contentId) {
                            da.splice(index, 1, data.data[0])
                        }
                        return item;
                    });
                    this.setState({
                        data: da
                    })
                }).catch((e) => {
                    Message.error("请求结果异常");
                });
            } else {
                Message.error(message);
            }
        })
    };

    userComment = (contentId, authorUser, isContentAuthor, oldContent, index) => {
        const {basicVal} = this.state;
        if (basicVal) {
            const {jti} = this.props;
            addComment({
                contentId,
                authorUser,
                commentUser: jti,
                isContentAuthor,
                commentContent: basicVal,
                oldContent
            }).then(res => {
                const {success, data, message} = res;
                if (success) {
                    Message.info(data);
                    queryCauserieList({id: contentId, pageNo: 1, pageSize: 1}).then(res => {
                        let {data, arrBasicVisible} = this.state;
                        data.splice(index, 1, res.data.data[0]);
                        this.setState({arrBasicVisible, data, basicVal: ''});
                    }).catch((e) => {
                        Message.error("请求结果异常");
                    });
                } else {
                    Message.error(message)
                }
            });
        }
    };

    userStar = () => {
        Message.warning("收藏个锤子，赶紧点赞去!")
    };

    userShareAlt = () => {
        Message.warning("分享个锤子，赶紧点赞去!")
    };

    delCommon = (id, user, name, jti) => {
        if (user === jti) {
            deleteContent({id, user}).then(res => {
                const {success, data, message} = res;
                if (success) {
                    let da = this.state.data;
                    this.state.data.map((item, index) => {
                        if (item.id === id) {
                            da.splice(index, 1)
                        }
                        return item;
                    });
                    this.setState({
                        data: da,
                        total: this.state.total - 1
                    });
                    Message.info(data)
                } else {
                    Message.info(message)
                }
            }).catch((e) => {
                Message.error("请求结果异常");
            });
        } else {
            Message.error("仅作者 ~" + name + "~ 可删除！")
        }
    };

    handleInfiniteOnLoad = () => {
        let {data, pageNo, total, pageSize} = this.state;
        let pn = pageNo + 1;
        this.setState({
            loading: true,
        });
        if (data.length >= total) {
            Message.info('我是有底线的.....');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }

        queryCauserieList({pageNo: pn, pageSize}).then((res) => {
            const {data, success, message} = res;
            if (success) {
                let da = this.state.data;
                let daLen = da.length;
                let {arrBasicVisible} = this.state;
                data.data.forEach((item, index) => {
                    arrBasicVisible[daLen + index] = true;
                });
                this.setState({
                    arrBasicVisible,
                    data: da.concat(data.data),
                    pageNo: pn,
                    hasMore: true,
                    loading: false,
                })
            } else {
                Message.error(message)
            }
        }).catch((e) => {
            Message.error("请求结果异常");
        });
    };

    listHeader = () => {
        const {total} = this.state;
        return (
            <div>
                <span>共 {total} 项</span>
                <Icon className='list-header-icon' type="menu"/>
            </div>
        );
    };

    addComment = (obj) => {
        let {data, arrBasicVisible} = this.state;
        data.splice(0, 0, obj);
        arrBasicVisible[data.length + 1] = true;
        this.setState({arrBasicVisible, data})
    };

    render() {
        const {loading, hasMore, data} = this.state;
        const {jti} = this.props;
        let commons = this.getCauserieList(data);

        return (
            <div>
                <Comment
                    content={
                        <CommentEditor
                            jti={jti}
                            queryCauserieList={queryCauserieList}
                            addComment={this.addComment}
                        />
                    }
                />
                <div className="demo-infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!loading && hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={commons}
                            header={this.listHeader()}
                            itemLayout="horizontal"
                            renderItem={
                                props => <Comment {...props} />
                            }
                            footer={<Divider dashed> 我是有底线的 </Divider>}
                        >
                            {loading && hasMore && (
                                <div className="demo-loading-container">
                                    <Spin
                                        tip="加载中..."
                                        indicator={<Icon className='spin-indicator-icon' type="loading" spin/>}
                                    />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default CommentList;