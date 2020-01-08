import axios from "@/utils/myaxios.js";
export const login = data => {
  return axios({
    method: "post",
    url: "/login",
    data
  });
};
export const getUserId = id => {
  return axios({
    url: `/user/${id}`,
    headers: { Authorization: localStorage.getItem("user_token") }
  });
};

export const updataUserByID = (id, data) => {
  return axios({
    url: `/user_update/${id}`,
    method: "post",
    data
  });
};

export const registerUser = data => {
  return axios({
    method: "post",
    url: "/register",
    data
  });
};
//关注
export const follow = (id) => {
  return axios({
    url: `/user_follows/${id}`
  });
};
//取消关注
export const unfollow = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  });
};