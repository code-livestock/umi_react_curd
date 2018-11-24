const serverUrl = "http://47.101.51.205:9000/users";
import request from '../../../utils/request';
import _ from 'lodash';
export function createUser(params) {
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(params)
    }
    return request(serverUrl, options).then(response => {
        return response.result;
    }).catch(error => {
        return error.response.json();
    })
}
export function get(params) {
    const options = {
        method: 'get'
    }
    let path = "?" + params
    return request(serverUrl + path, options).then(response => {
        return response;
    }).catch(error => {
        return error.response.json();
    })
}
export function update(params) {
    let user_id = params.id;
    let path = "/" + user_id;
    let updateOpt = _.omit(params, ['id']);
    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(updateOpt)
    }
    return request(serverUrl + path, options).then(response => {
        return response.result;
    }).catch(error => {
        return error.response.json();
    })
}

export function deleteUser(id) {
    let path = "/" + id;
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
    return request(serverUrl + path, options).then(response => {
        return response.result;
    }).catch(error => {
        return error.response.json();
    })
}