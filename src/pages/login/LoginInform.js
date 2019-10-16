import React from 'react';
import {Carousel} from 'antd';

class LoginInform extends React.Component {

    render() {
        return (
            <Carousel
                autoplay
            >
                <div>
                    <h3>我是第一条通知</h3>
                </div>
                <div>
                    <h3>我是第二条通知</h3>
                </div>
                <div>
                    <h3>我是第三条通知</h3>
                </div>
                <div>
                    <h3>我是第四条通知</h3>
                </div>
                <div>
                    <h3>我是第五条通知</h3>
                </div>
            </Carousel>
        );
    }
}

export default LoginInform;