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
//收藏
export const shoucang = (id) => {
    return axios({
      url: `/post_star/${id}`
    });
  };

  //文章评论列表
export const commentlist = (id,params) => {
    return axios({
      url: `/post_comment/${id}`,
      params,
    });
  };

    //发布评论
export const sendcomment = (id,data) => {
  return axios({
    url: `/post_comment/${id}`,
    data,
    method:'post'
  });
};