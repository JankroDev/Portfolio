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
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) {
        // App.vue wraps <RouterView> in <Transition mode="out-in">, so when the
        // path is also changing, the incoming page isn't in the DOM yet at the
        // point vue-router resolves scrollBehavior (it runs before the new
        // route's component mounts) — el: to.hash would silently find nothing.
        // Wait past the 180ms fade before resolving so the target element exists.
        if (to.path !== from.path) {
          return new Promise((resolve) => {
            setTimeout(() => resolve({ el: to.hash, top: 80 }), 220)
          })
        }
        return { el: to.hash, top: 80 }
      }
      return { top: 0 }
    },
  })
}

export const router = createAppRouter(createWebHistory())
