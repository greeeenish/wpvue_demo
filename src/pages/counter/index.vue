<template>
  <div class="container">
    <div class="flip Y" v-for="item in values">
      <div class="front"></div>
      <div class="back">{{item.value}}</div>
    </div>

  </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  data () {
    return {
      values: [],
      show_card: false,
      selected: false   //是否选择了
    }
  },
  methods: {
    showCard (item) {
      if(!this.selected){
        item.cardStyle = true
        this.show_card = true
        this.selected = true
      }


    },
    getValues () {
      let options = store.state.value
      let values = options.split('/')
      let result = []

      //去掉数组中的空数据
      for(let i=0; i<values.length; i++){
        if(values[i]=='' || values[i]==null || typeof values[i] === 'undefined'){
          values.splice(i,1)
          i = i-1;
        }
      }

      //打乱顺序 但不能做到完全乱序
      values.sort(function(){ return 0.5 - Math.random() })

      for(let value of values){
        let obj = {
          cardStyle: false,
          value: '',
        }
        obj.value = value
        result.push(obj)
      }
      this.values = result
    }
  },
  onLoad () {
    // 初始化
    this.show_card = false
    this.values = []
    this.selected = false

    this.getValues()

  }
}
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .flip {
    width: 25%;
    height: 1.8rem;
    position: relative;
    margin: 4%;
    line-height: 1.8rem;

  }

  .flip div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #4a4a4a;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  /* 分别设置前后两个类的背景图像，垂直位置 */
  .flip div.front{
    background: #fff;
    z-index: 1;
  }
  .flip div.back{
    background: #fadf73;
    z-index: 2;
  }

  /* 翻转类样式 */
  .flip{
    /*其他代码略*/
    /* 设置景深 */
    perspective: 1000px;
  }
  /* 前后两个类的共同样式 */
  .flip div{
    /*其他代码略*/
    transition: all 1s ease;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  /* hover之后的垂直位置 */
  .flip:hover div.front{ z-index: 2;;}
  .flip:hover div.back{ z-index: 1;;}
  /* rotateY的响应 */
  .Y div.back{ transform:rotateY(180deg);}
  .Y:hover div.front{ transform:rotateY(180deg);}
  .Y:hover div.back{ transform:rotateY(0deg);}

</style>
