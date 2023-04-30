import { createRouter, createWebHistory} from 'vue-router' 


const routes = [

    
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/login.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../components/signup.vue')
    },
    {
        path: '/update-password',
        name: 'UpdatePassword',
        component: () => import('../components/update-password.vue')
    },
    {
        path: '/delete-account',
        name: 'DeleteAccount',
        component: () => import('../components/delete-account.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
