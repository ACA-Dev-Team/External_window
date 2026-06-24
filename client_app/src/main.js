import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/index.css";
import DataService from "./services/DataService.js";
import "./shared/GlobalFilters";

import 'intro.js/introjs.css';        // CSS الافتراضي
import '@/assets/tour-theme.css';


import Pagination from "vue-pagination-2";


import VueTour from 'vue-tour'
require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)


Vue.component("pagination", Pagination);

import Print from "vue-print-nb";
Vue.use(Print);

import DisableAutocomplete from "vue-disable-autocomplete";
Vue.use(DisableAutocomplete);

import VueHtmlToPaper from "vue-html-to-paper";
const options = {
  name: "report",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    "https://unpkg.com/tailwindcss-jit-cdn",
  ],
};
Vue.use(VueHtmlToPaper, options);


import { VueRecaptcha } from 'vue-recaptcha'; 

Vue.component('vue-recaptcha', VueRecaptcha);

import ProfessionalTour from '@/components/ProfessionalTour.vue'; // تأكد من المسار الصحيح

// تسجيل المكون عالمياً
Vue.component('ProfessionalTour', ProfessionalTour);



Vue.prototype.$http = DataService;
Vue.prototype.$authenticatedUser = {
  userId: "",
  fullName: "",
  email: "",
  role: "",
};

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
