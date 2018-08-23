<template>
  <div class="container">
    <textarea class='input_area' id="input" @input="changeInput"/>
    <i-button class="confirm_button" type="my" @click="addCard">确定</i-button>
    <i-message id="message" />
  </div>
</template>

<script>
  import store from '@/pages/counter/store.js'

  const { $Message } = require('../../../dist/iview/base/index');

  export default {
    data () {
      return {
        value: '',
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
        store.commit('setValue',this.value)
        let url = '../counter/main'
        wx.navigateTo({url})
      },
      changeInput (event) {
        let value = event.target.value.replace(/(^\s*)|(\s*$)/g, '').split('\n').join('/')
        this.value = value
        console.log(value)
      },
      handleChange(event) {
        this.current = event.target.key
      }
    },

    created () {
      // 调用应用实例的方法获取全局数据
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
