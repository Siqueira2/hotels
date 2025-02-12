import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

import type { Hotel as HotelType } from 'src/interfaces'
import { Hotel } from 'src/models/hotel'

import HotelDrawer from 'src/components/hotel/HotelDrawer.vue'

import HOTEL from 'src/data/hotel.json'

const mockHotel = new Hotel(HOTEL[0]?.hotels[0] as HotelType)

const createWrapper = () =>
  mount(HotelDrawer, {
    props: {
      hotel: mockHotel,
      modelValue: true,
    },
  }) as VueWrapper

describe('HotelDrawer', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render hotel name correctly', () => {
    const hotelName = wrapper.find('h5')
    expect(hotelName.text()).toBe(mockHotel.getName)
  })

  it('should render hotel location correctly', () => {
    const location = wrapper.find('.text-subtitle2')
    expect(location.text()).toBe(mockHotel.getLocation)
  })

  it('should show amenities section when hotel has amenities', () => {
    const amenitiesSection = wrapper.find('[data-testid="hotel-amenities"]')
    expect(amenitiesSection.exists()).toBeTruthy()
  })

  it('should show limited amenities by default', () => {
    const amenities = wrapper.findAll('[data-testid="hotel-amenities"]')
    expect(amenities.length).toBeLessThanOrEqual(4)
  })

  it('should show all amenities when show more button is clicked', async () => {
    const showMoreButton = wrapper.find('.q-btn')

    await showMoreButton.trigger('click')

    const amenities = wrapper.findAll('[data-testid="hotel-amenities"] .q-icon')
    expect(amenities.length).toBe(mockHotel.getAmenities?.length)
  })

  it('should emit update:modelValue when backdrop is clicked', async () => {
    const backdrop = wrapper.find('.backdrop')

    await backdrop.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('should render hotel description', () => {
    const description = wrapper.find('[data-testid="hotel-description"]')
    expect(description.text().trim()).toBe(mockHotel.getDescription.trim())
  })
})
