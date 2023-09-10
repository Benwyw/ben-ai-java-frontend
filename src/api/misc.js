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

export function getFeatures(pageNumber, limit) {
    return axios.get("/misc/getFeatures", {
        params: {
            pageNumber: pageNumber,
            limit: limit
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
}