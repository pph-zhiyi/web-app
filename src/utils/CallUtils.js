import React from 'react';

export default class CallUtils extends React.Component {

    /**
     * doGet
     *
     * @param action
     * @param obj
     * @returns {Promise<any>}
     */
    static async doGet(action, obj) {

    }

    /**
     * doPost
     *
     * @param action
     * @param obj
     * @returns {Promise<any>}
     */
    static async doPost(action, obj) {
        if (action.substring(0, 1) !== "/") {
            "/".concat(action)
        }

        const res = await fetch(
            'http://localhost:8888/' + action,
            {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }
        ).then(res => res.json());

        return res;
    }
}