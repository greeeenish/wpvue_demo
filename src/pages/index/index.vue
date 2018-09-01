<template>
  <div class="container">

    <!--用户信息-->
    <div v-if="userinfo" class="userinfo">
      <i-avatar shape="circle" size="mysize"><open-data type="userAvatarUrl"></open-data></i-avatar>
      <span class="username">你来啦，<open-data type="userNickName"></open-data></span>
    </div>

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
      userinfo: true,
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
      this.userinfo = false
    },
  },

  onLoad () {

  }
}
</script>

<style scoped>
  .container {
    display: flex;
    align-items: center;
  }

  .navigate {
    width: 100%;
    position: fixed;
    bottom: 0;
  }

  .userinfo {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .username {
    color: #4a4a4a;
    margin-top: 0.3rem;
  }




</style>
