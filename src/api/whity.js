import axios from '@/plugins/axios'

export async function getLatestWhityWeight () {
  try {
    const response = await axios.get('/whity/getLatestWhityWeight', {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getWhityWeight (whityWeightReq) {
  try {
    const response = await axios.post('/whity/getWhityWeight', whityWeightReq, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
