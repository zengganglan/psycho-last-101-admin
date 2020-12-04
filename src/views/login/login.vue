<template>
  <div class="login">
    <!-- <span v-if="$store.state.logo">111</span> -->

    <div :class="['head',$store.state.token?'loginhead':'headbac']">
      <div class="top1">
        <div class="title" v-if="$store.state.token">
          <img v-if="$store.state.logo" :src="$store.state.logo" alt />
          <img v-else src="../../assets/images/e2a51aafad9aa42d23ca511382c1784.png" alt />

          <span v-if="role['sf']!==1">{{role['college_name']}}心理系统</span>
        </div>
        <ul>
          <li ref="soli1" @click.stop="first" @mouseover.stop="first" @mouseout="mouse">首页</li>
          <li ref="soli" @click.stop="gocale" @mouseover.stop="gocale" @mouseout="mouse">量表</li>
          <li
            class="soli"
            ref="soli"
            v-for="(item,index) in  $store.state.columns"
            :key="index"
            v-if="index<5"
            @click.stop="cli($event,item.id,index)"
            @mouseover.stop="cli($event)"
            @mouseout="mouse"
          >{{item.name}}</li>
          <li
            ref="soli2"
            @click.self="first"
            @mouseover.self="first"
            @mouseout="mouse"
            v-show="$store.state.columns.length>=5"
          >
            <span>更多</span>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <!-- 更多 -->
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-plus"
                  v-for="(item,index) in  $store.state.columns"
                  :key="index"
                  v-if="index>=5"
                  :command="item.id"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="banner">
      <div v-if="!$store.state.token">
        <img
          src="../../assets/images/15dec97a7f32eeef8008fa21e520764.png"
          alt
          style="width:100%"
          v-if="!$store.state.token"
        />
      </div>
      <el-carousel :interval="5000" arrow="always" height="800px" v-else>
        <el-carousel-item>
          <img src="../../assets/images/p1.jpg" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../assets/images/p2.jpg" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../assets/images/p3.jpg" alt />
        </el-carousel-item>
        <!-- <el-carousel-item>
          <img src="../../assets/images/4.png" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../assets/images/6.png" alt />
        </el-carousel-item>-->
      </el-carousel>
      <template v-if="$store.state.loginsucess">
        <form action class="loginform">
          <label class="f1">
            用户名：
            <input type="text" name="user" ref="user" placeholder="请输入用户名" v-model="username" />
          </label>
          <br />
          <label class="f2">
            密 &nbsp; 码：
            <input
              type="password"
              name="password"
              ref="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </label>
          <br />
          <label class="f3">
            验证码：
            <input type="text" name="yzm" placeholder="验证码" v-model="yzm" />
            <span class="yPicture" @click="getyzm">
              <img :src="imgurl" alt ref="yzmimg" />
            </span>
            <span class="changeimg" @click="getyzm">换一张</span>
          </label>
          <br />

          <label class="f4">
            <input type="checkbox" name="rember" ref="rember" />记住密码&nbsp;&nbsp;&nbsp;
            <router-link tag="a" to="/register">注册</router-link>&nbsp;
            <!-- <router-link tag="a" to="/getUserPassword">忘记密码</router-link> -->
          </label>
          <br />
          <el-button type="primary" plain class="start" @click="login">马上开始</el-button>

          <!-- <input type="button" name="start" value="马上开始" @click="login" /> -->
        </form>
      </template>
      <template v-else>
        <div class="loginsucess">
          <div class="longinhead">
            <span>心理咨询管理系统</span>
            <i @click="logincout">[注销登陆]</i>
          </div>
          <div class="loginbody">
            <div class="left">
              <img src alt />
            </div>
            <div class="right">
              <ul>
                <li v-if="role['sf']!==1">学校：{{role['college_name']}}</li>
                <li>
                  账号：
                  <i>{{role['name']}}</i>
                </li>
                <li>
                  身份：
                  <i v-if="role['type']==1 && role['college_name']">校级超级管理员</i>
                  <i v-else-if="role['type']==1">总超级管理员</i>
                   <i v-else-if="role['type']==3">学生用户</i>
                  <i v-else>普通管理员</i>
                </li>
              </ul>
            </div>
          </div>
          <el-button type="primary" plain class="loginout" @click="goindex">进入系统</el-button>
        </div>
      </template>
    </div>
    <!-- 底部 -->
    <div class="bottom" v-if="$store.state.token">
      <div class="a1">
        <div class="sons">
          <ul class="son">
            <li
              class="soli"
              v-for="(item,index) in  $store.state.columns"
              :key="index"
              @click="goArtical(item.id,index)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import $ from "jquery";
