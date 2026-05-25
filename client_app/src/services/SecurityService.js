//import api from 'api';
//import axios from 'axios';
import api from './api';
export default {
    Login(Login) {
        return api.post(`/api/external/auth/login`, Login)
      //  return api.post(`http://mail:82/api/Auth/LoginUser`, Login)
    },
    Logout() {
        return api.post('/api/Security/Logout');
     //  return api.post('http://mail:82/api/Security/Logout');
     },
    CheckLogin() {
       return api.get('/api/Security/CheckLogin');
     //   return api.get('http://mail:82/api/Security/CheckLogin');
     },


     add_ads(ad){
return api.post(`/api/Alert/Add`, ad)

     },

     get_all_ads() {

       return api.get('/api/Alert/GetAllAlert');
     },

      get_all_active_ads() {

       return api.get('/api/Alert/GetAllAlertActive');
     },



    get_by_id(id) {
                        
       return api.get(`/api/Alert/Get/${id}`);
     },

     stop_ads(AlertId){

      return api.put(`/api/Alert/Delete?AlertId=${AlertId}`)
     },

        update_ads(ad){

      return api.put(`/api/Alert/Update/`,ad)
     },

     update_pass(passnewuserpass){

         return api.put(`/api/external/messages/UpdatePass/`,passnewuserpass)
     },



     
}