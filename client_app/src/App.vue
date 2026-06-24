<template>
  <div @contextmenu.prevent dir="rtl" id="app">
    <router-view />


  </div>
</template>

<script>

import 'intro.js/introjs.css';
import '@/assets/tour-theme.css';
export default {

  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,

      date_from: 0,
    };
  },
  methods: {


  },
  mounted() {
 
  },
};
</script>

<style>

</style>
