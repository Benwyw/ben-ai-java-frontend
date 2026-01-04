import axios from '@/plugins/axios'

export async function getLatestWhityWeight () {
  const response = await axios.get('/whity/getLatestWhityWeight', {
    withCredentials: true,
  })
  return response.data
}

export async function getWhityWeight (whityWeightReq) {
  const response = await axios.post('/whity/getWhityWeight', whityWeightReq, {
    withCredentials: true,
  })
  return response.data
}
