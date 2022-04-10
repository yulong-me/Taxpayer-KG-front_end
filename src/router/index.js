import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: resolve => require(['../views/navgt'], resolve), // 父路由的公共部分
        children: [
            {
                path: 'forest_all_query',
                name: 'forest_all_query',
                component: resolve => require(['../views/forest_all_query'], resolve)
            },
            {
                path: 'total_data',
                name: 'total_data',
                component: resolve => require(['../views/total_data'], resolve)
            },

            {
                path: 'extra',
                name: 'extra',
                component: resolve => require(['../views/extra'], resolve)
            }
        ]
    },
]

const router = new VueRouter({
  routes
})

export default router
