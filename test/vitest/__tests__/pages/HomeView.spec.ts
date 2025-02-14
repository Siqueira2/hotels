import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import HomeView from 'src/pages/HomeView.vue'

vi.mock('vue-router', () => {
  return {
    useRoute: () => ({ query: {} }),
    useRouter: () => ({ push: vi.fn() }),
  }
})

const normalizeTestIds = (html: string) =>
  html.replace(/(?:id|aria-controls|for)="f_[a-z0-9-]+(?:_lb)?"/g, (match) =>
    match.includes('aria-controls')
      ? 'aria-controls="f_test-id_lb"'
      : `${match.split('=')[0]}="f_test-id"`,
  )

const createWrapper = () =>
  mount(HomeView, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
      mocks: { $router: { push: vi.fn() } },
    },
  }) as VueWrapper

describe('HomeView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should match snapshots', () => {
    const wrapperHtml = normalizeTestIds(wrapper.html())
    expect(wrapperHtml).toMatchSnapshot()
  })
})
