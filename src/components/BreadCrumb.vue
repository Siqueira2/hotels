<template>
  <q-breadcrumbs class="text-grey-6">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" color="primary" />
    </template>

    <q-breadcrumbs-el :label="$t('shared.breadcrumbs.home')" to="/" />
    <q-breadcrumbs-el :label="$t('shared.breadcrumbs.hotels')" to="/hotels" />
  </q-breadcrumbs>
</template>
