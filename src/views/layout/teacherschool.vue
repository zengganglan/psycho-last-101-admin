<template>
  <div class="scrren">
    <!-- 初始页面 -->
    <div class="top1">
      <!-- <div class="left">
        <img src="../../assets/2018-12-28_153635.png" alt style="width:50px;height:50px;">
      </div> -->
      <div class="right">
        <div class="help">
          <span>{{role.name}}</span>
          <i>&nbsp;使用帮助</i>
        </div>
        <div class="dear">亲爱的{{role.name}},欢迎登陆心理管理系统</div>
        <div class="btn">点击下方磁片。快捷进入相应的办公界面</div>
      </div>
    </div>
    <div class="box">
      <div class="box1">
        <div class="box11">
          <h4>通知</h4>
          <p>&nbsp;&nbsp;   你们好本土化、多维度的专业生涯测评，帮助学生选择合适的专业领域本土化、多维度的专业生涯测评，帮助学生选择合适的专业领域</p>
        </div>
        <div class="box22">
          <div class="a1" @click="first1">
            <span class="iconfont icon-renyuanguanli font"></span>
            人员管理
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="box33" style="background-color: #BDD8E1" @click="first2">
          <span class="iconfont icon-baobei font"></span>
          测评中心
        </div>
        <div class="box33" style="background-color: #CEBCE4" @click="first3">
          <span class="iconfont icon-zixun font"></span>咨询中心
        </div>
        <div class="box33" style="background-color: #E8C1BA" @click="first4">
          <span class="iconfont icon-dangan font"></span>数据中心
        </div>
        <div class="box33" style="margin-right:0;background-color: #BED1E2" @click="first5">
          <span class="iconfont icon-weijibaogao font"></span>文章管理
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// $(function(){
//     $(".box11 .b1").mouseover(function(){
//      $(this).css({transform: 'rotateY(180deg)', transition: "all 1s ease" })
//      }).mouseout(function(){
//      $(this).css({transform: 'rotateY(0deg)', transition: "all 1s ease" })
//      })
//      $(".box22").mouseover(function(){
//      $(".a1").css({top: '-110px', transition: "all 1s ease" })
//      $(".a2").css({top: '0px', transition: "all 1s ease" })

//      }).mouseout(function(){
//            $(".a1").css({top: '0px', transition: "all 1s ease" })
//           $(".a2").css({top: '110px', transition: "all 1s ease" })

//      })
// })
export default {
  data() {
    return {
      role: ''
    }
  },
   mounted(){
       var role = this.$store.state.userInfo;
    if (typeof role == "string") {
      role = JSON.parse(role);
    }
    this.role = role;
   },
  methods: {
   first1(){

       this.$router.push({path:"/admin/Groupsettings"})
   },
    first2(){
       this.$router.push({path:"/Gauge/alltest"})
   },
    first3(){
       this.$router.push({path:"/Consultation/appointment"})
   },
    first4(){
       this.$router.push({path:"/data/vrdata/presentation"})
   },
    first5(){
       this.$router.push({path:"/artical/column"})
   }
  },
};
</script>

<style lang="scss" scoped>
.top1 {
  height: 112px;
  //  border-bottom: 1px solid #BDC0C3;
  padding-left: 24px;
  padding-top: 18px;
  background-color: #ffffff;
  box-shadow: #bdc0c3 1px 1px 10px;
  > .left {
    display: inline-block;
    width: 75px;

    text-align: center;
  }
  > .right {
    display: inline-block;
    > .help {
      margin-bottom: 10px;
      > span {
        margin-right: 40px;
      }
    }
    > .dear {
      margin-bottom: 10px;
    }
    > .btn {
      background-color: #fff;
    }
  }
}
.font {
  font-size: 50px;
}
.box {
  padding-left: 20px;
  margin: 70px;
  color: #fff;
  > .box1 {
    position: relative;
    display: flex;
    height: 362px;
    > .box11 {
      cursor: pointer;
      float: left;
      height: 100%;
      width: 300px;
      background-color: #D8DAD9;
      flex: 3;
    h4{
      text-align: center;
      margin: 50px 0;
      font-size: 30px
      
    }
      p{

          width: 80%;
          margin: 0 auto;
          font-size: 20px;
      }
    }
    > .box22 {
      cursor: pointer;
      position: relative;
      float: left;
      height: 100%;
      width: 300px;
      margin-left: 10px;
      background-color: #BDD8E1;
      overflow: hidden;
      flex: 1;
      text-align: center;
      line-height: 362px;
      font-size: 30px;
      > .a1,
      .a2 {
        width: 100%;
        height: 110px;
      }
      > .a1 {
        position: absolute;
        top: 0;
      }
      > .a2 {
        position: absolute;
        top: 110px;
      }
    }
  }
  > .box2 {
    margin-top: 15px;
    height: 230px;
    display: flex;
    font-size: 30px;

    > .box33 {
      height: 100%;
      float: left;
      margin-right: 10px;
      background-color: #0099cc;
      cursor: pointer;
      flex: 1;
      line-height: 230px;
      text-align: center;
      span{
        margin-right: 15px;
      }
     
    }
  }
}
</style>