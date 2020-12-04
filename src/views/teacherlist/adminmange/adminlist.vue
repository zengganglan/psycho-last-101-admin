<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->
    <div class="search">
      <!-- <a href="http://localhost:8080/static/excel/新时代智慧党建渠道价格表11.19(3).xlsx" download>1111111111111111</a> -->
      <!-- <a :href="link" download>1111111111111111</a> -->
      <!-- <a href="http://localhost:8080/static/工作簿1.xlsx" download>1111111111111111</a> -->
      <!-- <a href="http://localhost:8080/工作簿1.xlsx" download>1111111111111111</a>
      <a href="http://localhost:8080/static/img/bj1@2x.8097259.png" download>1111111111111111</a>
      <a href="http://localhost:8080/新时代.xlsx" download>1111111111111111</a> -->

      <ul>
        <!-- <li>
          <span>范围：</span>
          <div class="schoolcheck1">
            <schoolcheck ref="schoolcheck1"></schoolcheck>
          </div>
        </li>
        <li>
          类型：
          <select name v-model="Groupid" id="type">
            <option
              :value="item['id']"
              v-for="(item,index) in $store.state.adminGroup"
              :key="index"
              selected="selected"
            >{{item['title']}}</option>
          </select>
        </li>
        <li>
          <span>查询：</span>
          <input type="text" value id="person" />
          <i class="iconfont icon-sousuo" @click="showtable()"></i>
        </li>-->
        <li>
          <table class="tbs">
            <tr>
              <td>工号</td>
              <td>
                  <input type="number" style="height:40px;width:100%" placeholder="请输入数量 不超过1000"  v-model="form.job_num" min="0" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" >
                <!-- <el-input v-model="form.job_num"></el-input> -->
              </td>
              <td>性别</td>
              <td>
                <el-select name v-model="form.sex" id="type" clearable>
                  <el-option value="1" label="男"></el-option>
                  <el-option value="0" label="女"></el-option>
                </el-select>
              </td>
              <td>姓名</td>
              <td>
                <!-- id:35,43,12,29, 31,-->

                <el-input v-model="form.name"></el-input>
              </td>
            </tr>
            <tr>
              <td>手机</td>
              <td>
                                  <input style="height:40px;width:100%" type="number" placeholder="请输入数量 不超过1000"  v-model="form.phone" min="0" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" >

                <!-- <el-input v-model="form.phone"></el-input> -->
              </td>
              <td>范围</td>
              <td>
                <div class="schoolcheck">
                  <schoolcheck ref="schoolcheck"></schoolcheck>
                </div>
              </td>
              <td>年龄</td>
              <td>
                     <input type="number" placeholder="请输入数量 不超过1000"  style="height:40px;width:100%" v-model="form.age" min="0" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" >

                <!-- <el-input v-model="form.age"></el-input> -->
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
    <div class="body">
      <div class="work">
        <span
          class="del iconfont icon-daochu1"
          @click="handleDownload"
          :class="{ btnactive: isbtnActive }"
        >导出</span>
        <span class="dev" @click="handleDelAll">删除</span>
        <span class="dev" @click="showtable">查询</span>
      </div>
      <div class="datas">
        <table class="tb_list" ref="tables">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="available"
                  value="0"
                  ref="allcheck"
                  @click="allcheck()"
                  class="icheck"
                />
              </th>
              <th v-for="(item,index) in thead" :key="index">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in tableData3"
              :key="index"
              @mouseover="changecolor(index)"
              v-bind:class="{heightcolor:isactive==index}"
              @mouseout="colorcancel()"
            >
              <td align="center">
                <input
                  type="checkbox"
                  name="available"
                  :value="item.id"
                  ref="icheck"
                  @click.stop="icheck()"
                  class="icheck"
                />
              </td>
              <td class="sort">{{item.id}}</td>
              <td class="class">
                <!-- <input v-if="item.id==index1" type="text" v-model="item.job_num"> -->
                <!-- 点击跳转相关年纪的班级 -->
                <span>{{item.job_num}}</span>
              </td>
              <td>
                <!-- <input v-if="item.id==index1" type="text" v-model="item.name"> -->
                <a href="#" @click.prevent="baseinfo(item.id)">{{item.name}}</a>
                <!-- <router-link v-else  tag="a" @click="baseinfo.prevent(item.id)">{{item.name}}</router-link> -->
              </td>
              <td>
                <!-- <div class="schoolcheck1" v-if="item.id==index1">
                  <schoolcheck ref="schoolcheck1" class="school"></schoolcheck>
                </div>-->
                <span>{{item.unit_group_name}}</span>
              </td>
              <td>
                <!-- <input v-if="item.id==index1" type="text" v-model="item.phone"> -->
                <span>{{item.phone}}</span>
              </td>
              <td>
                <!-- 管理员种类 -->
                <!-- <select v-if="item.id==index1" type="text" v-model="values.select">
                  <option
              :value="item['id']"
              v-for="(item,index) in $store.state.adminGroup"
              :key="index"
              selected="selected"
            >{{item['title']}}</option>
                </select>-->

                <span>{{item.title}}</span>
              </td>
              <!-- <td>
                <input v-if="item.id==index1" type="text" v-model="item.id">
                <span v-else>{{item.id}}</span>
              </td>-->
              <td>
                <!-- <input v-if="item.id==index1" type="text" v-model="item.last_login"> -->
                <span>{{item.last_login || '无'}}</span>
              </td>

              <td>
                <!-- <template v-if="item.id==index1">
                  <el-button size="mini" @click.stop="queding()">确定</el-button>
                  <el-button size="mini" type="danger" @click.stop="cancle()">取消</el-button>
                </template>-->

                <template>
                  <el-button size="mini" @click="setting(item.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="del(item.id)">删除</el-button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>

        <el-dialog title="个人信息" :visible.sync="dialogFormVisible" width="600px">
          <table class="personinfo">
            <tr>
              <td>账户</td>
              <td>{{detail.account}}</td>
              <td>ID</td>
              <td>{{detail.id}}</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{detail.name}}</td>
              <td>年龄</td>
              <td>{{detail.birth_date}}</td>
            </tr>
            <tr>
              <td>班级</td>
              <td>{{detail.unit_group}}</td>
              <td>性别</td>
              <td>{{detail.job_num}}</td>
            </tr>
            <tr>
              <td>手机</td>
              <td>{{detail.phone}}</td>
              <td> e-mail</td>
              <td>{{detail.email}}</td>
            </tr>
            <tr>
              <td>工号</td>
              <td>{{detail.job_num}}</td>
              <td>住址</td>
              <td>{{detail.job_num}}</td>
            </tr>
          </table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40,50,60]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
    <div>
      <router-link class="add" to="/admin/addAdmin" tag="div">新增</router-link>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import headson from "../../../components/headson";
