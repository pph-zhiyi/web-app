import React, {Component, Fragment} from 'react';

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <h1
                    style={{textAlign: "center", fontSize: 30}}
                >
                    敬请期待 {this.props.history.location.pathname.split('/')[3]}
                </h1>
            </Fragment>
        );
    }
}

export default Demo;