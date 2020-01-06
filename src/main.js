import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
// 引入全局样式
import '@/styles/reset.css'
import { Toast,Uploader,Dialog,Field,Picker } from 'vant'
Vue.use(Toast)
   .use(Uploader)
   .use(Dialog)
   .use(Field)
   .use(Picker)
router.beforeEach((to,from,next)=>{
  // console.log(to)
  // next();
  // console.log(from)
  if(to.path.indexOf('/personal')===0) {
    let token =localStorage.getItem('user_token')
    if(token) {
      next();
    }else {
      next({name:'Login'})
    }
  }else {
    next();
  }
 
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
