import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '../router'
import HomePage from '../pages/HomePage.vue'
import { projects } from '../content/projects'
import { experience } from '../content/experience'

async function mountHome() {
  const router = createAppRouter(createMemoryHistory())
  await router.push('/')
  await router.isReady()
  return mount(HomePage, { global: { plugins: [router] } })
}

describe('HomePage', () => {
  it('has the sections in order', async () => {
    const wrapper = await mountHome()
    const ids = wrapper.findAll('section[id]').map((s) => s.attributes('id'))
    expect(ids).toEqual(['work', 'experience', 'skills', 'about', 'contact'])
  })

  it('shows the title and never Jr', async () => {
    const wrapper = await mountHome()
    expect(wrapper.text()).toContain('Full Stack Developer')
    expect(wrapper.text()).not.toMatch(/\bJr\b/)
    expect(document.title).toBe('Chris Janke · Full Stack Developer')
  })

  it('renders every project card and every experience entry', async () => {
    const wrapper = await mountHome()
    expect(wrapper.findAll('a.card')).toHaveLength(projects.length)
    expect(wrapper.findAll('.timeline__item')).toHaveLength(experience.length)
  })

  it('links to the resume PDF', async () => {
    const wrapper = await mountHome()
    const links = wrapper.findAll('a[href="/Chris_Janke_Resume.pdf"]')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})
