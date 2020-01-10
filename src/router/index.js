import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Personal from '@/views/Personal.vue'
import Editpersonal from '@/views/Editpersonal.vue'
import Register from '@/views/Register.vue'
import Index from "@/views/Index.vue"
import ArticleDetail from '@/views/ArticleDetail.vue'
import Myfollows from '@/views/Myfollows.vue'
import Mystar from '@/views/Mystar.vue'
import Comments from '@/views/Comments.vue'
import Changecate from '@/views/Changecate.vue'
Vue.use(VueRouter);


let router = new VueRouter({
    routes:[
        {
            name:'Index',
            path:'/',
            component:Index
        },
        {
            name:'Mystar',
            path:'/mystar',
            component:Mystar,
        },{
            name:'Changecate',
            path:'/changecate',
            component:Changecate,
        },
        {
            name:'Comments',
            path:'/comments/:id',
            component:Comments,
        },
        {
            name:'Login',
            path:'/login',
            component:Login,
        },
        {
            name:'Myfollows',
            path:'/myfollows',
            component:Myfollows,
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