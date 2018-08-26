<template>
  <div class="container">
    <!--吃饭-->
    <eat v-if="iseat"></eat>
    <!--天气-->
    <weather v-if="isweather"></weather>

    <i-tab-bar :current="current" color="#fadf73" class="navigate" @change="handleChange">
      <i-tab-bar-item key="eat" img="../../../static/img/eat.png" currentImg="../../../static/img/eat.png" title="吃饭"></i-tab-bar-item>
      <i-tab-bar-item key="weather" img="../../../static/img/weather.png" currentImg="../../../static/img/weather.png" title="天气"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
import store from '@/pages/counter/store.js'
import eat from '@/pages/eat/index'
import weather from '@/pages/weather/index'

export default {
  data () {
    return {
      current: 'homepage',
    }
  },
  computed: {
    iseat: function () {
      return this.current=='eat'? true: false
    },
    isweather: function () {
      return this.current=='weather'? true: false
    }
  },

  components: {
    eat,weather
  },

  methods: {
    handleChange(event) {
      this.current = event.target.key
    },
  },

  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped>
  .navigate {
    width: 100%;
    position: fixed;
    bottom: 0;
  }

  .i-btn-my {
    color:#4a4a4a!important;
    background:#fadf73!important;
    border-radius: 4px !important;
  }

  .confirm_button {
    margin-top: 1rem;
    width: 100%;
    height: 10%;
    border-radius: 4px !important;
  }

  .input_area {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 4px;
  }

</style>
