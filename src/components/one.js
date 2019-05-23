import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class One extends Component {
    render() {
        return (
            <div className="App">
                <Link to="/two/">oneoneoneone</Link>
            </div>
        );
    }
}

export default One;