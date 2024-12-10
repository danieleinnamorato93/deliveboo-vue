import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Checkout from "../pages/Checkout.vue";
import Restaurant from "../pages/Restaurant.vue";
import ErrorPage from "../pages/ErrorPage.vue";

const routes = [
  //{ path: "/about", component: AboutView },
  { path: '/', component: Home },
  { path: '/checkout', component: Checkout },
  { path: '/restaurant/:id', component: Restaurant, name: 'singleRestaurant' },
  { path: '/errore', component: ErrorPage, name:'ErrorPage' },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
