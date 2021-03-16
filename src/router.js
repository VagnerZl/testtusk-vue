import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import ContactInfo from '@/views/ContactInfo.vue'

Vue.use(Router)
export default new Router({
    mode: "history",
    routes:[
        {
            path:"/",
            component: Home,
            name: "home",
            props: true
        },
        {
            path:"/contactinfo/:id",
            component: ContactInfo,
            name: "contactinfo",
            props: true
        }
    ]
})