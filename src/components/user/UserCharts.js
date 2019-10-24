import React, {Component, Fragment} from 'react';
import {message} from 'antd';
import G2 from '@antv/g2';
import {queryUserLoginCount} from '../../services/userService';

class UserCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoginCountList: []
        };
    }

    componentDidMount() {
        queryUserLoginCount({startTime: 1546272000000, endTime: 1572537600000})
            .then(res => {
                if (res.success) {
                    this.setState({
                        userLoginCountList: res.data
                    });
                    this.userLogin();
                } else {
                    message.error(res.message);
                }
            });
    }

    userLogin = () => {
        // const imgs = [
        //     'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
        //     'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
        //     'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
        //     'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png'
        // ];

        var imageMap = {
            'enen': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
            'pph': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
            'haha': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
            'hehe': 'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png',
            'zeze': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png'
        };
        var chart = new G2.Chart({
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
        chart.interval().position('user*loginCount')
            .color('user', ['#7f8da9', '#fec514', '#db4c3c', '#daf0fd']);
        chart.point().position('user*loginCount').size(60)
            .shape('user', function (name) {
                return ['image', imageMap[name]];
            });
        chart.render();
    };

    render() {

        return (
            <Fragment>
                <h3 style={{marginLeft: 20, fontSize: 20}}> 用户登录次数统计 </h3>
                <div id="c1"/>
            </Fragment>
        );
    }
}

export default UserCharts;
