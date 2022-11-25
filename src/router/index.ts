import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";
import Manage from "@/views/ManageView.vue";
import useUserStore from "@/stores/user";
/*
 * Resource: https://router.vuejs.org/
 * Api Reference: https://router.vuejs.org/api/#interfaces
 * Protected Route: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 * Route Meta Field: https://router.vuejs.org/guide/advanced/meta.html
 */

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/manage",
    component: Manage,
    name: "manage",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "text-yellow-500",
  routes,
});

//? Global guard for every router
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();
  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
