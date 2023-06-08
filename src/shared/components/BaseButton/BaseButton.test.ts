import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

const factory = (
  props?: Record<string, unknown>,
  slots: { [key: string]: string } = { default: 'Button' }
) => {
  return mount(BaseButton, {
    props,
    slots
  })
}

describe('BaseButton Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('checks type prop', () => {
    const wrapper = factory({ type: 'submit' })
    expect(wrapper.findAll('button[type="submit"]')).toHaveLength(1)
  })

  it('checks button default variant', () => {
    const wrapper = factory()
    expect(wrapper.find('button').classes()).toContain('bg-primary')
  })

  it('checks button variant', () => {
    const wrapper = factory({ variant: 'error' })
    expect(wrapper.find('button').classes()).toContain('bg-error')
  })

  it('checks button variant and outlined props', () => {
    const wrapper = factory({ variant: 'error', outlined: true })
    expect(wrapper.find('button').classes()).toContain('bg-white')
  })

  it('emits an event when clicked', () => {
    const wrapper = factory()
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('checks default slot', () => {
    const slotText = 'Checking default slot'
    const wrapper = factory({ variant: 'error' }, { default: slotText })
    expect(wrapper.find('button').text()).toBe(slotText)
  })
})
