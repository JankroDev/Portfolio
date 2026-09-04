import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<h1>Chris Janke</h1>' } }],
})