import { type } from "os";
import md5 from "blueimp-md5";
import { log } from "util";

$(function() {
  // $(".top2>ul:nth-child(1)")
  //   .siblings()
  //   .addClass("hidden");
  // $(".top2").css({ backgroundColor: "#0688C6", opacity: "0.6" });
  //    $(".top1>ul>li")
  //   .each(function(index) {
  //     $(this).attr("index", index);
  //   })
  //   .bind("click",function() {
  //     $(this).unbind("mouseout")
  //      $(".top1>ul>li").css({
  //       position: "relative",
  //       bottom: "0px",
  //       transition: "all 1s ease",
  //       backgroundColor: "",
  //       color: "",
  //       borderBottom: ""
  //     });
  //     $(this).css({
  //       position: "relative",
  //       bottom: "20px",
  //       backgroundColor: "#aeaeae",
  //       transition: "all 1s ease",
  //       color: "#fff",
  //       borderBottom: "1px solied #fff"
  //     });
  //   })
  // $(".top1>ul>li")
  //   .each(function(index) {
  //     $(this).attr("index", index);
  //   })
  //   .mouseover(function() {
  //     $(this).css({
  //       position: "relative",
  //       bottom: "20px",
  //       backgroundColor: "#aeaeae",
  //       transition: "all 1s ease",
  //       color: "#fff",
  //       borderBottom: "1px solied #fff"
  //     });
  //     var index = $(this).attr("index");
  //     index = index - 0 + 1;
  //     $(".top2>ul:nth-child(" + index + ")")
  //       .removeClass("hidden")
  //       .siblings()
  //       .addClass("hidden");
  //   })
  //   .mouseout(function() {
  //     $(this).css({
  //       position: "relative",
  //       bottom: "0px",
  //       transition: "all 1s ease",
  //       backgroundColor: "",
  //       color: "",
  //       borderBottom: ""
  //     });
  //   });
});

