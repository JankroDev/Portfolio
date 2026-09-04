import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('toolchain', () => {
  it('mounts a Vue component under jsdom', () => {
    const Hello = defineComponent({ render: () => h('p', 'hello') })
    const wrapper = mount(Hello)
    expect(wrapper.text()).toBe('hello')
  })
})
