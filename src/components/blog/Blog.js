import React, {Component} from 'react';
import {Icon, Popover, Radio, Tabs} from 'antd';
import {connect} from 'react-redux';
import * as causerieService from "../../services/causerieService";
import {CAUSERIE_QUERY_LIST,} from "../../store/actionTypes";
import Causerie from "../../pages/blog/Causerie";
import Movies from "../../pages/blog/Movies";
import jwt_decode from 'jwt-decode'

const {TabPane} = Tabs;

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'top',
            jti: ''
        };
    }

    componentDidMount() {
        if (localStorage.token) {
            this.setState({
                jti: jwt_decode(localStorage.token)['jti']
            })
        }
    }

    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({mode});
    };

    render() {
        const {mode} = this.state;
        const {text, causerieObj} = this.props;
        const {queryCauserieList} = this.props;
        const popContent = (
            <Radio.Group
                onChange={this.handleModeChange}
                value={mode}
                style={{marginBottom: 8}}
            >
                <Radio.Button value="top"> 居上 </Radio.Button>
                <Radio.Button value="left"> 居左 </Radio.Button>
                <Radio.Button value="bottom"> 居下 </Radio.Button>
                <Radio.Button value="right"> 居右 </Radio.Button>
            </Radio.Group>
        );
        return (
            <div>
                <Popover
                    title="标题栏风格"
                    content={popContent}
                    placement="left"
                >
                    <Icon style={{float: "right", marginTop: 12, marginRight: 25}} type="setting"/>
                </Popover>
                <Tabs
                    defaultActiveKey="causerie"
                    tabPosition={mode}
                >
                    <TabPane tab="首页" key="index">
                        <h3 style={{textAlign: "center"}}> {text} </h3>
                    </TabPane>
                    <TabPane tab="我的文章" key="2">
                        <h3 style={{textAlign: "center"}}> {text} </h3>
                    </TabPane>
                    <TabPane tab="开始创作" key="3">
                        <h3 style={{textAlign: "center"}}> {text} </h3>
                    </TabPane>
                    <TabPane tab="随心一笔" key="causerie">
                        <Causerie
                            jti={this.state.jti}
                            causerieObj={causerieObj}
                            queryCauserieList={queryCauserieList}
                        />
                    </TabPane>
                    <TabPane tab="影片推荐" key="4">
                        <Movies />
                    </TabPane>
                    <TabPane tab="心栖书屋" key="5">
                        <h3 style={{textAlign: "center"}}> {text} </h3>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (initState) => {
    let state = initState.blog;
    return {
        text: state.text,
        causerieObj: state.causerieObj
    };
};

const dispatchToProps = (dispatch) => {
    return {
        queryCauserieList(params) {
            causerieService.queryCauserieList(params).then(res => {
                if (res) {
                    let action = {
                        type: CAUSERIE_QUERY_LIST,
                        obj: res.data
                    };
                    dispatch(action);
                }
            });
        }
    };
};

export default connect(mapStateToProps, dispatchToProps)(Blog);