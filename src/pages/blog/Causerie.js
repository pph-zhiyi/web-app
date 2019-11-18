import React, {Component} from 'react';
import {Col, Row} from 'antd';
import {withRouter} from 'react-router-dom'
import CommentList from "./causerie/CommentList";

class Causerie extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {causerieObj, jti, queryCauserieList} = this.props;

        return (
            <div>
                <Row>
                    <Col span={15} offset={4}>
                        <CommentList
                            causerieObj={causerieObj}
                            loading={this.state.loading}
                            queryCauserieList={queryCauserieList}
                            jti={jti}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Causerie);