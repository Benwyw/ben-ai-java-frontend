import axios from '@/plugins/axios'

export async function getTitle () {
  const response = await axios.get('/misc/title', {
    withCredentials: true,
  })
  return response.data
}

export async function getUserBase () {
  const response = await axios.get('/misc/userBase', {
    withCredentials: true,
  })
  return response.data
}

export async function getFeatures (pageNumber, limit) {
  const response = await axios.get('/misc/getFeatures', {
    params: {
      pageNumber,
      limit,
    },
  })
  return response.data
}
