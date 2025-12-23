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
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const webSocketUrl = (process.env.NODE_ENV === 'production') ? 'wss:www.benwyw.com/api/websocket/' : 'ws:localhost:8080/api/websocket/'

function computeWebSocketBase () {
  let raw = webSocketUrl || ''
  if (!raw || raw.trim() === '') {
    const loc = window.location
    const proto = loc.protocol === 'https:' ? 'wss://' : 'ws://'
    raw = proto + loc.hostname + (loc.port ? ':' + loc.port : '') + '/websocket'
  }
  if (!/^wss?:\/\//.test(raw)) {
    raw = raw.replace(/^ws:/, 'ws://').replace(/^wss:/, 'wss://')
    if (!/^wss?:\/\//.test(raw)) {
      raw = 'ws://' + raw.replace(/^\/*/, '')
    }
  }
  raw = raw.replace(/^(wss?:)\/+(?=\/)/, '$1//')
  return raw.replace(/\/$/, '')
}

export const webSocketBase = computeWebSocketBase()

export function buildUserWebSocketUrl (userId) {
  const token = localStorage.getItem('token')
  const qp = token ? `?token=${encodeURIComponent(token)}` : ''
  return `${webSocketBase}/${encodeURIComponent(userId)}${qp}`
}


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
