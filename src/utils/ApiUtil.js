import axios from 'axios';

let ApiUtil = axios.create({
    timeout: 1000 * 60,
    transformRequest: [(data) => JSON.stringify(data)]
});

export default ApiUtil;