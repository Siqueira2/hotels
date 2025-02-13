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
            :model-value="model"
            :options="filteredPlaces"
            use-input
            hide-selected
            fill-input
            dense
            outlined
            hide-dropdown-icon
            class="full-width row"
            :disable="loading"
            :loading
            input-debounce="0"
            :placeholder="$t('hotels.search.placeholder')"
            @filter="filterPlaces"
            @input-value="setModel"
          >
            <template #no-option>
              <div class="q-pa-md">
                {{ $t('hotels.search.no-results') }}
              </div>
            </template>
          </q-select>

          <div class="row justify-end q-mt-md">
            <q-btn :label="getButtonLabel" color="primary" type="submit" rounded unelevated />
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
import type { LocationQueryRaw } from 'vue-router'
import { useI18n } from 'vue-i18n'

import type { Place } from 'src/models/place'

import { usePlaceStore } from 'src/stores/place'

type FormattedPlace = Place & { label: string; value: number }

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
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

const getButtonLabel = computed(() => {
  return model.value && Object.keys(route.query).length
    ? t('hotels.search.action')
    : t('hotels.search.button-label')
})

const formattedPlaces = computed(() =>
  places.value.map((place) => ({
    label: place.formattedName,
    value: place.getPlaceId,
    shortName: place.formattedNameWithShortName,
    ...place,
  })),
)

const filteredPlaces = ref<FormattedPlace[]>([])
const setFilteredPlaces = () => {
  filteredPlaces.value = formattedPlaces.value
}

const setModel = (place: string) => {
  model.value = formattedPlaces.value.find(({ label }) => label === place)?.shortName as string || place
}

const filterPlaces = (search: string, update: (fn: () => void) => void) => {
  setFilteredPlaces()
  update(() => {
    const searchText: string = search.toLowerCase()
    filteredPlaces.value = formattedPlaces.value.filter((place) =>
      place.label.toLowerCase().includes(searchText)
    )
  })
}

const onSubmit = async () => {
  if (!model.value && route.query.name) {
    const query: { [key: string]: unknown } = {
      ...route.query,
    }

    delete query.name

    await router.push({ query: query as LocationQueryRaw })
    return
  }

  await router.push({
    query: {
      ...route.query,
      name: model.value,
    },
  })
}
</script>
