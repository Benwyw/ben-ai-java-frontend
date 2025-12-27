import axios from '@/plugins/axios'

export async function getTitle () {
  try {
    const response = await axios.get('/misc/title', {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getUserBase () {
  try {
    const response = await axios.get('/misc/userBase', {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getFeatures (pageNumber, limit) {
  try {
    const response = await axios.get('/misc/getFeatures', {
      params: {
        pageNumber,
        limit,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
