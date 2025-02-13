import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

import BreadCrumb from 'src/components/BreadCrumb.vue'

vi.mock('vue-router', () => {
  return { useRoute: () => ({ query: { name: 'Belo Horizonte' } }) }
})

const createWrapper = () =>
  mount(BreadCrumb, {
    global: { mocks: { $router: { push: vi.fn() } } },
  }) as VueWrapper

describe('BreadCrumb', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should match snapshots', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should contain correct text', () => {
    expect(wrapper.text()).toContain('Belo Horizonte')
  })
})
