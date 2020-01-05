import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Personal from '@/views/Personal.vue'
Vue.use(VueRouter);


let router = new VueRouter({
    routes:[
        {
            name:'Login',
            path:'/login',
            component:Login,
        },
        {
            name:'Personal',
            path:'/personal',
            component:Personal,
        }
    ]
})
export default router