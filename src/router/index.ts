import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";
import Manage from "@/views/ManageView.vue";
import Songs from "@/views/SongView.vue";
import { useUserStore } from "@/stores/user";
/*
 * Vue Router Overview: https://vuejsdevelopers.com/2020/01/27/closer-look-at-vue-router/#the-difference-between-history-mode-and-hash-mode
 * VueJs contain both history and hash router: https://itecnote.com/tecnote/vue-js-both-history-and-hash-router/
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
    name: "manage",
    component: Manage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/song/:id",
    name: "song",
    component: Songs,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "text-yellow-500",
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

//? Global guard for every router
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  // Remove Hash from url
  if (to.fullPath.substring(0, 2) === "/#") {
    const path = to.fullPath.substring(2);
    next(path);
    return;
  }

  const store = useUserStore();
  store.userLoggedIn ? next() : next({ name: "home" });
});

export default router;
