<template>
  <!-- 轮播功能 -->
    <div class="banner">
        <img v-for="(v,i) in items" :key="i" :src="v" v-show="cur==i"/>
        <div class="banner-circle">
            <ul>
                <li v-for="(v,i) in items" :key="i" :class="{'selected':cur==i}"></li>   
            </ul> 
        </div>
    </div>
</template>

<script>

export default {
    name:'my-banner',
  data(){
    return {
      cur:0, //初始化
      // items:[
      //   require('@/assets/img/1.jpg'),
      //   require('@/assets/img/2.jpg'),
      //   require('@/assets/img/1.jpg'),
      //   require('@/assets/img/2.jpg')
      // ],
      timer:null  //定时器初始化
    }
  },
  props:{
    items:{
      type:Array,
      default:function(){
        return [require('@/assets/img/1.jpg')]
      }
    }
  },
  methods:{
    autoPlay(){
      this.timer = setInterval(this.play,2000);  //定时器
    },
    play(){
      this.cur ++;
      if(this.cur == this.items.length){
        this.cur = 0;
      }
    }
  },
  mounted:function(){    //生命周期，挂载完成
    this.autoPlay()
  },
  destroyed(){  //生命周期，销毁
    clearInterval(this.timer);   //清除定时器
  }
}
</script>

<style scoped>

</style>
