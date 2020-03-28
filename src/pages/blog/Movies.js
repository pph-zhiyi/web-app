import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import NowPlaying from './movies/NowPlaying'

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <NowPlaying/>
            </div>
        );
    }
}

export default withRouter(Movies);