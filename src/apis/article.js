import axios from '@/utils/myaxios.js';

export const getAllArticle = (params)=>{
    return axios({
        url:'/post',
        params
    })
}
// 获取文章详情
export const getArticleById = (id)=>{
    return axios({
        url:`/post/${id}`,
    })
}
//文章id点赞
export const getLikeById = (id)=>{
    return axios({
        url:`/post_like/${id}`,
    })
}