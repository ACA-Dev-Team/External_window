import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Auth/Login.vue";


import incoming_report from "../views/reports/incoming_report.vue";
import Statistical_report from "../views/reports/Statistical_report.vue";

import Sent_report from "../views/reports/Sent_report.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/ex",
    name: "ex",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/external_sides/add_mail.vue"
      ),
  },

    {
    path: "/",
    name: "login_sides",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/external_sides/login_sides"
      ),
  },

     {
    path: "/my_mail",
    name: "my_mail",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/external_sides/my_mail"
      ),
  },

       {
    path: "/add_mail",
    name: "add_mail",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/external_sides/add_mail"
      ),
  },

  




  {
    path: "/resend_reply",
    name: "resend_reply",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/mail/inbox/resend_reply.vue"
      ),
  },

  {
    path: "/mail_report_sent",
    name: "mail_report_sent",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/reports/mail_report_sent.vue"
      ),
  },

  {
    path: "/mail_report",
    name: "mail_report",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/reports/mail_report.vue"
      ),
  },

  {
    path: "/guide/color",
    name: "guidecolor",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/guide/color.vue"
      ),
  },

  {
    path: "/guide/ads",
    name: "ads",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/guide/ads.vue"
      ),
  },


  // dashboard
  {
    path: "/dashboard",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/Dashboard/Dashboard.vue"
      ),
  },

  {
    path: "/change_pass",
    name: "change_pass",
    // route level code-splitting
    // this generates a separate chunk (change_pass.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "change_pass" */
        "../views/guide/change_pass.vue"
      ),
  },

  // inbox
  {
    path: "/inbox",
    name: "inbox",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/mail/inbox/inbox.vue"
      ),
  },




  {
    path: "/print_clipboard",
    name: "print_clipboard",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/reports/print_clipboard.vue"
      ),
  },

  {
    path: "/inbox/:mail/:department/:type/:sends_id",
    name: "inbox-show",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/mail/inbox/inbox_form.vue"
      ),
  },

  // sent
  {
    path: "/sent",
    name: "sent",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        "../views/mail/sent/sent.vue"
      ),
  },

  {
    path: "/sent-form",
    name: "sent-add",
    // route level code-splitting
    // this generates a separate chunk (mail.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mail" */ "../views/mail/sent/sent_form.vue"),
  },

  {
    path: "/sent-form/:mail/:type/:sends_id",
    name: "sent-show",
    // route level code-splitting
    // this generates a separate chunk (mail.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mail" */ "../views/mail/sent/sent_form.vue"),
  },














  {
    path: "/incoming_report",
    name: "incoming_report",
    component: incoming_report,
  },

  {
    path: "/Statistical_report",
    name: "Statistical_report",
    component: Statistical_report,
  },

  {
    path: "/Sent_report",
    name: "Sent_report",
    component: Sent_report,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
