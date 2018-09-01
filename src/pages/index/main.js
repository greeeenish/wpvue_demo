import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    usingComponents: {
      'i-tab-bar': '../../static/iview/tab-bar/index',
      'i-tab-bar-item': '../../static/iview/tab-bar-item/index',
      'i-avatar': '../../static/iview/avatar/index',

      'i-button': '../../static/iview/button/index',
      'i-message': '/../../static/iview/message/index',

      'i-panel': '/../../static/iview/panel/index',
      'i-grid': '/../../static/iview/grid/index',
      'i-grid-item': '/../../static/iview/grid-item/index',
      'i-grid-label': '/../../static/iview/grid-label/index',
      "i-grid-icon": "/../../static/iview/grid-icon/index",
      "i-row": "/../../static/iview/row/index",
      "i-col": "/../../static/iview/col/index",
      "i-modal": "/../../static/iview/modal/index",
    }
  }
}
