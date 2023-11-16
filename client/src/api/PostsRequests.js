import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId})
export const reportPost=(id, userId)=>API.put(`posts/${id}/report`, {userId: userId})
export const commentPost=(id, userId,name,comment)=>API.put(`posts/${id}/comment`, {userId:userId,name:name,comment:comment})
export const badgePost=(id, userId)=>API.put(`posts/${id}/badgeComment`, {userId:userId})
export const DeletePost=(id, userId)=>API.delete(`posts/${id}`, {userId: userId})
export const getAllPost=(userId)=>API.post(`posts/getAllPost`, {userId: userId})
export const getPost=(id)=>API.get(`posts/${id}`)
export const warningPost=(id,userId)=>API.put(`posts/${id}/warning`,{userId:userId})
