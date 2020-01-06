import axios from '@/utils/myaxios.js';

export const getAllArticle = (params)=>{
    return axios({
        url:'/post',
        params
    })
}