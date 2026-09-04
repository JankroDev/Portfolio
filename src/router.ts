import { createRouter, createWebHistory, type RouterHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import CaseStudyPage from './pages/CaseStudyPage.vue'

export function createAppRouter(history: RouterHistory) {
  return createRouter({
    history,
    routes: [
      { path: '/', name: 'home', component: HomePage },
      { path: '/work/:slug', name: 'case-study', component: CaseStudyPage, props: true },
      { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, top: 80 }
      return { top: 0 }
    },
  })
}

export const router = createAppRouter(createWebHistory())
