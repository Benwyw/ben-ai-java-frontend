import axios from '@/plugins/axios';

export function generateUserId() {
    return axios.get('/ws/generateUserId', {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
}

export function getOnlineUserCount() {
    return axios.get('/ws/getOnlineUserCount', {
        withCredentials: true
    }).then(response => {
        console.log(`response: ${response.data}`)
        return response.data;
    }).catch(error => {
        throw error;
    });
}

export const webSocketUrl = (process.env.NODE_ENV === 'production') ? 'ws:bot.benwyw.com/api/websocket/' : 'ws:localhost:8080/api/websocket/'

// export function sendOneMessage(jsonString) {
//     return axios.post('/ws/sendOneMessage', {
//         // jsonString: jsonString
//     }, {
//         withCredentials: true
//     }).then(response => {
//         return response;
//     }).catch(error => {
//         throw error;
//     });
// }