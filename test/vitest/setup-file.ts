import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

installQuasarPlugin()

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages,
})

config.global.plugins = [i18n]
config.global.mocks = {
  $t: (key: string) => key,
}
