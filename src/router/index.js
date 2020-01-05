import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Personal from '@/views/Personal.vue'
import Editpersonal from '@/views/Editpersonal.vue'
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
            path:'/personal/:id',
            component:Personal,
        },
        {
            name:'Editpersonal',
            path:'/editpersonal/:id',
            component:Editpersonal
        }
    ]
})
export default router