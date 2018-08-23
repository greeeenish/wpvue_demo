import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    usingComponents: {
      'i-button': '../../../iview/button/index',
      'i-message': '../../../iview/message/index',

      'i-tab-bar': '../../../iview/tab-bar/index',
      'i-tab-bar-item': '../../../iview/tab-bar-item/index',
    }
  }
}
