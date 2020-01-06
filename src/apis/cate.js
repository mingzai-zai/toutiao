import axios from '@/utils/myaxios.js';

export const getAllCate = ()=>{
    return axios({
        url:'/category'
    })
}