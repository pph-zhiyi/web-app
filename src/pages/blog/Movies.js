import React, {Component} from 'react';
import {Col, Empty, Row} from 'antd';
import {withRouter} from 'react-router-dom'

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={15} offset={4}>
                        <Empty/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Movies);