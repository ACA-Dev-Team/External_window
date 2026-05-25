//import axios from 'axios';
import api from './api';
export default {


    GetDocmentsDetails(mailId) {
        return api.get(`/api/Documents/GetDocmentsDetails`, {
        //    return axios.get(`http://mail:82/api/Documents/GetDocmentsDetails`, {
            params: {
                mailId: mailId
            }
        });
    },


    test() {
        return api.get('/api/WeatherForecast/test');
     //  return axios.get('http://mail:82/api/WeatherForecast/test');
    },



}