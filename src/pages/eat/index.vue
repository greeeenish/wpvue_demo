<template>
  <div class="container">
    <textarea class='input_area' v-model="value" @input="changeInput"/>
    <i-button class="confirm_button" type="my" @click="addCard">确定</i-button>
    <i-message id="message" />
  </div>
</template>

<script>
  import store from '@/pages/counter/store.js'

  const { $Message } = require('../../../static/iview/base/index');

  export default {
    data () {
      return {
        value: '',
        result: '',
      }
    },

    components: {},

    methods: {
      addCard () {
        //输入是否为空
        if(this.value===''){
          $Message({
            content: '输入不能为空',
            type: 'error'
          });
          return
        }

        // 页面跳转
        store.commit('setValue',this.result)
        let url = '../counter/main'
        wx.navigateTo({url})
      },
      changeInput (event) {
        let result = event.target.value.replace(/(^\s*)|(\s*$)/g, '').split('\n').join('/')
        this.result = result
        this.value = event.target.value
      },
    },

    mounted () {
      this.value = ''
    }
  }
</script>

<style scoped>
  .i-btn-my {
    color:#4a4a4a!important;
    background:#fadf73!important;
    border-radius: 4px !important;
  }

  .confirm_button {
    margin-top: 1rem;
    width: 100%;
    border-radius: 4px !important;
  }

  .input_area {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 4px;
  }
</style>
