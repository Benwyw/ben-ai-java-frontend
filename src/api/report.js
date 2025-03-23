import axios from '@/plugins/axios';

export function generateTestReport1(dueDays, rmName, customerNum, sccStatus, groupNum, customerName) {
    return axios.get('/report/generate-test-report-1', {
        params: {
            dueDays: dueDays,
            rmName: rmName,
            customerNum: customerNum,
            sccStatus: sccStatus,
            groupNum: groupNum,
            customerName: customerName
        },
        withCredentials: true,
        responseType: 'blob'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    });
}

export function generateTestReport2(userName) {
    return axios.get('/report/generate-test-report-2', {
        params: {
            userName: userName
        },
        withCredentials: true,
        responseType: 'blob'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    });
}
