import axios from '@/plugins/axios';

export async function generateUserId() {
    try {
        const response = await axios.get('/ws/generateUserId', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getOnlineUserCount() {
    try {
        const response = await axios.get('/ws/getOnlineUserCount', {
            withCredentials: true
        });
        console.log(`response: ${response.data}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const webSocketUrl = (process.env.NODE_ENV === 'production') ? 'wss:bot.benwyw.com/api/websocket/' : 'ws:localhost:8080/api/websocket/'

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