import schoolcheck from "../../../components/schoolcheck";
import tables from "../../../components/table";
import pagination from "../../../components/pagination";
import { global } from "../../../global/global";

export default {
  data() {
    return {
      isbtnActive: false,
      detail: "",
      link:'http://'+window.location.host+'/新建 XLS 工作表.xls',
      // 组别id
      Groupid: "",
      group: "",
      // 高亮显示
      isactive: "",
      // 编辑
      index1: "",
      // 头部组件信息
      headson: ["管理员列表", "查询管理员列表信息"],
      //增加数据
      addflag: false,
      values: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        select: ""
      },
      // 搜索出现表格
      // tableflag: false,
      form: {
        job_num: '',
        phone: '',
        name: "",
        age: '',
        unit_group: '',
        sex: ""
      },
      // 页码
      page: {
        currentPage: 1,
        total: 0,
        flag: false,
        size: 20
      },

      //页面初始化请求数据赋值
      thead: ["id", "工号", "姓名", "班级", "手机", "类型", "登录日期", "操作"],
      tableData3: [],
      dialogFormVisible: false
    };
  },

  created() {
    this.getList(this.page.currentPage, this.page.size);
  },
  mounted() {},
  methods: {
    // getList获取列表数据给tableData3赋值
    down(){
      //  var url = 'assets/excel/新时代智慧党建渠道价格表11.19(3).xlsx'
        // var url = "/task_list.xlsx"  //放在public目录下的文件可以直接访问
    
    //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
    this.axios.get(url, {responseType:'arraybuffer'})
    .then((res) => {
      console.log(res)
    //     var data = new Uint8Array(res.data)
    // var wb = XLSX.read(data, {type:"array"})
    // var sheets = wb.Sheets
    // this.content = transformSheets(sheets)
    }).catch( err =>{
      this.err = err
    })
    },
    getList(currentPage, pagesize,w) {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/admin/user/roles", {
          page: currentPage,
          size: pagesize,
          w: w
        })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            var data = res["data"]["data"]["data"];
            that.tableData3 = data;
            that.page.total = res["data"]["data"]['total'];
            // var role = res["data"]["data"]["role_group"];
            // var groups = res["data"]["data"]["unit_group"];
            // data.map(function(item, index) {
            //   groups.map(function(item1, index1) {
            //     if (item.unit_group == item1.id) {
            //       item.unit_group = item1.name;
            //     }
            //   });
            //   role.map(function(item2, index2) {
            //     if (item.auth_group_id == item2.id) {
            //       console.log(item2.id);
            //       item.auth_group_id = item2.title;
            //     }
            //   });
            // });
            // data.map(function(item, index) {
            //   if (typeof item.unit_group == "number") {
            //     item.unit_group = "null";
            //   }
            //   if (typeof item.auth_group_id == "number") {
            //     item.auth_group_id = "null";
            //   }
            // });
          }
        });
    },
    // 分页·
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.size = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getList(this.page.currentPage, this.page.size);
    },

    // 导出excel表格功能
    handleDownload() {
      let vm = this;
      const list = vm.tableData3;
      var icheck = this.$refs.icheck;
      var newarr = [];
      var newtable = [];
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          newarr.push(value);
        }
      }
      //  把删除的标记值传给后台
      console.log(newarr);
      for (var i = 0; i < newarr.length; i++) {
        this.tableData3.map(function(item, index) {
          if (item["id"] == newarr[i]) {
            newtable.push(item);
          }
        });
      }
      const tHeader = this.thead;
      const filterVal = [
        "id",
        "job_num",
        "name",
        "unit_group",
        "phone",
        "auth_group_id",
        "last_login"
      ];
      //  const list = this.tableData3;
      global.handleDownload(tHeader, filterVal, newtable);
    },

    // 搜索功能
    showtable() {
      //子组件树形控件的开关
      this.$refs.schoolcheck.treeflag = false;
      // 是名字
      this.$refs.schoolcheck.newvalue;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      this.form.unit_group=this.$refs.schoolcheck.item.id-0
      console.log( this.form);
      var obj ={}
      for(var key in this.form){
         if (this.form[key]) {
           obj[key]=this.form[key]
         }
      }
      this.getList(this.page.currentPage, this.page.size,obj) 
    },
    baseinfo(id) {
      this.dialogFormVisible = true;
      console.log(id);
      var that = this;
      that.axios
        .post("/api/v1/admin/user/detail", { uid: id })
        .then(function(res) {
          console.log(res);
          var detail = res["data"]["data"]["detail_data"];
          var group = res["data"]["data"]["unit_group_data"];
          var arr = [];
          for (var key in group) {
            arr.push(group[key]);
          }
          group = global.NestedToFlat(arr);
          console.log(group);
          group.map(function(item, index) {
            if (item.id == detail.unit_group) {
              return (detail.unit_group = item.name);
            }
          });
          console.log(detail);
          that.detail = detail;
        });
    },
    //增加数据把填写的数据得到完成向后台提交数据
    complete() {
      this.addflag = false;
      console.log(this.values);
      this.$refs.tab.addnumber();
    },
    //编辑后确定
    queding(id) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false和关闭打开的编辑框
      console.log(this.value1);
      this.addflag = false;
      this.index1 = "";
      console.log(this.values.select);
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
      console.log("zg");
    },
    // 点击编辑出现文本框
    setting(id) {
      // this.settingflag.id=id
      // console.log(this.settingflag)
      console.log(id);
      // this.index1 = id;
      console.log(this.values.select);
      this.$router.push({ path: "/admin/setAdmin", query: { id: id } });
    },
    // 点击删除单条数据
    del(id) {
      console.log(id);
      var that = this;
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .post("/api/v1/admin/user/delRole", { id: [id] })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.getList(that.page.currentPage, that.page.size);
                that.$message("删除成功");
              } else {
                that.$message(res["data"]["msg"]);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击删除选中的数据【在点击上一页下一页需要记录每页选择的数据，如果新数组没有且当页选择了就当进去，如果新数组有当页没选择就删除】
    handleDelAll() {
      var icheck = this.$refs.icheck;
      var newarr = [];
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          newarr.push(value);
        }
      }
      //  把删除的标记值传给后台
      console.log(newarr);
      var that = this;
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .post("/api/v1/admin/user/delRole", { id: newarr })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.getList(that.page.currentPage, that.page.size);
                that.$message("删除成功");
              } else {
                that.$message(res["data"]["msg"]);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 全选反选
    allcheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      for (var i = 0; i < icheck.length; i++) {
        // 把allchecked的状态赋值给每一个子选框
        icheck[i].checked = allcheck.checked;
      }
    },
    //反选
    icheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      var flag = true;

      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked == false) {
          flag = false;
        }
      }
      if (event.target.checked) {
        event.target.parentNode.parentNode.style.backgroundColor = "#F8F8FA";
        this.isbtnActive = true;
      } else {
        event.target.parentNode.parentNode.style.backgroundColor = "";
      }
      allcheck.checked = flag;
    },
    // 划过事件
    changecolor(index) {
      // console.log(index)
      this.isactive = index - 0 + 1;
    },
    //   setting(index){
    //        console.log(index)
    // },
    colorcancel() {
      this.isactive = "";
    }

    //  components: {
    //     // 用来注册子组件的节点
    //     "excel-box": excelbtn
    //   }
  },
  components: {
    headson: headson,
    schoolcheck: schoolcheck,
    tables: tables,
    pagination: pagination
  }
};
</script>

