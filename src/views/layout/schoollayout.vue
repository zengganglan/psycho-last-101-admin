<template>
    <div class="app-wrapper">
        <div class="head">
            <top/>
        </div>
        <div class="main-container">
            <Navbar/>
         <transition name="fade" mode="out-in">
            <router-view>1</router-view>
        </transition>
        </div>
    </div>
</template>

<script>
    import top from "./head"
    import Navbar from "./schoolnavbar"
   
    export default {
        name:'layout',
        components:{
            top,
            Navbar
        }
    }
</script>

<style scoped>
.app-wrapper{
    padding-top: 84px;

}
  .head{
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      height: 84px;
      z-index: 999;
  }
  .main-container{
/* 由两个子元素撑开 */
  display: flex;
      min-height: 1260px;

  }
  .main-container>div:nth-child(2){
      flex: 1;
      background-color: #F8F8FA;
      /* 右边部分不影响其他盒子也不被别人影响· */
      overflow: hidden;
  }
</style>