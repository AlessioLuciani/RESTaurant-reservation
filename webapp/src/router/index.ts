import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // Lazy loading for this route
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // Lazy loading for this route
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    // Lazy loading for this route
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/explore',
    name: 'Explore',
    // Lazy loading for this route
    component: () => import('../views/Explore.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
