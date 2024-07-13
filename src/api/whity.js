import axios from '@/plugins/axios';

export function getLatestWhityWeight() {
    return axios.get('/whity/getLatestWhityWeight', {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
}

export function getWhityWeight(pageNumber, limit) {
    return axios.get("/whity/getWhityWeight", {
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