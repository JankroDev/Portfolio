import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import App from '../App.vue'
import { createAppRouter } from '../router'

// Transition stubs are disabled so the real <Transition mode="out-in"> in App.vue runs.
// A multi-root page inside it would never finish leaving and the next page would stay blank.
async function mountApp(path: string) {
  const router = createAppRouter(createMemoryHistory())
  await router.push(path)
  await router.isReady()
  const wrapper = mount(App, { global: { plugins: [router], stubs: { transition: false } } })
  await wrapper.vm.$nextTick()
  return { wrapper, router }
}

// Vue's CSS transition waits two animation frames before it can finish a zero-duration leave.
async function settle(wrapper: { vm: { $nextTick: () => Promise<void> } }) {
  await new Promise((r) => setTimeout(r, 100))
  await wrapper.vm.$nextTick()
}

describe('App navigation', () => {
  it('renders a case study after client-side navigation from the home page', async () => {
    const { wrapper, router } = await mountApp('/')
    expect(wrapper.find('section#work').exists()).toBe(true)

    await router.push('/work/story-builder')
    await settle(wrapper)

    expect(wrapper.find('h1').text()).toBe('Story Builder')
  })

  it('renders the home page after navigating back from a case study', async () => {
    const { wrapper, router } = await mountApp('/work/player')
    expect(wrapper.find('h1').text()).toBe('Player')

    await router.push('/')
    await settle(wrapper)

    expect(wrapper.find('section#work').exists()).toBe(true)
  })
})
