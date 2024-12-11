import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import CartPage from "../pages/CartPage.vue";
import Restaurant from "../pages/Restaurant.vue";
import Payment from "../pages/Payment.vue";

const routes = [
  //{ path: "/about", component: AboutView },
  { path: '/', component: Home },
  { path: "/carrello", component: CartPage, name: 'Carrello' },
  { path: '/restaurant/:id', component: Restaurant, name: 'singleRestaurant' },
  { path: '/pagamento', component: Payment, name:'Payment' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