export default {
  data() {
    //拿到值检测是否合法返回数值供组件调用
    return {
      username: "",
      password: "",
      yzm: "",
      key: "",
      // loginsucess: true,
      role: "",
      sf: "",
      imgurl: "",
      logo: ""
    };
  },
  computed: {
    gettoken() {
      return this.$store.state.token;
    }
  },
  watch: {
    // gettoken() {
    //   this.$router.go(0);
    // }
  },
  created() {
    // 如果保存过cookie,页面刷新会获取到上一次登录留下的用户名和密码选着记住才保存的cookie
    this.$store.commit("getToken");
    this.getinfo();
    // 页面刷新获取验证码
    this.getyzm();
    // console.log(this.$store.state.userInfo,this.$store.state.token,this.$store.state.loginsucess);
    var role = this.$store.state.userInfo;
    if (typeof role == "string") {
      role = JSON.parse(role);
    }
    this.role = role;
    console.log(this.role);
  },
  mounted() {
    // console.log(this.$store.state.loginsucess, this.sf);
    console.log(this.$refs.soli1);
    this.$refs.soli1.style.cssText =
      "position: relative;bottom: 0px; background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
  },
  methods: {
    getlist(currentPage, pagesize) {
      var that = this;
      this.axios
        .post("/api/v1/admin/article/column/list", {
          page: currentPage,
          size: pagesize
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            //  2 20  (a-1)*20+1----
          } else {
          }
        });
    },
    //点击登陆拿到数据判断用户对象，根据用户对象跳转学生页面还是老师页面，陈用户信息存到store里面以便其他的组件需要
    //点第一次登陆保存cookie.可以做登陆拦截，不管又没么有点击记住密码cookie都会有值，都能获取到，所以只能保存到本地储存。
    login() {
      var that = this;
      //点击触发事件匹配输入框正则，在给后台提交获得的信息返回结果看是否登陆成功 登陆成功就设置cookie放到vuex里面
      var pass;
      pass = md5(this.password);
      let data = {
        account: this.username,
        pwd: this.password,
        code: this.yzm
      };
      console.log(data, this.key);
      if (!this.username || !this.password || !this.yzm) {
        alert("请输入用户名或密码或验证码");
      } else {
        /*接口请求 ,返回结果应该有用户类型，和具体用户信息userid 是否可以登陆成功信息*/
        this.axios
          .post("/api/v1/admin/login", {
            account: this.username,
            pwd: pass,
            code: this.yzm,
            key: this.key
          })
          .then(function(res) {
            // 如果为0 就是正常返回
            console.log(res["data"]);
            if (res["data"]["code"] == 0) {
              var token = res["data"]["data"]["token"];
              var role = res["data"]["data"]["role"];
              that.role = role;
              var logo = res["data"]["data"]["setting"];
              if (logo) {
                if (logo["logo"]) {
                  that.logo = logo["logo"];
                }
              }
              if (role["type"] == 1) {
                if (role["college_name"]) {
                  // 学校超管？注册时一定会选学校
                  that.role.ty = 1.1;
                } else {
                  //  总超管
                  that.role.sf = 1;
                }
              } else if (role["type"] == 2) {
                // 学校普通管理员
                that.role.sf = 2;
              }
              Cookies.set("userToken", token, 86400);
              Cookies.set("role", role, 86400);
              Cookies.set("logo", that.logo, 86400);
              //  每一次登录把token放到vuex的数据管理库里面，设置后就可以取到token
              console.log(role);
              that.$store.commit("setToken", {
                token: token,
                role: role,
                logo: that.logo
              });
              that.$store.commit("getToken");
              //第一次登陆检查有没有选择记住密码，如果选择就把用户登陆信息和密码同时放到cookie里面或则放到本地存储
              var checked = that.$refs.rember.checked;
              if (checked) {
                Cookies.set("username", that.username);
                Cookies.set("password", that.password);
              }
                            that.$store.commit("column");

              // 登录成功返回个人用户信息判断是学生还是管理员
              if (role["type"] == 1 || role["type"] == 2 || role["type"] == 3) {
                //只有管理员返回成功出现弹窗。可以点击进入系统/跳转相关页面
                that.$store.state.loginsucess = false;
              } 
            } else {
              // 登录不成功刷新验证码
              alert(res["data"]["msg"]);
              that.getyzm();
              // 不为0弹出错误信息
            }
          })
          .catch(function(err) {
            console.log(err);
            that.imgurl = "";
          });
      }
    },
    //页面刷新调用的方法：自动获取本地存储的用户名和密码，自动添加到data里面进行赋值
    getinfo() {
      var username = Cookies.get("username");
      var password = Cookies.get("password");
      this.username = username;
      this.password = password;
    },
    goindex() {
      // 判断是还是普通管理员还是超级管理员
      var role = JSON.parse(Cookies.get("role"));
      if (role["type"] == 1) {
        if (role["college_name"]) {
          // 学校超管？注册时一定会选学校
          this.$router.push({ path: "/admin/teacherindex/teacherschool" });
        } else {
          //  总超管
          this.$router.push({ path: "/school/localadminschool" });
        }
      } else if (role["type"] == 2) {
        // 学校普通管理员
        this.$router.push({ path: "/admin/teacherindex/teacherschool" });
      }else if (role["type"] == 3) {
        // 学校普通管理员
         this.$router.push({
                  path: "/Evaluation/survey"
                });
      }
    },
    getyzm() {
      var that = this;
      this.axios
        // 缓存机制的问题
        .get("/api/v1/verify?v=" + Math.random(10))
        .then(function(res) {
          console.log(res);
          if (res.status == 200) {
            that.key = res["data"]["data"]["key"];
            that.imgurl = res["data"]["data"]["imgSrc"];
            console.log(that.imgurl);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 只是前段登出 后台没接收到销毁的token
    logincout() {
      Cookies.set("userToken", "");
      this.$store.commit("setToken", "");
      this.$store.state.columns=''
      this.$store.state.loginsucess = true;
      this.getyzm();
    },
    mouse(event) {
      var target = event.target;
      target.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';
    },
    first(event) {
      if (event.type == "click") {
        this.$router.push({ path: "/login" });
      }
      if (this.$store.state.token) {
        this.$refs.soli.map(item => {
          item.style.cssText =
            'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';
        });
        this.$refs.soli2.style.cssText =
          'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';
      }

      this.$refs.soli1.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';
      event.target.style.cssText =
        "position: relative;bottom: 20px; background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
    },

    cli(event, id, index) {
      if (this.$store.state.token) {
        this.$refs.soli.map(item => {
          item.style.cssText =
            'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';
        });
        this.$refs.soli2.style.cssText =
          'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';
      }

      this.$refs.soli1.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';

      if (event.type == "click") {
        this.$router.push({
          path: "/studentindex/gpartical",
          query: { id: id, index: index }
        });
        event.target.style.cssText =
          "position: relative;bottom: 0px; background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
      } else {
        event.target.style.cssText =
          "position: relative;bottom: 20px; background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
      }
    },
    handleCommand(command) {
      this.$router.push({
        path: "/studentindex/gpartical",
        query: { id: command }
      });
    },
    goArtical(id, index) {
      this.$router.push({
        path: "/studentindex/gpartical",
        query: { id: id, index: index }
      });
    },
    gocale() {
      if (event.type == "click") {
        this.$router.push({ path: "/studentindex/gocale" });
      }
      if (this.$store.state.token) {
        this.$refs.soli.map(item => {
          item.style.cssText =
            'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';
        });
        this.$refs.soli2.style.cssText =
          'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: #00CBA3;border-bottom: "";';
      }

      this.$refs.soli1.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color:#00CBA3;border-bottom: "";';

      event.target.style.cssText =
        "position: relative;bottom: 20px; background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
    }
  }
};
</script>

<style lang="scss" scoped>
.headbac {
  background-color: rgb(19, 18, 18);
  opacity: 0.6;
  position: absolute;
}
.loginhead {
  background-color: #fff;
  position: relative;
}
.box1 {
  .loginform {
    width: 325px;
    height: 285px;
    top: 80px;
    position: absolute;
    right: 170px;
    top: 150px;
    background: #ffffff;
    color: #9c9c9c;
    width: 295px;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 4;
    .type {
      display: inline-block;
      width: 100%;
      .selects {
        height: 30px;
        width: 215px;
        padding: 0 5px;
      }
    }
    .f1 {
      display: inline-block;
      width: 100%;
      margin-top: 20px;
      input[name="user"] {
        height: 30px;
        width: 200px;
        padding: 0 5px;
      }
    }
    .f2 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      input[name="password"] {
        height: 30px;
        width: 200px;
        padding: 0 5px;
      }
    }
    .f3 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      input[name="yzm"] {
        height: 50px;
        width: 50px;
        padding: 0 5px;
        font-size: 12px;
      }
      .yPicture {
        display: inline-block;
        height: 50px;
        vertical-align: bottom;
        margin-right: 2px;
        width: 100px;
        font-size: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        cursor: pointer;
      }
    }
    .f4 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      text-align: center;
      a {
        color: #9c9c9c;
        font-size: 12px;
      }
    }
    .input {
      margin-top: 20px;
      -webkit-appearance: none;
      width: 100%;
      height: 40px;
      font-size: 18px;
      border-radius: 5px;
      background: #adadad;
      border: 0;
      color: #ffffff;
      font-family: "microsoft yahei";
      cursor: pointer;
    }
  }
}
.head {
  width: 100%;
  height: 60px;
  // position: absolute;

  z-index: 4;
  > .top1 {
    position: relative;
    height: 60px;
    text-align: center;

    .title {
      display: inline-block;
      text-align: center;
      position: absolute;
      height: 60px;
      line-height: 60px;
      left: 5px;
      > span {
        font-size: 30px;
        font-weight: 800;
        color: #00cba3;
      }
      > img {
        height: 50px;
        width: 50px;
        vertical-align: middle;
        position: relative;
        top: -10px;
      }
    }

    > ul {
      height: 30px;
      position: absolute;
      bottom: 10px;
      right: 50px;
      > li {
        float: left;
        width: 100px;
        margin-right: 4px;
        // border:1px solid #00CBA3;
        box-shadow: 2px 0px 5px 2px #00cba3;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #00cba3;
        border-radius: 10px;
        cursor: pointer;

        // border: 1px solid #66676b;
      }
      // > li:nth-child(1) {
      //   background-color: #0688c6;
      // }
      // > li:nth-child(2) {
      //   background-color: #f7bc3a;
      // }
      // > li:nth-child(3) {
      //   background-color: #6ed2f2;
      // }
      // > li:nth-child(4) {
      //   background-color: #f5868f;
      // }
      // > li:nth-child(5) {
      //   background-color: #6dc0b8;
      // }
      // > li:nth-child(6) {
      //   background-color: #b9696c;
      // }
      // > li:nth-child(7) {
      //   background-color: #09c39c;
      // }
    }
  }
  > .top2 {
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: center;
    opacity: 0.6;
    height: 50px;
    > ul {
      position: absolute;
      right: 50px;
      width: 784px;
      background-color: #aeaeae;
      border-radius: 10px;

      > li {
        width: 100px;
        float: left;
        text-align: center;
        line-height: 50px;
      }
    }
  }
}
.show {
  display: block;
}
.hidden {
  display: none;
}

