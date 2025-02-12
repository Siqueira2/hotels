<template>
  <div>
    <q-card flat>
      <h5 class="text-grey-2 q-px-md q-py-sm q-ma-none">
        {{ $t('hotels.title') }}
      </h5>

      <q-separator />

      <q-card-section>
        <q-form @submit="onSubmit">
          <p class="text-weight-semibold q-mb-sm text-grey-6">
            {{ $t('hotels.search.label') }}

            <span class="text-red-5 text-weight-bold">*</span>
          </p>

          <q-select
            v-model="model"
            :options="filteredPlaces"
            dense
            outlined
            use-input
            hide-selected
            hide-dropdown-icon
            fill-input
            class="full-width row"
            :disable="loading"
            :loading
            input-debounce="0"
            :placeholder="$t('hotels.search.placeholder')"
            @filter="filterPlaces"
            @update:model-value="setModel"
          >
            <template #no-option>
              <div class="q-pa-md">
                {{ $t('hotels.search.no-results') }}
              </div>
            </template>
          </q-select>

          <div class="row justify-end q-mt-md">
            <q-btn
              :label="$t('hotels.search.action')"
              color="primary"
              type="submit"
              rounded
              unelevated
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

import type { Place } from 'src/models/place'

import { usePlaceStore } from 'src/stores/place'

type FormattedPlace = Place & { label: string; value: number }

const router = useRouter()
const route = useRoute()
const placeStore = usePlaceStore()
const { places } = storeToRefs(placeStore)
const { fetchPlaces } = placeStore

const model = ref<string | null>(null)
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  await fetchPlaces()
  loading.value = false
})

const formattedPlaces = computed(() =>
  places.value.map((place) => ({
    label: place.formattedName,
    value: place.getPlaceId,
    ...place,
  })),
)

const filteredPlaces = ref<FormattedPlace[]>([])
const setFilteredPlaces = () => {
  filteredPlaces.value = formattedPlaces.value
}

const setModel = (place: FormattedPlace) => {
  model.value = place.label
}

const filterPlaces = (search: string, update: (fn: () => void) => void) => {
  setFilteredPlaces()
  update(() => {
    const searchText = search.toLowerCase()
    filteredPlaces.value = formattedPlaces.value.filter((place) =>
      place.label.toLowerCase().includes(searchText),
    )
  })
}

const onSubmit = async () => {
  if (!model.value) return

  const selectedPlace = formattedPlaces.value.find((place) => place.label === model.value)
  if (!selectedPlace) return

  await router.push({
    query: {
      ...route.query,
      name: selectedPlace.label,
    },
  })
}
</script>
