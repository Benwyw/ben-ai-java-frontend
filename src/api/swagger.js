import axios from '@/plugins/axios';

export function jsonStringToExcel(jsonString) {
  return axios.post('/swagger/jsonStringToExcel', {
    jsonString: jsonString
  }, {
    withCredentials: true,
    responseType: 'blob'
  }).then(response => {
    return response.data;
  }).catch(error => {
    throw error;
  });
}

export function generateExcelFromSwaggerJson(jsonString) {
  return axios.post('/swagger/generateExcelFromSwaggerJson', {
    jsonString: jsonString
  }, {
    withCredentials: true,
    responseType: 'blob'
  }).then(response => {
    return response;
  }).catch(error => {
    throw error;
  });
}
