import Third from '../views/routers/third.vue'
import Zhengcechuangzhi from '../views/routers/zhengcechuangzhi.vue'
import Xingzhengjigou from '../views/routers/xingzhengjigou.vue'
import Gangwei from '../views/routers/gangwei.vue'
import Rencaiziyuan from '../views/routers/rencaiziyuan.vue'
import Rencaipeixun from '../views/routers/rencaipeixun.vue'
import Hangyexiehui from '../views/routers/hangyexiehui.vue'
import Minbanjigou from '../views/routers/minbanjigou.vue'
import Zijintouru from '../views/routers/zijintouru.vue'
import Shehuishidian from '../views/routers/shehuishidian.vue'
import Zyfwzhengce from '../views/routers/zyfwzhengce.vue'
import Zyfwzuzhi from '../views/routers/zyfwzuzhi.vue'
import Zyzzhuce from '../views/routers/zyzzhuce.vue'
import Zyzpeixun from '../views/routers/zyzpeixun.vue'
import Jilugongzuo from '../views/routers/jilugongzuo.vue'
import Huodongkaizhan from '../views/routers/huodongkaizhan.vue'
import Jilibaozhang from '../views/routers/jilibaozhang.vue'
import Zyfwzijin from '../views/routers/zyfwzijin.vue'

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
    // {
    //   path: '/xingzhengjigou',
    //   component: Xingzhengjigou
    // },
    {
      path: '/gangwei',
      component: Gangwei
    },
    {
      path: '/rencaiziyuan',
      component: Rencaiziyuan
    },
    {
      path: '/rencaipeixun',
      component: Rencaipeixun
    },
    {
      path: '/hangyexiehui',
      component: Hangyexiehui
    },
    {
      path: '/minbanjigou',
      component: Minbanjigou
    },
    {
      path: '/zijintouru',
      component: Zijintouru
    },
    {
      path: '/shehuishidian',
      component: Shehuishidian
    },
    {
      path: '/zyfwzhengce',
      component: Zyfwzhengce
    },
    {
      path: '/zyfwzuzhi',
      component: Zyfwzuzhi
    },
    {
      path: '/zyzzhuce',
      component: Zyzzhuce
    },
    {
      path: '/zyzpeixun',
      component: Zyzpeixun
    },
    {
      path: '/jilugongzuo',
      component: Jilugongzuo
    },
    {
      path: '/huodongkaizhan',
      component: Huodongkaizhan
    },
    {
      path: '/jilibaozhang',
      component: Jilibaozhang
    },
    {
      path: '/zyfwzijin',
      component: Zyfwzijin
    },
    {
      path: '/',
      redirect: '/zhengcechuangzhi' 
    }
  ]

  export default Router;