import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  //{ path: "/about", component: AboutView },
  { path: '/', component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
