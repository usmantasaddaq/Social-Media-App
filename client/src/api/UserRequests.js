import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) =>  API.put(`/user/${id}`, formData);
export const getAllUser = ()=> API.get('/user')
export const followUser = (id,data)=> API.put(`/user/${id}/follow`, data)
export const unfollowUser = (id, data)=> API.put(`/user/${id}/unfollow`, data)
export const followingUser = (id)=> API.get(`/user/${id}/following`)
export const friendsuggestion = (id)=> API.get(`/user/${id}/friendsuggestion`)
export const findAllDepartment = ()=> API.get('/user/findAll')
export const getfindAll = (data) => API.post("/user/notes", {"data":"g"});
export const create = (data) => API.post("/user/department",data)
export const deletedepartment = (id)=>API.delete(`user/department/${id}`)
export const updateRecord = (id,data) => API.put(`user/department/${id}`,data)
export const friendrequest = (requestedName,requestStatus,requestedId,senderId,senderName,senderPic) => API.post('user/friendrequest',requestedName,requestStatus,requestedId,senderId,senderName,senderPic)
export const getfriendrequest = (id,data) => API.post(`user/${id}/getfriendrequest`,{"data":"g"})
export const responsefriendrequest =(id,senderId) => API.patch(`user/${id}/responsefriendrequest`,senderId)
export const responsefriendrequests =(id,senderId) => API.patch(`user/${id}/responsefriendrequests`,senderId)