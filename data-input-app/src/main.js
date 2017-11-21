import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Third from './views/routers/third.vue'

Vue.use(VueRouter);
Vue.use(Element);

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
    },
    {
      path: '/third',
      component: Third
    }
  ]
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
