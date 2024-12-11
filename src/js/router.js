import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import CartPage from "../pages/CartPage.vue";
import Restaurant from "../pages/Restaurant.vue";
import PaymentPage from "../pages/PaymentPage.vue";

const routes = [
  //{ path: "/about", component: AboutView },
  { path: '/', component: Home },
  { path: "/carrello", component: CartPage, name: 'Carrello' },
  { path: '/restaurant/:id', component: Restaurant, name: 'singleRestaurant' },
  { path: '/payment/:orderId', component: PaymentPage, name: 'payment' },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
