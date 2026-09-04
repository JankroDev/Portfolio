import { describe, it, expect } from 'vitest'
import { createMemoryHistory, type RouteLocationNormalized } from 'vue-router'
import { createAppRouter } from '../router'

describe('router', () => {
  it('serves home and case-study routes', async () => {
    const router = createAppRouter(createMemoryHistory())
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
    await router.push('/work/story-builder')
    expect(router.currentRoute.value.name).toBe('case-study')
    expect(router.currentRoute.value.params.slug).toBe('story-builder')
  })

  it('redirects unknown paths to home', async () => {
    const router = createAppRouter(createMemoryHistory())
    await router.push('/nothing/here')
    expect(router.currentRoute.value.path).toBe('/')
  })

  describe('scrollBehavior', () => {
    const { scrollBehavior } = createAppRouter(createMemoryHistory()).options

    it('delays past the route transition when the hash targets a different path', async () => {
      const to = { hash: '#work', path: '/' } as unknown as RouteLocationNormalized
      const from = { path: '/work/player' } as unknown as RouteLocationNormalized
      const result = scrollBehavior!(to, from, null)
      expect(result).toBeInstanceOf(Promise)
      await expect(result).resolves.toEqual({ el: '#work', top: 80 })
    })

    it('resolves synchronously when the hash targets the same path', () => {
      const to = { hash: '#work', path: '/' } as unknown as RouteLocationNormalized
      const from = { path: '/' } as unknown as RouteLocationNormalized
      const result = scrollBehavior!(to, from, null)
      expect(result).not.toBeInstanceOf(Promise)
      expect(result).toEqual({ el: '#work', top: 80 })
    })

    it('scrolls to top when there is no hash', () => {
      const to = { hash: '', path: '/' } as unknown as RouteLocationNormalized
      const from = { path: '/work/player' } as unknown as RouteLocationNormalized
      const result = scrollBehavior!(to, from, null)
      expect(result).toEqual({ top: 0 })
    })
  })
})
