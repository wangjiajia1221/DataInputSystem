import Third from '../views/routers/third.vue'
import Zhengcechuangzhi from '../views/routers/zhengcechuangzhi.vue'
import Xingzhengjigou from '../views/routers/xingzhengjigou.vue'
import Hangyexiehui from '../views/routers/hangyexiehui.vue'
import Gangwei from '../views/routers/gangwei.vue'
import Fuwuzhandian from '../views/routers/fuwuzhandian.vue'

const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
const Second = { template: '<div><h2>我是第 2 个子页面</h2></div>' }

const Router = [
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
    },
    {
      path: '/zhengcechuangzhi',
      component: Zhengcechuangzhi
    },
    {
      path: '/xingzhengjigou',
      component: Xingzhengjigou
    },
    {
      path: '/hangyexiehui',
      component: Hangyexiehui
    },
    {
      path: '/gangwei',
      component: Gangwei
    },
    {
      path: '/fuwuzhandian',
      component: Fuwuzhandian
    },
    {
      path: '/',
      redirect: '/zhengcechuangzhi' 
    }
  ]

  export default Router;