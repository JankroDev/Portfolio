import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '../router'
import CaseStudyPage from '../pages/CaseStudyPage.vue'
import { projects } from '../content/projects'

async function mountCase(slug: string) {
  const router = createAppRouter(createMemoryHistory())
  await router.push(`/work/${slug}`)
  await router.isReady()
  const wrapper = mount(CaseStudyPage, { props: { slug }, global: { plugins: [router] } })
  await wrapper.vm.$nextTick()
  return { wrapper, router }
}

describe('CaseStudyPage', () => {
  it('renders title, meta, and all three sections', async () => {
    const { wrapper } = await mountCase('napa-invoices')
    expect(wrapper.find('h1').text()).toBe('NAPA Invoices')
    expect(wrapper.text()).toContain('NAPA Auto Parts')
    expect(wrapper.findAll('h2').slice(0, 3).map((h) => h.text())).toEqual(['Problem', 'What I built', 'Outcome'])
    expect(wrapper.findAll('.gallery img')).toHaveLength(3)
  })

  it('shows prev/next links that wrap around', async () => {
    const { wrapper } = await mountCase(projects[0]!.slug)
    expect(wrapper.find('a.pager__prev').attributes('href')).toBe(`/work/${projects[projects.length - 1]!.slug}`)
    expect(wrapper.find('a.pager__next').attributes('href')).toBe(`/work/${projects[1]!.slug}`)
  })

  it('renders the live embed for StorySoft projects', async () => {
    const { wrapper } = await mountCase('webframe')
    expect(wrapper.find('storysoft-webframe').exists()).toBe(true)
  })

  it('shows the NDA note and no gallery for the OEM project', async () => {
    const { wrapper } = await mountCase('aci-oem-quoting')
    expect(wrapper.find('.gallery').exists()).toBe(false)
    expect(wrapper.text()).toContain('non-disclosure')
  })

  it('redirects to home for an unknown slug', async () => {
    const { router } = await mountCase('does-not-exist')
    await router.isReady()
    await new Promise((r) => setTimeout(r, 0))
    expect(router.currentRoute.value.path).toBe('/')
  })
})
