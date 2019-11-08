import React, {Component} from 'react';
import {Tabs, Radio, Popover, Icon} from 'antd';
import {connect} from 'react-redux';
import * as userService from "../../services/userService";
import {
    USER_QUERY_LIST,
} from "../../store/actionTypes";
import Causerie from "../../pages/blog/Causerie";

const {TabPane} = Tabs;

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'top',
        };
    }

    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({mode});
    };

    render() {
        const {mode} = this.state;
        const {text} = this.props;
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
                    <Icon style={{float: "right", marginTop: 12}} type="caret-left" />
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
                        <Causerie/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (initState) => {
    let state = initState.blog;
    return {
        text: state.text
    };
};

const dispatchToProps = (dispatch) => {
    return {
        queryList(params) {
            userService.queryUserList(params).then(res => {
                if (res) {
                    let action = {
                        type: USER_QUERY_LIST,
                        obj: res.data
                    };
                    dispatch(action);
                }
            });
        }
    };
};

export default connect(mapStateToProps, dispatchToProps)(Blog);