<template>
  <div class="container">

    <div class="weather" :style="{ height: Height + 'px' }">
      <!--今日天气-->
      <div class="weather_today">
        <div class="date">
          <div>{{currentWeather.currentCity}}</div>
          <div>{{currentWeather.date}}</div>
        </div>
        <div class="temperature">{{currentWeather.temp}}</div>
        <div class="weatherDesc">
          <div>{{currentWeather.weatherDesc}}</div>
          <div>{{currentWeather.wind}}</div>
          <div>{{currentWeather.pm25}}</div>
        </div>
      </div>
      <!--未来天气-->
      <div class="weather_tomorrow">
        <div class="weather_tomorrow_line">
            <div class="weather_tomorrow_item" v-for="item in weather_tomorrow" :key="item">
              <div class="weather_tomorrow_label" :style="{ width: Width + 'px' }">{{item.date}}</div>
              <div class="weather_tomorrow_label" :style="{ width: Width + 'px' }">{{item.temperature}}</div>
              <div class="weather_tomorrow_label" :style="{ width: Width + 'px' }">{{item.weather}}</div>
              <div class="weather_tomorrow_label" :style="{ width: Width + 'px' }">{{item.wind}}</div>
            </div>
        </div>
      </div>
    </div>

    <!--生活指数-->
    <div class="life_grid">
      <i-grid>
        <i-row>
          <i-grid-item v-for="item in lifegrid" :key="item.title" @click="selectGrid(item)">
            <div class="grid-icon">
              <img class="grid-image" :src=item.src />
              <i-grid-label>{{item.title}}</i-grid-label>
              <i-grid-label>{{item.zs}}</i-grid-label>
            </div>
          </i-grid-item>
        </i-row>
      </i-grid>
    </div>

    <i-modal :title="modal_title" :visible="visible" :actions="action" @click="handleClose">
      <view class="modal_content">{{modal_content}}</view>
    </i-modal>

  </div>
</template>

<script>
  const bmap = require('../../../static/libs/bmap-wx.js');

  export default {
    data () {
      return {
        currentWeather: {},
        weather_tomorrow: [],

        lifegrid: [],
        visible: false,
        modal_title: '',
        modal_content: '',
        action: [{
          name: '我知道了',
          color: '#4a4a4a'
        }],

        Height: 100,
        Width: 100
      }
    },

    components: {},

    methods: {
      getWeatherData() {
        const me = this

        let BMap = new bmap.BMapWX({
          ak: 'cDwREkh8pnEgiFku0khLpfpWzGymcR5w'
        });
        let fail = function(data) {
          console.log(data)
        };
        let success = function(data) {
          console.log(data)

          //currentWeather
          me.currentWeather = data.currentWeather[0]
          let temp = me.currentWeather.date.split('(')
          me.currentWeather['date'] = temp[0]
          me.currentWeather['temp'] = temp[1].match('\\d.') + '℃'

          //weather_tomorrow
          me.weather_tomorrow = data.originalData.results[0].weather_data
          me.weather_tomorrow[0].date = '今天'

          //life-grid
          var lifegrid = data.originalData.results[0].index
          for(let i of lifegrid){
            if(i.title=='紫外线强度'){
              i['title'] = '紫外线'
            }
            i['src'] = '/static/img/'+i.title+'.png'
          }
          me.lifegrid = lifegrid

        }
        // 发起weather请求
        BMap.weather({
          fail: fail,
          success: success
        });
      },
      selectGrid (item) {
        this.modal_title= item.tipt
        this.modal_content = item.des
        this.visible = true
      },
      handleClose() {
        this.visible = false
      },

      setHeight() {
        this.Height = wx.getSystemInfoSync().windowHeight-50
        this.Width = wx.getSystemInfoSync().windowWidth/2
      }
    },

    onLoad() {
      this.setHeight()
      this.getWeatherData()
    }

  }
</script>

<style scoped>
  .container {
    width: 100%;
  }

  .weather {
    width: 100%;
    height: 100%;
    background: #fadf73;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    color: #4a4a4a;
  }
  /*今日天气*/
  .weather_today {
    width: 100%;
    height: 75%;
    background: #fadf73;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    color: #4a4a4a;
  }
  .date {
    text-align: center;
  }
  .temperature {
    font-size: 50px;
  }
  .weatherDesc {
    text-align: center;
  }

  /*未来天气*/
  .weather_tomorrow{
    height: 25%;
    width: 100%;
    background: rgba(250, 249, 247, 0.51);
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .weather_tomorrow_line{
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .weather_tomorrow_item{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .weather_tomorrow_label{
    margin-top:5px;
    text-align:center;
    color:#4a4a4a;
    font-size:14px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden
  }

  /*生活指数*/
  .life_grid {
    width: 100%;
    background: #fff;
  }
  .grid-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .grid-image{
    width: 30px;
    height:30px;
  }
  .modal_content {
    padding: 0 12px;
    text-align: justify;
  }

</style>
