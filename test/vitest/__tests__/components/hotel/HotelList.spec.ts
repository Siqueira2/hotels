import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import type { Hotel as HotelType } from 'src/interfaces'

import { useHotelStore } from 'src/stores/hotel'

import HotelList from 'src/components/hotel/HotelList.vue'
import HotelCard from 'src/components/hotel/HotelCard.vue'

import HOTEL from 'src/data/hotel.json'
import { Hotel } from 'src/models/hotel'

vi.mock('vue-router', () => {
  return {
    useRoute: () => ({ query: {} }),
    useRouter: () => ({ push: vi.fn() }),
  }
})

const mockHotel = new Hotel(HOTEL[0]?.hotels[0] as HotelType)
const createWrapper = () =>
  mount(HotelList, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
    },
  })

describe('HotelList', () => {
  let wrapper: VueWrapper
  let store: ReturnType<typeof useHotelStore>

  beforeEach(() => {
    wrapper = createWrapper()
    store = useHotelStore()
    store.hotels = [mockHotel]
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should call fetchHotels on mount', () => {
    expect(store.fetchHotels).toHaveBeenCalled()
  })

  it('should render hotel list', () => {
    expect(wrapper.findAllComponents(HotelCard)).toHaveLength(1)
  })

  it('should render hotel card', () => {
    expect(wrapper.findComponent(HotelCard).exists()).toBeTruthy()
  })

  it('should call fetchHotel infinite scroll', async () => {
    const infiniteScroll = wrapper.find('.q-infinite-scroll')
    await infiniteScroll.trigger('load')

    expect(store.fetchHotels).toHaveBeenCalled()
  })
})
