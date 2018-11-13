import Vue from 'vue'
import App from './App.vue'
import router from './router'

/**
 *  updateauth + vconsole + imax
 */
import { OnInitApp } from '@roto/bridge'
OnInitApp.init().execute()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
