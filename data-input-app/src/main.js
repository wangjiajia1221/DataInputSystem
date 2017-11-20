import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.debug = true;
const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
const Second = { template: '<div><h2>我是第 2 个子页面</h2></div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/first',
      component: First
    },
    {
      path: '/second',
      component: Second
    }
  ]
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
