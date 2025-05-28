import axios from '@/plugins/axios';

/**
 * Sends a POST request to convert a JSON string to an Excel file.
 *
 * @param {string} jsonString - The JSON string to be converted to Excel.
 * @returns {Promise<Blob>} A promise that resolves to the Excel file as a Blob.
 * @throws {Error} If the request fails.
 */
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

/**
 * Sends a POST request to generate an Excel file from a Swagger JSON string.
 *
 * @param {string} jsonString - The Swagger JSON string to generate the Excel file from.
 * @returns {Promise<import('axios').AxiosResponse<Blob>>} A promise that resolves to the Axios response containing the Excel file as a Blob.
 * @throws {Error} If the request fails.
 */
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

/**
 * Sends a POST request to generate a ZIP file containing Excel files from a Swagger JSON string.
 *
 * @param {string} jsonString - The Swagger JSON string to generate the Excel ZIP file from.
 * @returns {Promise<import('axios').AxiosResponse<Blob>>} A promise that resolves to the Axios response containing the ZIP file as a Blob.
 * @throws {Error} If the request fails.
 */
export function generateExcelZipFromSwaggerJson(jsonString) {
  return axios.post('/swagger/generateExcelZipFromSwaggerJson', {
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
