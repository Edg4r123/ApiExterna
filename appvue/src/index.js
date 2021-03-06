window.axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8888/api/';
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";
import es from "vee-validate/dist/locale/es.json";
import * as rules from "vee-validate/dist/rules";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
localize("es", es);
import Users from './components/Users.vue'
import User from './components/User.vue'
import UserPost from './components/UserPost.vue'
import UserPhoto from './components/UserPhoto.vue'
export const router = new VueRouter({
    routes: [
        { path: '/', component: Users },
        { path: '/usuarios', component: Users },
        { 
            path: '/usuarios/:id', 
            component: User,
            children: [
                {
                    path: 'publicaciones',
                    component: UserPost
                },
                {
                    path: 'fotos',
                    component: UserPhoto
                }
            ] 
        },
    ]
})


const app = new Vue({
    el: '#app',
    router
})