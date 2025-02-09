import '@/@core/utils/compatibility'
import '@/@iconify/icons-bundle'
import '@/plugins/webfontloader'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import store from '@/store'
import { createApp } from 'vue'
import { removeEl } from './@core/utils/dom'
import { fetchGlobalSettings } from './api'
import { isPWA } from './@core/utils/navigator'
import './ace-config'
import { VAceEditor } from 'vue3-ace-editor'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import ToastPlugin from 'vue-toast-notification'
import VuetifyUseDialog from 'vuetify-use-dialog'
import VueApexCharts from 'vue3-apexcharts'
import DialogCloseBtn from '@/@core/components/DialogCloseBtn.vue'
import MediaCard from './components/cards/MediaCard.vue'
import PosterCard from './components/cards/PosterCard.vue'
import BackdropCard from './components/cards/BackdropCard.vue'
import PersonCard from './components/cards/PersonCard.vue'
import MediaInfoCard from './components/cards/MediaInfoCard.vue'
import TorrentCard from './components/cards/TorrentCard.vue'
import MediaIdSelector from './components/misc/MediaIdSelector.vue'
import PathField from './components/input/PathField.vue'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'vue3-perfect-scrollbar/style.css'

// 创建Vue实例
const app = createApp(App)

async function initializeApp() {
  try {
    // 是否为PWA
    const pwaMode = await isPWA()
    app.provide('pwaMode', pwaMode)
    // 全局设置
    const globalSettings = await fetchGlobalSettings()
    app.provide('globalSettings', globalSettings)
  } catch (error) {
    console.error('Failed to initialize app', error)
  }
}

// 注册全局组件
initializeApp().then(() => {
  // 优先注册框架
  app
    .use(vuetify)
  
  // 注册全局组件
  app
    .component('VAceEditor', VAceEditor)
    .component('VApexChart', VueApexCharts)
    .component('VDialogCloseBtn', DialogCloseBtn)
    .component('VMediaCard', MediaCard)
    .component('VPosterCard', PosterCard)
    .component('VBackdropCard', BackdropCard)
    .component('VPersonCard', PersonCard)
    .component('VMediaInfoCard', MediaInfoCard)
    .component('VTorrentCard', TorrentCard)
    .component('VMediaIdSelector', MediaIdSelector)
    .component('VPathField', PathField)

  // 注册插件
  app
    .use(router)
    .use(store)
    .use(ToastPlugin, {
      position: 'bottom-right',
    })
    .use(VuetifyUseDialog, {
      confirmDialog: {
        dialogProps: {
          maxWidth: '40rem',
        },
        confirmationButtonProps: {
          variant: 'elevated',
          color: 'primary',
          class: 'me-3 px-5',
          'prepend-icon': 'mdi-check',
        },
        cancellationButtonProps: {
          variant: 'outlined',
          color: 'secondary',
          class: 'me-3',
        },
        confirmationText: '确认',
        cancellationText: '取消',
      },
    })
    .use(PerfectScrollbarPlugin)
    .use(VueApexCharts)
    .mount('#app')
    .$nextTick(() => removeEl('#loading-bg'))
})
