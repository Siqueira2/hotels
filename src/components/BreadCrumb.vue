<template>
  <q-breadcrumbs class="text-grey-6">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" color="primary" />
    </template>

    <q-breadcrumbs-el :label="$t('shared.breadcrumbs.home')" to="/" />
    <q-breadcrumbs-el :label="$t('shared.breadcrumbs.hotels')" />
    <template v-if="breadcrumbs">
      <q-breadcrumbs-el :label="breadcrumbs" />
    </template>
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

const breadcrumbs = computed(() =>
  t('shared.breadcrumbs.accommodation', { suffix: route.query.name }),
)
</script>
