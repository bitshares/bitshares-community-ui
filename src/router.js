import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import store from '@/store'

Vue.use(Router)

const router = new Router({
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
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "auth" */ './views/Login/Login.vue'),
      meta: {
        noAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "auth" */ './views/Signup/Signup.vue'),
      meta: {
        noAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.noAuth) {
    const isLoggedIn = store.getters['acc/isLoggedIn']
    if (!isLoggedIn) next({ name: 'login' })
  }

  next()
})

export default router
