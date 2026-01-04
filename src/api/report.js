import axios from '@/plugins/axios'

export async function generateTestReport1 (dueDays, rmName, customerNum, sccStatus, groupNum, customerName) {
  const response = await axios.get('/report/generate-test-report-1', {
    params: {
      dueDays,
      rmName,
      customerNum,
      sccStatus,
      groupNum,
      customerName,
    },
    withCredentials: true,
    responseType: 'blob',
  })
  return response
}

export async function generateTestReport2 (userName) {
  const response = await axios.get('/report/generate-test-report-2', {
    params: {
      userName,
    },
    withCredentials: true,
    responseType: 'blob',
  })
  return response
}
