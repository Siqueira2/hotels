import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import type { ComponentPublicInstance } from 'vue'

import SortSelector from 'src/components/SortSelector.vue'

vi.mock('vue-router')
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

type SortSelectorWrapper = VueWrapper<ComponentPublicInstance<typeof SortSelector>>

const createWrapper = (): SortSelectorWrapper =>
  mount(SortSelector, {
    global: {
      mocks: {
        $router: {
          push: vi.fn(),
        },
      },
    },
  })

describe('SortSelector', () => {
  let wrapper: SortSelectorWrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should render sort options', () => {
    expect(wrapper.find('.q-select').exists()).toBeTruthy()
  })

  it('should have correct default options', () => {
    const options = wrapper.vm.options
    expect(options).toEqual([
      { label: 'shared.sort.recommended', value: 'recommended' },
      { label: 'shared.sort.rating', value: 'rating' },
    ])
  })

  it('should have recommended as default selected option', () => {
    const selectedOption = wrapper.vm.selectedOption
    expect(selectedOption).toEqual({
      label: 'shared.sort.recommended',
      value: 'recommended',
    })
  })

  it('should render sort label', () => {
    const label = wrapper.find('span')
    expect(label.text()).toBe('shared.sort-by')
  })

  it('should render selected option label', () => {
    const selectedLabel = wrapper.find('.text-primary')
    expect(selectedLabel.text()).toBe('shared.sort.recommended')
  })

  it('should render expand icon', () => {
    const icon = wrapper.find('.q-icon')
    expect(icon.exists()).toBeTruthy()
  })

  it('should rotate icon when select is opened', async () => {
    wrapper.vm.selectOpened = true

    await wrapper.vm.$nextTick()

    const icon = wrapper.find('.q-icon')

    expect(icon.classes()).toContain('rotate-icon')
  })
})
