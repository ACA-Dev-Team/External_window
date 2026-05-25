//import axios from 'axios';
import api from './api';
export default {

    AddUser(userInfo) {
        console.log("SSSSSSSSSSSSSS")
        return api.post(`/api/Users/AddUser`, userInfo)
     //   return axios.post(`http://mail:82/api/Users/AddUser`, userInfo)
    },

    GetUsers() {
        return api.get(`/api/Users/GetUsers`)
     //   return axios.get(`http://mail:82/api/Users/GetUsers`)
    },

    GetUserForEdit(UserId) {
        return api.get(`/api/Users/GetUserForEdit?UserId=${UserId}`);
      //  return axios.get(`http://mail:82/api/Users/GetUserForEdit?UserId=${UserId}`);
     },

    DeleteUser(UserId) {
        return api.delete(`/api/Users/DeleteUser?UserId=${UserId}`);
      //  return axios.delete(`http://mail:82/api/Users/DeleteUser?UserId=${UserId}`);
    },


    EditUser(userInfo) {
        return api.put(`/api/Users/EditUser`, userInfo)
    //   return axios.put(`http://mail:82/api/Users/EditUser`, userInfo)
     },

    GetUsersByName() {
        // UserName
        console.log("ddddddddddddd")
        // return axios.get(`/api/Administrator/GetByUserName?username=${UserName}`);
    },


}