.banner {
  position: relative;
  background-color: #d4d8d7;
  // top: -60px;
  .loginform {
    width: 325px;
    height: 285px;
    top: 80px;
    position: absolute;
    right: 170px;
    top: 150px;
    background: #ffffff;
    color: #9c9c9c;
    width: 295px;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 4;
    .type {
      display: inline-block;
      width: 100%;
      .selects {
        height: 30px;
        width: 215px;
        padding: 0 5px;
      }
    }
    .f1 {
      display: inline-block;
      width: 100%;
      margin-top: 20px;
      input[name="user"] {
        height: 30px;
        width: 200px;
        padding: 0 5px;
      }
    }
    .f2 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      input[name="password"] {
        height: 30px;
        width: 200px;
        padding: 0 5px;
      }
    }
    .f3 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      input[name="yzm"] {
        height: 50px;
        width: 50px;
        padding: 0 5px;
        font-size: 12px;
      }
      .yPicture {
        display: inline-block;
        height: 50px;
        vertical-align: bottom;
        margin-right: 2px;
        width: 100px;
        font-size: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        cursor: pointer;
      }
    }
    .f4 {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      text-align: center;
      a {
        color: #9c9c9c;
        font-size: 12px;
      }
    }
    .start {
      margin-top: 20px;
      -webkit-appearance: none;
      width: 100%;
      height: 40px;
      font-size: 18px;
      border-radius: 5px;
      // background: #adadad;
      border: 0;
      // color: #ffffff;
      font-family: "microsoft yahei";
      cursor: pointer;
    }
  }
  .loginsucess {
    width: 325px;
    height: 200px;
    top: 90px;
    position: absolute;
    right: 170px;
    top: 150px;

    background: #ffffff;
    color: #9c9c9c;
    width: 295px;
    padding: 10px 0;
    border-radius: 5px;
    z-index: 4;
    .longinhead {
      height: 30px;
      border-bottom: 1px solid #fff;
      padding: 0 10px;
      i {
        float: right;
        color: #e8a717;
      }
    }
    .loginbody {
      height: 120px;
      .left {
        width: 100px;
        float: left;
      }
      .right {
        float: left;
        line-height: 40px;
      }
    }
    .loginout {
      height: 40px;
      width: 80%;
      margin-left: 27px;
      text-align: center;
      border-radius: 10px;
    }
  }
}

