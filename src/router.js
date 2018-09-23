import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [{
        path: '/',
        name: 'main',
        component: () => import(/* webpackChunkName: "components" */ './views/Dashboard.vue')
      },
      {
        path: '/components',
        name: 'components',
        component: () => import(/* webpackChunkName: "components" */ './views/Components.vue')
      }]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
