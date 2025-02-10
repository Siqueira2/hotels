<template>
  <div>
    <q-card flat>
      <h5 class="text-grey-2 q-px-md q-py-sm q-ma-none">
        {{ $t('hotels.title') }}
      </h5>

      <q-separator />

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-select
            v-model="model"
            :options="filteredPlaces"
            dense
            outlined
            required
            use-input
            hide-selected
            hide-dropdown-icon
            class="full-width row"
            input-debounce="0"
            :placeholder="$t('hotels.search.placeholder')"
            @filter="filterPlaces"
            @input-value="setFilteredPlaces"
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
import { usePlaceStore } from 'src/stores/place'
import type { Place } from 'src/interfaces'

const model = ref(null)
const placeStore = usePlaceStore()
const { places } = storeToRefs(placeStore)
const { fetchPlaces } = placeStore

onMounted(async () => {
  await fetchPlaces()
  setFilteredPlaces()
})

const formattedPlaces = computed(() =>
  places.value.map((place) => ({
    label: `${place.name}, ${place.state.shortname}`,
    value: place.placeId,
    ...place,
  })),
)

const filteredPlaces = ref<Array<Place & { label: string; value: number }>>([])
const setFilteredPlaces = () => {
  filteredPlaces.value = formattedPlaces.value
}

const filterPlaces = (search: string, update: (fn: VoidFunction) => void) => {
  if (!search) {
    setFilteredPlaces()
    return
  }

  update(() => {
    const searchText = search.toLowerCase()
    filteredPlaces.value = formattedPlaces.value.filter((place) =>
      place.label.toLowerCase().includes(searchText),
    )
  })
}

const onSubmit = () => {
  console.log({
    destination: model.value,
  })
}
</script>

<style lang="scss" scoped>
.q-btn__content span {
  line-height: initial;
}
</style>
