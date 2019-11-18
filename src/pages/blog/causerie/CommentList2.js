import React, {Component} from 'react';
import {Spin, List, Comment, Icon, Popconfirm, Tooltip, message as Message, Divider} from 'antd';
import moment from 'moment';
import {userLike, queryCauserieList} from '../../../services/causerieService';
import InfiniteScroll from 'react-infinite-scroller';
import './style.css'

class CommentList2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hasMore: true,
            data: [],
            total: 0,
            pageNo: 1,
            pageSize: 5
        };
    }

    componentDidMount() {
        const {pageNo, pageSize} = this.state;
        queryCauserieList({pageNo, pageSize})
            .then((res) => {
                const {data} = res;
                this.setState({
                    data: data.data,
                    total: data.total
                })
            }).catch((e) => {
            Message.error("请求结果异常");
        });
    }

    getCauserieList = (data) => {
        // console.log(data)
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
                content: <i><b>{item['content']}</b></i>,
                datetime: moment(moment(item['commitTime']).format('YYYY-MM-DD')).fromNow()
            });
            return item;
        });
        return con;
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
                <Tooltip title="赞">
                    <Icon
                        type="like"
                        theme={theme === 1 ? "filled" : "outlined"}
                        onClick={() => this.userLike(contentId, theme === 1 ? null : 1)}
                    />
                </Tooltip>
                <Tooltip title={linkName === '暂无' ? linkName : linkName.substring(1)}>
                    <span style={{paddingLeft: 8, cursor: 'auto'}}>{link}</span>
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
                    <span style={{paddingLeft: 8, cursor: 'auto'}}>{dislike}</span>
                </Tooltip>
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
                onConfirm={() => this.delCommon(contentId, authorUser, authorName, jti)}
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

    openUser = (user) => {
        // this.props.history.push(`/app/user/list?user=${user}`)
        window.open(`/app/user/list?user=${user}`, '_blank')
    };

    userLike = (contentId, theme) => {
        userLike({contentId: contentId, user: this.props.jti, like: theme})
            .then(res => {
                const {success, message} = res;
                if (success) {
                    const {pageSize} = this.state;
                    queryCauserieList({pageNo: 1, pageSize, id: contentId})
                        .then((res) => {
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

    userComment = () => {
        Message.warning("评论个锤子，赶紧点赞去!")
    };

    userStar = () => {
        Message.warning("收藏个锤子，赶紧点赞去!")
    };

    userShareAlt = () => {
        Message.warning("分享个锤子，赶紧点赞去!")
    };

    delCommon = (id, user, name, jti) => {
        if (user === jti) {
            Message.warning("敬请期待")
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
            Message.warning('我是有底线的.....');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }

        queryCauserieList({pageNo: pn, pageSize})
            .then((res) => {
                this.setState({
                    data: data.concat(res.data.data),
                    pageNo: pn,
                    hasMore: true,
                    loading: false,
                })
            });
    };

    listHeader = () => {
        const {total} = this.state;
        return (
            <div>
                <span>共 {total} 项</span>
                <Icon style={{float: "right", marginTop: 5}} type="menu"/>
            </div>
        );
    };

    render() {
        const {loading, hasMore, data} = this.state;
        let commons = this.getCauserieList(data);

        return (
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
                        // header={`共 ${comments.length} ${comments.length > 1 ? '条' : '条'}`}
                        header={this.listHeader()}
                        itemLayout="horizontal"
                        renderItem={
                            props => <Comment {...props} />
                        }
                    >
                        {loading && hasMore && (
                            <div className="demo-loading-container">
                                <Spin tip="加载中..."
                                      indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}
                                />
                            </div>
                        )}
                        <Divider dashed> 我是有底线的 </Divider>
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}

export default CommentList2;