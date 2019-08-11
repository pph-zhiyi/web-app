import React from 'react';

export default class CallUtils extends React.Component {

    /**
     * doGet
     *
     * @param action
     * @param val
     * @returns {Promise<any>}
     */
    static async doGet(action, val) {

    }

    /**
     * doPost
     *
     * @param action
     * @param val
     * @returns {Promise<any>}
     */
    static async doPost(action, val) {
        if (action.substring(0, 1) !== "/") {
            "/".concat(action)
        }

        const res = await fetch(
            'http://localhost:8888/' + action,
            {
                method: "POST",
                body: JSON.stringify(val),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }
        ).then(res => res.json());

        return res;
    }
}