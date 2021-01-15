import { axios } from '@/utils/request'

const api = {
    indexData: '/index/indexData'
}

export function indexData (parameter) {
    return axios({
        url: api.indexData,
        method: 'post',
        data: parameter
    })
}