.el-carousel__item img {
  height: 100%;
  width: 100%;
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 410px;
  margin: 0;
}

.bottom {
  position: relative;
  width: 100%;
  .a1 {
    padding-top: 75px;
    min-height: 500px;
    background-color: #ffff;

    .tit {
      text-align: center;
      width: 100%;
      margin: 0 auto;
      margin-top: 20px;
      height: 76px;
      position: relative;
      width: 400px;
      text-align: center;
      height: 150px;
      background: url("../../assets/images/未标题-1_0001_图层-3.png") no-repeat
        100% 100%;
      background-size: cover;
      span {
        position: relative;
        top: 20px;
        left: -15px;
        font-size: 16px;
      }
    }
    .sons {
      // 210+20 *7
      overflow: hidden;
      position: relative;
      width: 1320px;
      margin: 0 auto;
      padding: 0 20px;
      .son {
        // position: relative;
        // overflow: hidden;
        // left: 0;
        // top: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        li {
          float: left;
          width: 200px;
          height: 250px;
          line-height: 300px;
          text-align: center;
          padding-top: 25px;
          text-align: center;
          background: #bdd8e1;
          margin: 0 10px;
          margin-top: 10px;
          color: #fff;
        }
        > li:nth-child(6n + 1) {
          background-color: #bdd8e1;
          background: url("../../assets/images/a.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 2) {
          background-color: #bed1e2;
          background: url("../../assets/images/b.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 3) {
          background-color: #e8c1ba;
          background: url("../../assets/images/c.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 4) {
          background-color: #cebce4;
          background: url("../../assets/images/d.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 5) {
          background-color: #d8dad9;
          background: url("../../assets/images/e.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 6) {
          background-color: #b1b5db;
          background: url("../../assets/images/f.png") no-repeat center center;
          background-size: cover;
        }

        li:hover {
          transform: rotateY(90deg);
          transition: All 0.5s ease;
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>