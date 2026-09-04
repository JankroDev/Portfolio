import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StorySoftEmbed, { SCRIPT_URLS, resetScriptCache } from '../components/StorySoftEmbed.vue'

const fallback = { src: '/fake.png', alt: 'fallback' }

function scriptFor(kind: 'webframe' | 'player') {
  return document.head.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_URLS[kind]}"]`)
}

describe('StorySoftEmbed', () => {
  beforeEach(() => {
    document.head.querySelectorAll('script[data-storysoft]').forEach((s) => s.remove())
    resetScriptCache()
    vi.useRealTimers()
  })

  it('injects the module script once and renders the custom element', async () => {
    const embed = { kind: 'player' as const, attrs: { source: 'https://example.test/story' } }
    mount(StorySoftEmbed, { props: { embed, fallback } })
    mount(StorySoftEmbed, { props: { embed, fallback } })
    const scripts = document.head.querySelectorAll(`script[src="${SCRIPT_URLS.player}"]`)
    expect(scripts).toHaveLength(1)
    expect(scripts[0]!.getAttribute('type')).toBe('module')
  })

  it('renders the custom element with the given attributes', () => {
    const embed = { kind: 'webframe' as const, attrs: { 'client-name': 'storysoft', 'webframe-id': 'x' } }
    const wrapper = mount(StorySoftEmbed, { props: { embed, fallback } })
    const el = wrapper.find('storysoft-webframe')
    expect(el.exists()).toBe(true)
    expect(el.attributes('client-name')).toBe('storysoft')
  })

  it('shows the fallback image when the script fails to load', async () => {
    const embed = { kind: 'player' as const, attrs: { source: 'x' } }
    const wrapper = mount(StorySoftEmbed, { props: { embed, fallback } })
    scriptFor('player')!.dispatchEvent(new Event('error'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('storysoft-player').exists()).toBe(false)
    expect(wrapper.find('img').attributes('src')).toBe('/fake.png')
    expect(wrapper.text()).toContain('could not load')
  })

  it('shows the fallback if the element never upgrades before the timeout', async () => {
    vi.useFakeTimers()
    const embed = { kind: 'webframe' as const, attrs: {} }
    const wrapper = mount(StorySoftEmbed, { props: { embed, fallback } })
    vi.advanceTimersByTime(10_000)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
