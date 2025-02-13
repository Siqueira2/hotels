import { describe, it, expect, beforeEach } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import type { ComponentPublicInstance } from 'vue'

import type { Hotel as HotelType } from 'src/interfaces'
import { Hotel } from 'src/models/hotel'

import HotelCarousel from 'src/components/hotel/HotelCarousel.vue'

import HOTEL from 'src/data/hotel.json'

const mockHotel = new Hotel(HOTEL[0]?.hotels[0] as HotelType)

const createWrapper = (props = {}) =>
  mount(HotelCarousel, {
    props: { hotel: mockHotel, ...props },
  })

describe('HotelCarousel', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof HotelCarousel>>

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should compute the correct height style', () => {
    const expectedHeight = 'height: 256px'
    expect(wrapper.vm.getHeightStyle).toBe(expectedHeight)
  })

  it('should computed the correct height style with a custom height', () => {
    const customHeight = 300
    wrapper = createWrapper({ height: customHeight })
    expect(wrapper.vm.getHeightStyle).toBe(`height: ${customHeight}px`)
  })
})
