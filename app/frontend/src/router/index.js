import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/ProductList.vue'),
  },
  {
    path: '/checkout',
    name: 'CheckoutPage',
    component: () => import('../pages/CheckoutPage.vue'),
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import('../pages/PaymentSummary.vue'),
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../pages/TransactionResult.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;