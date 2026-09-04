import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '../router'
import ProjectGrid from '../components/ProjectGrid.vue'
import { projects } from '../content/projects'

async function mountGrid() {
  const router = createAppRouter(createMemoryHistory())
  await router.push('/')
  await router.isReady()
  return mount(ProjectGrid, { global: { plugins: [router] } })
}

describe('ProjectGrid', () => {
  it('renders one card per project linking to its case study', async () => {
    const wrapper = await mountGrid()
    const links = wrapper.findAll('a.card')
    expect(links).toHaveLength(projects.length)
    projects.forEach((p, i) => {
      expect(links[i]!.attributes('href')).toBe(`/work/${p.slug}`)
      expect(links[i]!.text()).toContain(p.title)
    })
  })

  it('shows at most four stack tags per card', async () => {
    const wrapper = await mountGrid()
    for (const card of wrapper.findAll('a.card')) {
      expect(card.findAll('.tag').length).toBeLessThanOrEqual(4)
    }
  })

  it('renders a typographic placeholder when a project has no thumbnail', async () => {
    const wrapper = await mountGrid()
    const oem = wrapper.find('a[href="/work/aci-oem-quoting"]')
    expect(oem.find('img').exists()).toBe(false)
    expect(oem.find('.card__placeholder').exists()).toBe(true)
  })
})
