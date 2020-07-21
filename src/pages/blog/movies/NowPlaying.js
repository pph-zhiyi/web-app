import React, {Component} from 'react';
import {Avatar, Button, List, Skeleton} from 'antd';

const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            loading: false,
            data: [],
            list: []
        };
    }

    componentDidMount() {
        this.getData(0, 10, '常德');
    }

    getData = (pageNo, pageSize, city) => {
        // doGetNotDefHost('http://api.douban.com/v2/movie/in_theaters', {
        //     'apikey': '0df993c66c0c636e29ecbb5344252a4a',
        //     'start': pageNo,
        //     'count': pageSize,
        //     'city': city
        // }).then(res => {
        //     console.log(res);
        //     this.setState({
        //         initLoading: false,
        //         data: res.results,
        //         list: res.results,
        //     });
        // }).catch(e => {
        //
        // });
    };

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({loading: true, name: {}}))),
        });
        this.getData(res => {
            const data = this.state.data.concat(res.results);
            this.setState(
                {
                    data,
                    list: data,
                    loading: false,
                },
                () => {
                    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                    // In real scene, you can using public method of react-virtualized:
                    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                    window.dispatchEvent(new Event('resize'));
                },
            );
        });
    };

    render() {
        const {initLoading, loading, list} = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>loading more</Button>
                </div>
            ) : null;

        return (
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<span key="list-loadmore-edit">edit</span>, <span key="list-loadmore-more">more</span>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                }
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div>content</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}

export default NowPlaying;