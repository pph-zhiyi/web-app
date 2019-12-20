import {doGet} from '../utils/api';

export function get() {
    return doGet("/stack/get");
}