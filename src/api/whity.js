import axios from '@/plugins/axios';
import whityWeight from "@/components/WhityWeight.vue";

export function getLatestWhityWeight() {
    return axios.get('/whity/getLatestWhityWeight', {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
}

export function getWhityWeight(whityWeightReq) {
    return axios.post("/whity/getWhityWeight", whityWeightReq, {
      withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
}
