import axios from '@/utils/myaxios.js';

export const fileload =(data)=>{
    return axios({
        method:'post',
        url:'/upload',
        data,
    })
}

