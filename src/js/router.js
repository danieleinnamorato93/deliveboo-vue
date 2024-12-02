import { createWebHistory, createRouter } from "vue-router";

const routes = [
  //{ path: "/about", component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
