import axios from '@/plugins/axios';

export function getTitle() {
    return axios.get('/misc/title', {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
}

export function getUserBase() {
    return axios.get('/misc/userBase', {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
}