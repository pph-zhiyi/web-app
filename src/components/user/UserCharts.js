import React, {Component, Fragment} from 'react';
import {DatePicker, LocaleProvider, message} from 'antd';
import G2 from '@antv/g2';
import {queryUserLoginCount, queryUsers} from '../../services/userService';
import moment from "moment";
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import 'moment/locale/zh-cn';

const {RangePicker} = DatePicker;
let chart;

class UserCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoginCountList: [],
            users: []
        };
    }

    componentDidMount() {
        chart = new G2.Chart({
            container: 'c1',
            forceFit: true,
            height: 500,
            padding: [60, 20, 40, 60]
        });
        let startTime = new Date(moment().startOf('day')).getTime();
        let endTime = new Date(moment().endOf('day')).getTime();
        this.getDataList({startTime, endTime});
        queryUsers().then(res => {
            if (res.success) {
                this.setState({
                    users: res.data
                });
            } else {
                message.error(res.message);
            }
        }).catch((e) => {
            message.error("请求结果异常");
        });
    }

    getDataList = (params) => {
        queryUserLoginCount(params).then(res => {
            if (res.success) {
                this.setState({
                    userLoginCountList: res.data
                });
                this.userLogin();
            } else {
                message.error(res.message);
            }
        }).catch((e) => {
            message.error("请求结果异常");
        });
    };

    userLogin = () => {
        // const imgs = [
        //     'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
        //     'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
        //     'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
        //     'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png'
        // ];

        let imageMap = {
            'pph': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
            'haha': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
            'hehe': 'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png',
            'zeze': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
            'xixi': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
            'kaka': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
            'yaya': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
            'aha': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
            'lala': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
            'bubu': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
            'enen': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
            'ok': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
            'ahh': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
            'hehehe': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
        };

        chart.destroy();

        chart = new G2.Chart({
            container: 'c1',
            forceFit: true,
            height: 500,
            padding: [60, 20, 40, 60]
        });

        chart.source(this.state.userLoginCountList, {
            vote: {
                min: 0
            }
        });

        chart.legend(false);

        chart.axis('vote', {
            labels: null,
            title: null,
            line: null,
            tickLine: null
        });

        chart.interval().position('user*loginCount').color('user', ['#7f8da9', '#fec514', '#db4c3c', '#daf0fd']);

        chart.point().position('user*loginCount').size(60).shape('user', function (name) {
            return ['image', imageMap[name]];
        });

        chart.render();
    };

    onChange = (value, dateString) => {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
    };

    onOk = (value) => {
        let startTime = new Date(value[0]).getTime();
        let endTime = new Date(value[1]).getTime();

        this.getDataList({startTime, endTime});
    };

    render() {
        return (
            <Fragment>
                <h3 style={{marginLeft: 20, fontSize: 20}}> 用户登录次数统计 </h3>
                <LocaleProvider locale={zh_CN}>
                    <RangePicker
                        style={{width: 380}}
                        ranges={{
                            '今天': [moment().startOf('day'), moment().endOf('day')],
                            '本周': [moment().startOf('week'), moment().endOf('week')],
                            '本月': [moment().startOf('month'), moment().endOf('month')],
                            '本年': [moment().startOf('year'), moment().endOf('year')],
                        }}
                        showTime={{format: 'HH:mm:ss'}}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={this.onChange}
                        onOk={this.onOk}
                        defaultValue={[moment().startOf('day'), moment().endOf('day')]}
                    />
                </LocaleProvider>
                <div id="c1"/>
            </Fragment>
        );
    }
}

export default UserCharts;
