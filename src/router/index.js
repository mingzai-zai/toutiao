import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Personal from '@/views/Personal.vue'
import Editpersonal from '@/views/Editpersonal.vue'
import Register from '@/views/Register.vue'
import Index from "@/views/Index.vue"
import ArticleDetail from '@/views/ArticleDetail.vue'
Vue.use(VueRouter);


let router = new VueRouter({
    routes:[
        {
            name:'Index',
            path:'/',
            component:Index
        },
        {
            name:'Login',
            path:'/login',
            component:Login,
        },
        {
            name:'Register',
            path:'/register',
            component:Register,
        },
        {
            name:'Personal',
            path:'/personal/:id',
            component:Personal,
        },
        {
            name:'Editpersonal',
            path:'/editpersonal/:id',
            component:Editpersonal
        },
        {
            name:'ArticleDetail',
            path:'/articleDetail/:id',
            component:ArticleDetail,
        }
    ]
})
export default router