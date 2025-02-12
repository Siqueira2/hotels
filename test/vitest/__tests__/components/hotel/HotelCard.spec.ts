import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

import HotelCard from 'src/components/hotel/HotelCard.vue'
import type { Hotel as HotelType } from 'src/interfaces'
import { Hotel } from 'src/models/hotel'

import HOTEL from 'src/data/hotel.json'

const mockHotel = new Hotel(HOTEL[0]?.hotels[0] as HotelType)

const createWrapper = () =>
  mount(HotelCard, {
    props: {
      hotel: mockHotel as unknown as Hotel,
    },
  }) as VueWrapper

describe('HotelCard', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render refundable chip when hotel is refundable', () => {
    const refundableChip = wrapper.find('.q-chip')

    expect(refundableChip.exists()).toBeTruthy()
  })

  it('should show correct text in refundable chip', async () => {
    await wrapper.setProps({
      hotel: {
        ...mockHotel,
        isRefundable: true,
      },
    })

    const refundableChip = wrapper.find('.q-chip')

    expect(refundableChip.exists()).toBeTruthy()
  })

  it('should emit select event when select button is clicked', async () => {
    await wrapper.find('.q-btn').trigger('click')

    expect(wrapper.emitted()).toBeTruthy()
  })

  it('should render carousel with hotel images', () => {
    expect(wrapper.findAll('.q-img').length).toBe(1)
  })
})
