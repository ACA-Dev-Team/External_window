//import api from 'api';
import api from './api';

export default {

    GetSectors(type) {
        return api.get(`/api/WeatherForecast/GetSectors/${type}`)
       // return api.get(`http://mail:82/api/WeatherForecast/GetSectors/${type}`)
    },

    GetSides(id) {
        return api.get(`/api/WeatherForecast/GetSides/${id}`)
      //  return api.get(`http://mail:82/api/WeatherForecast/GetSides/${id}`)
     },


     add_sector(sector) {
        return api.post(`/api/ExtrmalSection/Add`,sector)
       
    },

    edit_sector(sector) {
        return api.put(`/api/ExtrmalSection/Update`,sector)
       
    },

    stop_sector(id) {
        return api.put(`/api/ExtrmalSection/Delete?id=${id}`)
       
    },

    GetSide(id) {
        return api.get(`/api/ExtrmalSection/GetSide?id=${id}`)
      
     },

    

}