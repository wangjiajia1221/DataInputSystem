import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routerConf from './config/routerConf'
require('../test');

Vue.use(VueRouter);
Vue.use(Element);

Vue.config.debug = true;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routerConf
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
