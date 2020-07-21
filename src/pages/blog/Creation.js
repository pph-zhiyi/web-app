import React from 'react';
import Editor from "./creation/Editor";

import './style.css';

const Creation = () => {
    return (
        <>
            <div>
                <div className='creation-body'>
                    <Editor/>
                </div>
            </div>
        </>
    )
}

export default Creation;