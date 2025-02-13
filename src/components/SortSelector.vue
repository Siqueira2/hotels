<template>
  <div class="row items-center">
    <span class="q-mr-sm text-grey-6">{{ $t('shared.sort-by') }}</span>

    <q-select
      borderless
      dense
      hide-dropdown-icon
      v-model="selectedOption"
      :options="options"
      @update:model-value="updateSort"
      @popup-show="handlePopupState"
      @popup-hide="handlePopupState"
    >
      <template #selected>
        <p class="text-primary text-weight-bold q-ma-none">{{ selectedOption.label }}</p>
      </template>

      <template #append>
        <q-icon name="expand_more" color="primary" :class="{ 'rotate-icon': selectOpened }" />
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

type Option = {
  label: string
  value: 'recommended' | 'rating'
}

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const options = ref<Option[]>([
  { label: t('shared.sort.recommended'), value: 'recommended' },
  { label: t('shared.sort.rating'), value: 'rating' },
])

const selectedOption = ref<Option>(options.value[0] as Option)
const selectOpened = ref(false)

const handlePopupState = () => {
  selectOpened.value = !selectOpened.value
}

const updateSort = async () => {
  await router.push({
    query: {
      ...route.query,
      sort: selectedOption.value.value,
    },
  })
}
</script>

<style scoped lang="scss">
.q-icon {
  transition: transform 0.3s ease;
  transform: rotate(0deg);
}

.rotate-icon {
  transform: rotate(180deg);
}
</style>
