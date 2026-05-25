
import api from './api';

export default {

    

    GetUsersByName(UserName) {
        return api.get(`/api/Administrator/GetByUserName?username=${UserName}`);
      //  return api.get(`http://mail:82/api/Administrator/GetByUserName?username=${UserName}`);
    },

    StopUser(StopActive) {
        return api.put(`/api/Administrator/Delete/`,StopActive)
      //  return api.put(`http://mail:82/api/Administrator/Delete/`, StopActive)
     },

    GetAllRoles1() {

    
        return api.get(`/api/Role/GetAll`);
      //  return api.get(`http://mail:82/api/Role/GetAll`);
     },

    GetAllRoles() {

        
        return api.get(`/api/Role/GetAll`);
     //  return api.get(`http://mail:82/api/Role/GetAll`);
   },
    
    Add_user(user){
                            
        return api.post(`/api/Administrator/Add`,user);
     //   return api.post(`http://mail:82/api/Administrator/Add`, user);

    },

    Edite_user(user){
                            
        return api.put(`/api/Administrator/Update`,user
          
        //   { headers : {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
        // }}
      
      );
     //   return api.put(`http://mail:82/api/Administrator/Update`, user);


    


    },

    GetUserById(id){

        return api.get(`/api/Administrator/Get/${id}`);
      //  return api.get(`http://mail:82/api/Administrator/Get/${id}`);

    },

    
}