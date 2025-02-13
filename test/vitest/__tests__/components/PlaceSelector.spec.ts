import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import type { ComponentPublicInstance } from 'vue'

import { usePlaceStore } from 'src/stores/place'
import { Place as PlaceModel } from 'src/models'
import type { Place as PlaceType } from 'src/interfaces'

import PlaceSelector from 'src/components/PlaceSelector.vue'

import PLACE from 'src/data/place.json'

vi.mock('vue-router', () => {
  return {
    useRoute: () => ({ query: {} }),
    useRouter: () => ({ push: vi.fn() }),
  }
})

const placeMock = new PlaceModel(PLACE[0] as PlaceType)

const normalizeTestIds = (html: string) =>
  html.replace(/(?:id|aria-controls|for)="f_[a-z0-9-]+(?:_lb)?"/g, (match) =>
    match.includes('aria-controls')
      ? 'aria-controls="f_test-id_lb"'
      : `${match.split('=')[0]}="f_test-id"`,
  )

const createWrapper = () =>
  mount(PlaceSelector, {
    global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
  }) as VueWrapper<ComponentPublicInstance<typeof PlaceSelector>>

describe('PlaceSelector', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof PlaceSelector>>
  let store: ReturnType<typeof usePlaceStore>

  beforeEach(() => {
    wrapper = createWrapper()
    store = usePlaceStore()
    store.places = [placeMock]
  })

  it('should match snapshot', () => {
    const wrapperHtml = normalizeTestIds(wrapper.html())
    expect(wrapperHtml).toMatchSnapshot()
  })

  it('should call fetchPlaces when mounted', () => {
    expect(store.fetchPlaces).toHaveBeenCalled()
  })

  it('should filter places based on user input', async () => {
    const input = wrapper.find('input')
    await input.setValue('São Paulo')

    const filteredPlaces = store.places.filter((place) => place.formattedName.includes('São Paulo'))
    expect(wrapper.vm.filteredPlaces).toEqual(filteredPlaces)
  })

  it('should enable the button when a place is selected', async () => {
    const input = wrapper.find('input')
    await input.setValue('São Paulo')

    const select = wrapper.findComponent({ name: 'QSelect' })
    const options = select.vm.$props.options

    expect(options).toBeDefined()

    await select.setValue(options[0]?.value)

    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('should not show no-option message when places are found', async () => {
    const input = wrapper.find('input')
    await input.setValue('São Paulo')

    const noOptionMessage = wrapper.find('.q-pa-md')
    expect(noOptionMessage.exists()).toBe(false)
  })
})
