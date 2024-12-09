import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Checkout from "../pages/Checkout.vue";
import TypesList from "../components/TypesList.vue";

const routes = [
  //{ path: "/about", component: AboutView },
  { path: '/', component: Home },
  { path: '/checkout', component: Checkout },
  { path: '/types/:id', component: TypesList, name:'types.show' },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
