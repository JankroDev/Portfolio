import { describe, it, expect } from 'vitest'
import { createMemoryHistory } from 'vue-router'
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
})
