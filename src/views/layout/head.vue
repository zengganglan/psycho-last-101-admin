<template>
  <div>
    <div class="a1">
      <span class="logo">
          <img v-if="$store.state.logo" :src="$store.state.logo" alt />
         <img v-else src="../../assets/images/e2a51aafad9aa42d23ca511382c1784.png" alt />
      </span>
      <div class="a2">
        <div class="h-left">{{schoolname}}心理管理系统</div>
        <div class="h-right">
          <ul>
             <li>
              你好,
              <i>{{role.name}}</i>
              <!-- <el-popover
                placement="right"
                width="400"
                trigger="click"
                v-model="visible2"
                class="iconfont"
              >
                <div class="icon1">
                  <span class="iconfont icon-x" @click="visible2 = false"></span>
                </div>
                <div class="headimg">
                  <vueCropper
                    style="width: 60%;height: 260px;margin-left: 5%;margin-top: 15px"
                    ref="cropper"
                    :img="option.imgsrc"
                    :outputSize="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"
                  ></vueCropper>
                  <ul>
                    <li>
                      <input
                        style="margin-left: 20px;margin-top: 15px"
                        id="file_input"
                        type="file"
                        capture="camera"
                        ref="file_input"
                        @change="fileChange($event)"
                      >
                      <i @click="cutimg" class="choose">选择图片</i>
                    </li>
                    <li>
                      <input type="button" value="保存" @click="cutimg" class="cutimg">
                    </li>
                  </ul>
                  <div class="newimg">
                    <img :src="newimgsrc" alt>
                  </div>
                </div>
                <el-button slot="reference">
                  <img :src="newimgsrc" alt class="showimg">
                </el-button>
              </el-popover>-->
            </li>
            <li class="bor" @click="goIndex">
              <span class="iconfont icon-yemian"></span>
              首页
            </li>
            <li class="bor">
              <el-popover placement="top" width="500" v-model="visible1">
                <div class="a2">
                   <p style="text-align:center;font-size:20px;color:#409EFF;height:40px">站内消息</p>
                  <span class="iconfont icon-x" @click="visible1= false"></span>
                </div>
                <div class="contain">
                 

                  <el-tabs v-model="activeName2" type="card" :hidden="false">
                    <el-tab-pane label="收件箱" name="first">
                      <div class="mesg">
                        <el-select
                          v-model="filter"
                          slot="prepend"
                          placeholder="请选择"
                          size="large"
                          @change="change"
                        >
                          <el-option label="系统消息" value="1"></el-option>
                          <el-option label="用户消息" value="2"></el-option>
                        </el-select>
                        <div class="work">
                          <!-- <i @click="read">标记已读</i> -->
                           <el-button
                              size="mini"
                           
                              @click.stop="del"
                            >删除邮件</el-button>
                          <el-button
                              size="mini"
                              type="danger"
                              @click.stop="read"
                            >标记阅读</el-button>
                        </div>
                      </div>

                      <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        max-height="500"
                        @selection-change="handleSelectionChange"
                      >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column label="日期" width="120">
                          <template slot-scope="scope"><span style="font-size:12px;color:#409EFF">[{{scope.row.read}}]</span>{{ scope.row.create_time }}</template>
                        </el-table-column>
                        <el-table-column label="姓名" width="120">
                          <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="120"></el-table-column>
                        <!-- <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
                      </el-table>
                      <div class="pages">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="page.currentPage"
                          :page-sizes="[10, 20, 30, 40,50,60]"
                          :page-size="page.pagesize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="page.countpage"
                        ></el-pagination>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="发件箱" name="second">
                      <div class="work"></div>
                      <el-table
                        ref="multipleTable"
                        :data="tableData1"
                        tooltip-effect="dark"
                        style="width: 100%"
                        max-height="500"
                        @selection-change="handleSelectionChange1"
                      >
                        <el-table-column label="日期" width="120">
                          <template slot-scope="scope"><span style="font-size:12px;color:#409EFF">[{{scope.row.read}}]</span>{{ scope.row.create_time }}</template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
                        <!-- <el-table-column label="操作" width="160">
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              type="danger"
                              @click.stop="readSend(scope.row)"
                            >标记阅读</el-button>
                          </template>
                        </el-table-column> -->
                        
                      </el-table>
                      <div class="pages">
                        <el-pagination
                          @size-change="handleSizeChange1"
                          @current-change="handleCurrentChange1"
                          :current-page="page1.currentPage"
                          :page-sizes="[10, 20, 30, 40,50,60]"
                          :page-size="page1.pagesize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="page1.countpage"
                        ></el-pagination>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="撰写" name="third">
                      <span class="send" @click="sendmsg">发送</span>
                      <div>
                        接收者：
                        <el-input v-model="nameId" placeholder="输入接受者的ID,多人用逗号分隔"></el-input>
                      </div>
                      <div>
                        标题：
                        <el-input v-model="title" placeholder="请输入标题"></el-input>
                      </div>

                      <div>
                        内容：
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <el-button slot="reference">
                  <el-badge :value="page.countpage || null" :max="99" class="item">
                    <el-button size="small">
                      <span class="tx">
                        <span class="iconfont icon-yunpingtai_shouye-tixing"></span>
                        提醒
                      </span>
                    </el-button>
                  </el-badge>
                </el-button>
              </el-popover>
            </li>
            <!-- <li class="bor bor4">
              <span class="iconfont icon-bangzhu-"></span>
              <span class="help">帮助</span>
            </li>-->
           
            <li  class="bor">
              
              <span class="daochu" @click="first">退出</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { VueCropper } from "vue-cropper";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      role: "",

      // 上传头像
      option: {
        imgsrc: "", //裁剪图片的地址
        info: true, //裁剪框的大小信息
        outputSize: 0.7, // 裁剪生成图片的质量
        outputType: "jpeg", //裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        fixed: false, //是否开启截图框宽高固定比例
        fixedNumber: [4, 4] //截图框的宽高比例
      },
      status: "",
      cropper: false,
      newimgsrc: "",
      visible1: false,
      visible2: false,
      // 站内消息
      activeName2: "first",
      tableData3: [],
      tableData1: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 0,
        pagesize: 20,
        flag: false
      },
      multipleSelection: [],
      // 页码
      page1: {
        currentpage: 1,
        countpage: 0,
        pagesize: 20,
        flag: false
      },
      multipleSelection1: [],
      //  发送消息
      nameId: "",
      title: "",
      textarea: "",
      filter: "",
      schoolname:''
    };
  },
  mounted() {
    this.newimgsrc = this.$store.state.userInfo.name;
    var role = this.$store.state.userInfo;
    if (typeof role == "string") {
      role = JSON.parse(role);
       if (role.sf!==1) {
      this.schoolname=role['college_name']
    }
    }
    this.role = role;
    
  },
  created() {
    this.getmesage(this.page.currentpage, this.page.pagesize);
    this.sendmessage(this.page1.currentpage, this.page1.pagesize);
   
   
  },
 
  methods: {
    getmesage(currentpage, pagesize) {
      var that = this;
      this.axios
        .post("/api/v1/mail/list?filter=" + this.filter, {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
          var data = res["data"]["data"]["list"];
          data.map((item,index)=>{
             if (item['view_time']) {
                item['read']='已读'
             }else{
               item['read']='未读'
             }
           })
            that.tableData3=data
          that.page.countpage = res["data"]["data"]["total"];
        });
    },
    sendmessage(currentpage, pagesize) {
      var that = this;
      this.axios
        .post("/api/v1/admin/mail/list", {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
          that.tableData1 = res["data"]["data"]["list"];
          that.tableData1.map((item,index)=>{
             if (item['view_time']) {
                item['read']='已读'
             }else{
               item['read']='未读'
             }
           })
          that.page1.countpage = res["data"]["data"]["total"];
        });
    },
    change() {
      this.getmesage(this.page.currentpage, this.page.pagesize);
    },
    goIndex() {
      this.$router.push({ path: "/login" });
    },
    first() {
        Cookies.set("userToken", "");
      this.$store.commit("setToken", "");
      this.$store.state.loginsucess = true;
       this.$router.push({ path: "/login" });

    },
    fileChange(e) {
      var that = this;
      //上传图片
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onload = function(e) {
          that.option.imgsrc = e.target.result;
          // Indicator.close();
          console.log(that.option.imgsrc, e.target);
          // 开始裁剪
          that.cropper = true;
        };
      }
    },
    // 裁剪方法
    cutimg() {
      this.$refs.cropper.startCrop();
      this.$refs.cropper.getCropData(data => {
        this.newimgsrc = data;
        // 提交头像到后台，如果返回信息这弹出框成功

        //清除截图
        this.$refs.cropper.clearCrop();
        //  this.cropper=false;
      });
    },
    //站内消息

    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.getmesage(this.page.currentpage, this.page.pagesize);
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
      // this.sendmessage(this.page.currentpage, this.page.pagesize);
    },
    // 分页·
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.getmesage(this.page.currentpage, this.page.pagesize);
    },
    handleCurrentChange(val) {
      this.page.currentpage = val;
      this.getmesage(this.page.currentpage, this.page.pagesize);
    },
    // 分页·
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.page1.pagesize = val;
      this.sendmessage(this.page1.currentpage, this.page1.pagesize);
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.page1.currentpage = val;
      this.sendmessage(this.page1.currentpage, this.page1.pagesize);
    },
    sendmsg() {
      var that = this;
      this.axios
        .post("/api/v1/admin/mail/send", {
          receiver: this.nameId,
          title: this.title,
          content: this.textarea
        })
        .then(res => {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("发送成功");
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    del() {
      var ids = [];
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.map(item => {
          ids.push(item.id);
        });
      } else {
        this.$message("请至少选择一个删除文件");
        return;
      }
      var that = this;
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .post("/api/v1/mail/delete", { id: ids })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.getmesage(that.page.currentpage, that.page.pagesize);
                that.$message("删除成功");
              } else {
                that.$message(res["data"]["msg"]);
              }
            })
            .catch(err => {
              that.$message(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    read() {
      var ids = [];
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.map(item => {
          ids.push(item.id);
        });
      } else {
        this.$message("请至少选择一个阅读文件");
        return;
      }
      var that = this;
      this.axios
        .post("/api/v1/mail/read", { id: ids })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.getmesage(that.page.currentpage, that.page.pagesize);
            that.$message("已阅读");
          } else {
            that.$message(res["data"]["msg"]);
          }
        })
        .catch(err => {
          that.$message(err);
        });
    },
    readSend(row) {
      var id = row.id;
      var that = this;
      this.axios
        .get("/api/v1/admin/mail/read?id=" + id)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.getmesage(that.page.currentpage, that.page.pagesize);
            that.$message("已阅读");
          } else {
            that.$message(res["data"]["msg"]);
          }
        })
        .catch(err => {
          that.$message(err);
        });
    }
  },
  components: {
    VueCropper
  }
};
</script>

