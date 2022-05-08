import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import logger from "@/log/baselog";
import {getStore} from "@/store";

const store = getStore();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/AuthView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to,from) => {
  logger.info("目的地址："+to.path);
  // const store = useStore();
  if (!store.getters.isLogin) {
    if (to.path === "/auth") {
      return true;
    } else {
      logger.info("用户未登录, 即将跳转登录页面");
      router.push({path:"auth"});
      return false;
    }
  } else {
    if (to.path === "/auth") {
      logger.info("用户已登录，回到上一页面");
      router.back();
      return false;
    }
    return true;
  }
});

export default router
