<template>
  <div class="container">
    <div class="logo">
      <img src="../../assets/images/bj@2x.png" alt />
    </div>
    <div class="login">
      <div style="color:rgb(91, 91, 241)">心理管理系统 心理测评</div>
      <img src="../../assets/images/logo@2x.png" alt />
      <template v-if="changeflag">
        <div>
          <input type="number" placeholder="输入手机号" name="phone" v-model="value" />
          <!-- 在数据库检查手机号是否存在，存在让客户输入密码。如果正确
          【登录成功之前数据库检查此账号有没有手机号，没有的话就提示弹窗输入手机号，
          有可能是学号登录的没有手机号，有手机号就直接测试不弹窗】就登录正确去测试，不正确找回密码，不存在就自动在数据库把手机号作为账号，密码是手机号 后6位在测试-->
          <input type="button" value="快捷登录" name="btn" @click="goindex($event)" />
          <div style="margin-top:80px">
            <el-button type="primary" round @click="sturegister">本校学生通道</el-button>
            <el-button type="success" round @click="gos">跳过直接测试</el-button>
          </div>
        </div>
      </template>
      <template v-else>
        <div>
          <input type="password" placeholder="输入密码" name="password" v-model="password" />
          <span>输入密码：默认手机后六位</span>

          <!-- <input type="text" name="yzm" placeholder="验证码" v-model="yzm" />
            <span class="yPicture" @click="getyzm">
              <img :src="imgurl" alt ref="yzmimg" />
          </span>-->
          <div style="margin-top:80px">
            <el-button type="primary" round @click="gotest">登录测试</el-button>
            <el-button type="success" round @click="forgetpass">忘记密码</el-button>
          </div>
        </div>
      </template>
      <el-dialog
        title="您还没有留下联系方式，请在下方仔细填写，如需修改请联系管理员"
        :visible.sync="dialogVisible"
        width="98%"
        :before-close="handleClose"
      >
        <el-input v-model="name" autocomplete="off"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="nosavephone">取 消</el-button>
          <el-button type="primary" @click="savephone">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import md5 from "blueimp-md5";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      name: this.$route.query.name,
      id: this.$route.query.id,
      flag: true,
      // 手机号工号，密码
      value: "",
      changeflag: true,
      name: "",
      dialogVisible: false,
      username: "",
      password: "",
      yzm: "",
      key: "",
      imgurl: ""
    };
  },
  created() {
    if (localStorage.getItem("phone")) {
      this.value = localStorage.getItem("phone");
    }
    if (Cookies.get("userToken")) {
      console.log(11111111);
      this.$router.push({
        path: "/studentindex/caleindex",
        query: { id: this.id, name: this.name }
      });
    }
  },
  methods: {
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
    checkstr(event) {},
    handleClose() {},
    gos() {
      // 去测试界面，测完可以再回来便捷注册，测试界面加便捷通道注册
      this.$router.push({
        path: "/studentindex/caleindex",
        query: { id: this.id, name: this.name }
      });
    },
    sturegister() {
      // 去注册界面
      this.$router.push({
        path: "/register",
        query: { id: this.id, name: this.name }
      });
    },
    nosavephone() {
      this.dialogVisible = false;

      this.$router.push({
        path: "/studentindex/caleindex",
        query: { id: this.id, name: this.name }
      });
    },
    savephone() {
      // 如果没有手机信息把预留的手机号保存在数据库中后再进入测试界面
      this.$router.push({
        path: "/studentindex/caleindex",
        query: { id: this.id, name: this.name }
      });
    },
    gotest() {
      // 和后台匹配看看账户密码是否正确，还要检查是否存在手机号码，都成立立马测试环节，如果密码正确没有手机号需要弹窗填手机号保存在测试，也可以选择不填手机号直接测试
      // this.$router.push({
      //   path: "/studentindex/caleindex",
      //   query: { id: this.id, name: this.name }
      // });
      // 登录后检查加入么有手机号让他加手机号省略
      // this.dialogVisible = true;
      //  假如有手机号让他直接测试界面
      var pass;
      pass = md5(this.password);
      console.log(this.value, this.password);
      var that = this;
      this.axios
        .post("/api/v1/admin/login", {
          account: this.value,
          pwd: pass
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            var token = res["data"]["data"]["token"];
            var role = res["data"]["data"]["role"];
            var logo = res["data"]["data"]["setting"];
            localStorage.setItem("rolename", role.phone);
            Cookies.set("userToken", token, 86400);
            Cookies.set("role", role, 86400);
            Cookies.set("logo", that.logo, 86400);
            that.$store.commit("setToken", {
              token: token,
              role: role,
              logo: logo
            });
            that.$store.commit("getToken");
            that.$message("登录成功");
            // 判断有没有存储的答案
            console.log(that.$route.query.islogin)
            if (that.$route.query.islogin) {
              if (localStorage.getItem("answer")) {
                that.subanswer(JSON.parse(localStorage.getItem("answer")));
                return;
              }
            }

            // 传量表id 和量表名
            that.$router.push({
              path: "/studentindex/caleindex",
              query: { id: that.id, name: that.$route.query.name }
            });
          } else {
            that.$message(res.data.msg || "登录失败");
          }
        });
    },
    forgetpass() {
      this.$message("请联系学校管理员修改密码重置");
    },
    subanswer(params) {
      var that = this;
      this.axios.post("/api/v1/scale/submitAnswer", params).then(res => {
        if (res["data"]["code"] == 0) {
          localStorage.setItem("scaleresult", JSON.stringify(res.data.data));
          that
            .$alert("<strong>" + "提交成功查看结果吗" + "</strong>", "提示", {
              dangerouslyUseHTMLString: true
            })
            .then(() => {
              if (localStorage.getItem("is_visible") == 1) {
                that.$router.push({
                  path: "/studentindex/caleresult",
                  query: {
                    starttime: that.$route.query.starttime,
                    name: that.$route.query.name,
                    id: that.$route.query.id
                  }
                });
              } else {
                that.$message("该量表结果不可见，请联系管理员");
              }
            });
        } else {
          that.$message(res["data"]["msg"]);
        }
      });
    },

    goindex(event) {
      localStorage.setItem("phone", this.value);
      console.log(this.value.substr(this.value.length - 6));

      var reg = /^1\d{10}$/;
      var str = this.value;
      console.log(this.value, reg.test(str));
      this.flag = reg.test(str);
      if (this.flag) {
        $('input[name="btn"]').css("backgroundColor", "blue");
      } else {
        alert("手机号码格式错误,重新输入");
        this.flag = false;
      }
      var that = this;
      if (this.flag) {
        $('input[name="btn"]').css("backgroundColor", "blue");
        console.log(
          "可以发送请求看手机号是否存在，存在显示输入密码界面。不存在就接口自动注册成功进入测试界面"
        );
        //15378962305
        this.axios
          .post("/api/v1/user/simpleRegister", {
            phone: this.value
          })
          .then(res => {
            if (res.data.code == 0) {
              // 说明注册成功。输入密码在登录
              that.changeflag = false;
              var phone = localStorage.getItem("phone");
              that.password = phone.substr(phone.length - 6);
            } else {
              // 说明手机号存在或者别的情况让他进入登录输入密码
              that.changeflag = false;
              var phone = localStorage.getItem("phone");
              that.password = phone.substr(phone.length - 6);
            }
            console.log(res);
          });
      }
      $(function() {
        var flag;
        $('input[name="phone"]').blur(function() {
          // var reg = /^1\d{10}$/
          // var str = this.value
          // console.log(str)
          // flag = reg.test(str)
          // if (flag) {
          //     $('input[name="btn"]').css("backgroundColor", "blue")
          // } else {
          //     alert("手机号码格式错误,重新输入")
          //     flag =false
          // }
          // $('input[name="btn"]').click(function () {
          //     if (flag) {
          //         $('input[name="btn"]').css("backgroundColor", "blue")
          //         console.log("可以发送请求")
          //         $.ajax({
          //             type: "GET",
          //             url: "/api/v1/admin/tool/select/college",
          //             //  data: {username:$("#username").val(), content:$("#content").val()},
          //             dataType: "json",
          //             headers: {
          //                 'X-Token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFjY291bnQiOiJhZG1pbiIsInVpZCI6MTk1MSwidHlwZSI6MSwiYXV0aF9pZCI6MCwiY29sbGVnZV9pZCI6MH0sImlhdCI6MTU2NzQwODM3MCwiZXhwIjoxNTY3NDk0NzcwfQ.SUB5P8rgeHzE8FJeRhMmmGxJ7YhUGg6qMQcey-4xuek",
          //             },
          //             success: function (data) {
          //             }
          //         });
          //         // window.location.href = "./index.html"
          //                       that.$router.push({path:'/studentindex/caleindex',query:{id:this.id,name:this.name}})
          //     }
          // })
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f7f8fe;
}
.container {
  height: 100%;
  // width: 100%;
  // min-width: 768px;
  max-width: 768px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  .logo {
    height: 100%;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .login {
    width: 275px;
    height: 143px;
    padding: 0 5px;
    position: absolute;
    top: 30%;
    width: 100%;
    text-align: center;
    color: rgb(211, 211, 211);

    img {
      width: 43px;
      height: 46px;
    }

    input[name="phone"],
    input[name="password"] {
      height: 30px;
      width: 240px;
      display: block;
      margin: 10px auto;
      border: none;
      border-bottom: 1px solid rgb(191, 191, 191);
      //    line-height: 63px;
      text-align: center;
      background-color: transparent;
      margin-top: 120px;
      font-size: 25px;
    }
    input[name="yzm"] {
      height: 50px;
      width: 100px;
      padding: 0 5px;
      font-size: 12px;
    }
    .yPicture {
      display: inline-block;
      height: 50px;
      vertical-align: bottom;
      margin-right: 2px;
      width: 110px;
      font-size: 12px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
    }
    input[name="btn"] {
      display: block;
      margin: 0 auto;
      margin-top: 55px;
      width: 240px;
      height: 40px;
      border-radius: 20px;
      background-color: #a4a4a4;
      font-size: 20px;
      color: rgb(91, 91, 241);
      border: none;
    }
  }
}
</style>