<style lang="scss" scoped>
.contain {
  .mesg {
    .work {
      float: right;
      span,
      i {
        background-color: #9e9ea8;
        color: #fff;
        padding: 3px;
        cursor: pointer;
      }
    }
  }
}
.daochu {
  cursor: pointer;
}
.a1 {
  height: 84px;
  box-shadow:0px 0px 10px 0.01px #00CBA3;
  // width: 100%;
  background-color: #fff;
  color: #00CBA3;
  .logo {
    float: left;
    width: 100px;
    // background-color: #9e9ea8;
    display: inline-block;
    height: 100%;
    text-align: center;
    line-height: 110px;
    // background: url('../../assets/images/301a8904d087c58856030b6d8e8d4f0.png') no-repeat ;
    img{
      width: 60px;
      height: 60px;
     margin-top: 10px;
    }
  }
  .a2 {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .h-left {
      height: 84px;
      min-width: 240px;
      line-height: 84px;
      font-size: 30px;
      color: #00CBA3;
      margin-left: 20px;
      letter-spacing: 10px;
      font-weight: 400;
    }
    .h-right {
      height: 100%;
      width: 550px;

      > ul {
        // float: right;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        > li {
          // padding: 0 30px;
          cursor: pointer;
          margin-right: 20px;
          text-align: center;
          width: 116px;

          span {
            font-size: 22px;
            vertical-align: center;
          }
          .icon-yemian {
            font-size: 18px;
          }
          .help {
            position: relative;
            top: -2px;
            font-size: 18px;
          }
        }
       li:nth-child(2){
                               border: 1px solid #00CBA3;

       }
        li:nth-child(3) {
          position: relative;
                                border: 1px solid #00CBA3;

          .tx {
            position: relative;
            top: -2px;
            font-size: 18px;
          }
          .el-button {
            background-color: #fff;
            position: absolute;
            border:none;
            top: 0;
            left: 2px;
            width: 114px;
            height: 38px;
            border-radius: 20px;
   color: #00CBA3;
            .el-button--small {
              position: relative;
              top: -12px;
              left: -20px;
              // height: 20px;
              // width: 60px;
              font-size: 18px;
            }
          }
        }

        li:nth-child(1) {
          font-size: 16px;
          margin-right: 0;
          position: relative;
          padding: 0;
          line-height: 20px;
          span {
            display: inline-block;

            .showimg {
              width: 60px;
              height: 60px;
              position: relative;
              top: -14px;
              left: -20px;
            }
          }

          .el-button {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: absolute;
            top: -8px;
            right: -60px;
            overflow: hidden;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #feffff;
            // .icon-rentouxiang{
            //     position: absolute;
            //     top:0
            // }
          }
        }
        li:nth-child(4) {
          padding: 0;
          border: 1px solid #00CBA3;
          span {
            font-size: 18px;
            display: inline-block;
            height: 30px;
            width: 50px;
            // background: url("../../assets/images/tc.png") no-repeat;
            background-size: contain;
            position: relative;
            top: -3px;
            right: 5px;
            color: #00CBA3;
          }
        }
      }
    }
  }
}
.a2 {
  position: relative;
  height: 30px;
  .icon-x {
    position: absolute;
    top: -10px;
    right: 0;
    color: #5b85ab;
    font-weight: 800;
  }
}
.bor {
  border-radius: 20px;
  border: 1px solid #fff;
}
.headimg {
  ul {
    width: 65%;
    display: flex;
    justify-content: space-between;
    li:nth-child(1) {
      position: relative;

      input[type="file"] {
        opacity: 0;
        width: 100px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
        z-index: 3;
      }
      .choose {
        display: inline-block;
        background-color: #a4c2ff;
        width: 100px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        margin-left: 20px;
        margin-top: 15px;
        line-height: 30px;
        text-align: center;
        border-radius: 20px;
      }
    }
    li:nth-child(2) {
      position: relative;
      .cutimg {
        background-color: #a4c2ff;
        width: 100px;
        height: 30px;
        margin-top: 15px;
        line-height: 30px;
        text-align: center;
        border-radius: 20px;
      }
    }
  }
  .newimg {
    position: absolute;
    top: 60px;
    right: 40px;
  }
}
.icon-trash {
  font-size: 30px;
}
#pane-third {
  text-align: left;
  .send {
    display: inline-block;
    height: 20px;
    width: 60px;
    background-color: #38b03f;
    border-radius: 20px;
    text-align: center;
    color: white;
  }
  div {
    margin-top: 10px;
    .el-input {
      height: 30px;
    }
  }
}

.icon1 {
  position: relative;
  height: 30px;
  span {
    position: absolute;
    right: 0px;
    top: -10px;
    color: #5b85ab;
  }
}
.phone-top {
  display: none;
}

// @media screen and (max-width: 768px) {
//   // 手机端 把a1 隐藏 显示phone-top
//   .a1 {
//     display: none;

//   }
//   .phone-top {
//     display: block;
//     padding: 0 5px;
//     height: 40px;
//           background-color: #d8dcdd;

//     ul {
//       display: flex;
//       li {
//         flex: 1;
//         line-height: 40px;
//         span{
//           display: inline-block;
//           height: 40px;
//           width: 40px;
//           font-size: 22px;
//           cursor: pointer;
//         }
//       }
//       li:nth-child(3){
//         text-align: right;
//       }
//        li:nth-child(2){
//         text-align: center;
//       }
//     }
//   }
// }
</style>