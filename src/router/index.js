import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Posts from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    // children: [
    //   // {
    //   //   path: '',
    //   //   name: 'posts',
    //   //   component: Posts,
    //   // },
    //   {
    //     path: 'newpost',
    //     name: 'newpost',
    //     component: () => import(/* webpackChunkName: "newpost" */ '../views/NewRecipe.vue')
    //   },
    //   {
    //     path: 'post/:id',
    //     props: true,
    //     name: 'post-detail',
    //     component: () => import(/* webpackChunkName: "post-detail" */ '../views/SelectedRecipe.vue')
    //   }
    // ]

  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "login" */ '../views/Signup.vue')
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import(/* webpackChunkName: "login" */ '../views/Recipes.vue')
  },
  {
    path: '/selectedrecipe/:id',
    name: 'selectedrecipe',
    component: () => import(/* webpackChunkName: "login" */ '../views/SelectedRecipe.vue')
  },
  {
    path: '/newrecipe',
    name: 'newrecipe',
    component: () => import(/* webpackChunkName: "login" */ '../views/NewRecipe.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
