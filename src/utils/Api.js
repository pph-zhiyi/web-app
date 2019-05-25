import axios from 'axios';

let api = axios.create({
    timeout: 1000 * 60,
    transformRequest: [(data) => JSON.stringify(data)]
});

export default Api;