<style lang="scss" scoped>
.tbs {
  tr {
    td {
      padding: 10px;
      position: relative;
      .schoolcheck {
        position: absolute;
        width: 87%;
        top: 10px;
        // // left: 88px;
        // height: 100%;
        z-index: 3;
      }
    }
  }
}

.personinfo {
  border-collapse: separate;
  border-spacing: 2px;
  td {
    width: 250px;
    height: 30px;
  }
  td:nth-child(odd) {
    width: 60px;
    color: #169bd5;
  }
  tr:nth-child(odd) {
    background-color: rgb(237, 242, 252);
  }
  tr:nth-child(even) {
  }
}
.icon-wenhao {
  color: #169bd5;
  font-size: 25px;
}
.tabactive {
  color: #169bd5;
}
.icheck {
  height: 20px;
  width: 15px;
  cursor: pointer;
  position: relative;
  top: 5px;
}

// table高亮显示
.heightcolor {
  background-color: #f8f8fa;
}
a {
  color: #169bd5;
}
.pages {
  margin: 0 50px;

  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  // float: right;
  height: 100px;
}
.main {
  .search {
    // height: 80px;
    margin: 0 auto;
    background-color: #fafafc;
    border: 1px solid #eff2f9;
    box-shadow: #eff2f9 1px 1px 20px;
    ul {
       width: 100%;
    display: flex;
    padding-top: 25px;
    justify-content: center;
      li:nth-child(1) {
        float: left;
        margin-left: 50px;
        margin-right: 150px;
        .schoolcheck1 {
          position: relative;
          top: -22px;
          left: 40px;
          width: 160px;
        }
      }
      li:nth-child(2) {
        float: left;
        margin-left: 50px;
        margin-right: 100px;
        width: 300px;

        #type {
          height: 32px;
          outline: none;
          width: 150px;
          outline: none;
          border: none;

          border: 2px solid #e2e2e2;
        }
        .icon-sousuo {
          display: inline-block;
          font-size: 32px;
          vertical-align: middle;
          background-color: #fff;
          height: 32px;
          line-height: 32px;
          color: #ffffff;
          position: relative;
          left: -5px;
        }
      }
      li:nth-child(3) {
        width: 500px;
        float: left;
        margin-left: 50px;
        #person {
          height: 32px;
          outline: none;
          width: 200px;
          outline: none;
          border: none;
          border: 2px solid #e2e2e2;
        }
        .icon-sousuo {
          display: inline-block;
          font-size: 22px;
          vertical-align: middle;
          height: 32px;
          width: 30px;
          line-height: 32px;
          text-align: center;
          color: #bad6fc;
          position: relative;
          left: -5px;
          border: 2px solid #e2e2e2;
          border-left: none;
        }
      }
    }
  }
  .body {
    // overflow: hidden;
    margin-top: 10px;
    background-color: #f9f9fb;

    .work {
      width: 90%;
      margin: 0 auto;
      height: 20px;
      margin-top: 30px;

      span {
        display: inline-block;
        float: right;
        width: 62px;
        height: 20px;
        background-color: #ffffff;
        color: #b1b1b1;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        border-radius: 5px;
        border: 1px solid #e1e1e3;
        cursor: pointer;
      }
      span:nth-child(1) {
        margin-left: 20px;
      }
      .div {
        margin-right: 20px;
      }
    }
    .datas {
      margin: 0 auto;
      min-height: 200px;
      border: 1px solid #e6e6e8;
      margin: 0 50px;
      margin-top: 30px;
      background-color: #ffffff;
    }
  }
  .add,
  .complete {
    width: 310px;
    height: 25px;
    margin: 0 auto;
    text-align: center;
    line-height: 25px;
    position: relative;
    top: -20px;
    color: gray;
    border: 1px solid #dfd7d7;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
  }
}

.heightcolor {
  background-color: #f8f8fa;
}
.tb_list {
  width: 100%;
  border: 1px solid #e6e6e8;
  margin: 0 auto;
  // margin-top: 30px;
  background-color: #ffffff;
  border-top: 1px solid #dfd7d7;
  thead {
    th {
      border-bottom: 1px solid #dfd7d7;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
  }
  tbody {
    td {
      border-bottom: 1px solid #dfd7d7;
      text-align: center;
      height: 36px;
      line-height: 36px;
      position: relative;
      input,
      select {
        height: 32px;
      }
      .schoolcheck1 {
        height: 100%;
        width: 166px;
        position: relative;
        display: flex;
        justify-content: center;
        align-content: center;

        .school {
          width: 100%;
          position: absolute;
          top: 3px;
        }
      }
    }
  }
}
.btnactive {
  background-color: #c6e2ff !important
  ;
}
</style>



