<template>
  <div class="main">
    <headson :headson="headson"></headson>

    <div class="tab">
      <ul>
        <li
          v-for="(item,index) in tabls"
          :class="{tabactive:tabindex-1==index}"
          :key="index"
          @click="tab(index)"
        >{{item}}</li>
      </ul>
    </div>
    <ul>
      <li class="data1" v-if="tabindex==1">
        <div class="body">
          <div class="work">
            <!-- <excel-box :thead="this.thead" :filterVal="this.filterVal"  :tableData3="this.tableData3"></excel-box> -->
            <span class="del" @click="del()" :class="{ btnactive: isbtnActive }">
              删除
              <i class="iconfont icon-trash"></i>
            </span>
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
                  <!-- 也可以循环遍历 -->
                  <th v-for="(item,index) in thead" :key="index">{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,index) in tableData1"
                  :key="index"
                  @mouseover="changecolor(index)"
                  v-bind:class="{heightcolor:isactive==item.sort}"
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
                  <td class="sort">{{item.job_num}}</td>
                  <td class="class">
                    <!-- 点击跳转相关年纪的班级 -->
                    <span>{{item.name}}</span>
                  </td>
                  <td>
                    <span>{{item.sex}}</span>
                  </td>
                  <td>
                    <span>{{item.age}}</span>
                  </td>
                  <td>
                    <span>{{item.age}}</span>
                  </td>
                  <td>
                    <template>
                      <el-button size="mini" @click="setting1(item.sort)">修改</el-button>

                      <el-button size="mini" type="danger" @click="del1(item.id)">删除</el-button>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
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
          <div class="add" @click="addnumber1">新增</div>
          <el-dialog title="增加因子" :visible.sync="dialogFormVisible1" width="400px">
            <el-tabs type="border-card">
              <el-tab-pane label="手动录入">
                <el-form ref="form" :model="form1" label-width="80px">
                  <el-form-item label="类别名称">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="因子结束">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="得分计算">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="标准分计算">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="基底分">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="标准差">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="上传因子">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-tab-pane>
            </el-tabs>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible1 = false">提交</el-button>
            </div>
          </el-dialog>
          <el-dialog title="修改因子" :visible.sync="dialogFormVisible2" width="400px">
            <el-form ref="form" :model="form1" label-width="80px">
                  <el-form-item label="类别名称">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="因子结束">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="得分计算">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="标准分计算">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="基底分">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="标准差">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible2= false">提交</el-button>
            </div>
          </el-dialog>
        </div>
      </li>
      <li class="data3" v-else>
        <div class="body">
          <div class="work">
            <span class="reset" @click="reset">删除</span>
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
                  <!-- 也可以循环遍历 -->
                  <th v-for="(item,index) in thead1" :key="index">{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,index) in tableData1"
                  :key="index"
                  @mouseover="changecolor(index)"
                  v-bind:class="{heightcolor:isactive==item.sort}"
                  @mouseout="colorcancel()"
                >
                  <td align="center">
                    <input
                      type="checkbox"
                      name="available"
                      :value="item.sort"
                      ref="icheck"
                      @click.stop="icheck()"
                      class="icheck"
                    />
                  </td>
                  <td class="sort">{{item.job_num}}</td>
                  <td class="class">
                    <!-- 点击跳转相关年纪的班级 -->
                    <span>{{item.name}}</span>
                  </td>
                  <td>
                    <span>{{item.sex}}</span>
                  </td>
                  <td>
                    <span>{{item.sex}}</span>
                  </td>
                  <td>
                    <span>{{item.sex}}</span>
                  </td>

                  <td>
                    <template>
                      <el-button size="mini" @click="setting2(item.sort)">修改</el-button>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pages">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="page2.currentPage"
              :page-sizes="[10, 20, 30, 40,50,60]"
              :page-size="page2.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page2.total"
            ></el-pagination>
          </div>
          <div class="add" @click="addnumber2">新增</div>

          <el-dialog title="增加因子结算" :visible.sync="dialogFormVisible3" width="400px">
            <el-form ref="form" :model="form3" label-width="80px">
              <el-form-item label="类别名称">
                <el-input v-model="form3.name"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible3= false">提交</el-button>
            </div>
          </el-dialog>
          <el-dialog title="修改因子结算" :visible.sync="dialogFormVisible4" width="400px">
            <el-form ref="form" :model="form4" label-width="80px">
              <el-form-item label="类别名称">
                <el-input v-model="form4.name"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible4= false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible4= false">提交</el-button>
            </div>
          </el-dialog>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import schoolcheck from "../../../../components/schoolcheck";
import headson from "../../../../components/headson";
import pagination from "../../../../components/pagination";
import { global } from "../../../../global/global";

export default {
  data() {
    return {
      isbtnActive: false,

      // 高亮显示
      isactive: "",
      // 头部组件信息
      headson: ["测试组合及分发", "系统量表管理，操作"],

      // 切导航行栏
      tabls: ["因子信息", "因子结算"],
      tabindex: 1,
      // 页码
      page: {
        currentPage: 1,
        total: 0,
        flag: false,
        size: 20
      },
      // 页码
      page2: {
        currentPage: 1,
        total: 0,
        flag: false,
        size: 20
      },
      // 编辑
      index1: "",
      //增加数据
      addflag: false,
      values: {
        value1: "",
        value2: "",
        value3: ""
      },
      thead: ["因子信息", "得分计算", "标准分计算", "基底分", "标准差", "操作"],
      thead1: [
        "结果描述",
        "所属因子",
        "比较值",
        "比较上限",
        "比较下限",
        "操作"
      ],
      //请求数据赋值
      tableData1: [],
      tableData2: [],
      // 提交资料
      submitflag: true,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      form1: {
        name: ""
      },
      form2: {
        name: ""
      },
      form3: {
        name: ""
      },
      form4: {
        name: ""
      }
    };
  },
  watch: {},

  created() {
    this.getList(this.page.currentPage, this.page.size);
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList(currentPage, pagesize) {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/admin/user/student/list", {
          page: currentPage,
          size: pagesize
        })
        .then(function(res) {
          var data = res["data"]["data"];
          data.map(function(item, index) {
            var a = new Date().getTime() - new Date(item["birth_date"]);
            var hours = a / 1000 / 60 / 60;
            var year = Math.floor(hours / (24 * 30 * 12));
            item["age"] = year;
            if (item.sex == 0) {
              return (item.sex = "女");
            } else {
              return (item.sex = "男");
            }
          });
          that.tableData1 = data;
          console.log(data);
        });
      this.page.countpage = Math.ceil(
        this.tableData1.length / this.page.pagesize
      );
    },
    // 分页·
    handleSizeChange(val) {
      this.page.size = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    // 分页·
    handleSizeChange2(val) {
      this.page2.size = val;
      this.getList(this.page2.currentPage, this.page2.size);
    },
    handleCurrentChange2(val) {
      this.page2.currentPage = val;
      this.getList(this.page2.currentPage, this.page2.size);
    },
    // 增加数据
    addnumber1() {
      this.dialogFormVisible1 = true;
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },
    // 增加数据
    addnumber2() {
      this.addflag = true;
      this.dialogFormVisible3 = true;
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },

    // 点击编辑出现文本框
    setting1(id) {
      console.log(1);
      this.dialogFormVisible2 = true;
    },
    // 点击编辑出现文本框
    setting2(id) {
      this.dialogFormVisible4 = true;
    },
    //编辑后确定
    queding(id) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false
      console.log(this.value1);
      this.addflag = false;
      this.index1 = "";
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
    },
    // 点击删除单条数据
    del1(id) {
      var ids = [];
      if (id) {
        ids.push(id);
      } else {
        var icheck = this.$refs.icheck;
        for (var i = 0; i < icheck.length; i++) {
          if (icheck[i].checked) {
            var value = icheck[i].value;
            // 找到选中单选框数据的id唯一值
            ids.push(value);
          }
        }
        if (ids.length == 0) {
          this.$message("请至少选择一个删除");
          return;
        }
      }
      console.log(ids);

      var that = this;
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .post("/api/v1/admin/user/delRole", { id: ids })
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
    del2() {},
    //点击删除选中的数据
    handleDelAll() {},
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
      allcheck.checked = flag;
      if (event.target.checked) {
        event.target.parentNode.parentNode.style.backgroundColor = "#F8F8FA";
        this.isbtnActive = true;
      } else {
        event.target.parentNode.parentNode.style.backgroundColor = "";
      }
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
          // sort是数据标记值
          if (item["sort"] == newarr[i]) {
            newtable.push(item);
          }
        });
      }
      console.log(newtable);
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
      global.handleDownload(tHeader, filterVal, newtable);
    },

    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },
    // 搜索功能
    showtable() {
      // this.tableflag = true;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      console.log(1);
    },
    //过滤操作
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    // 划过事件
    changecolor(index) {
      this.isactive = index - 0 + 1;
    },
    colorcancel() {
      this.isactive = "";
    },
    checknode() {
      console.log(this.$refs.schoolcheck1.newvalue);
      // this.tableflag = true;
    },
    reset() {
      // 重置密码 选中的
    }
  },
  components: {
    schoolcheck: schoolcheck,
    headson: headson,
    pagination: pagination
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #169bd5;
}
.heightcolor {
  background-color: #f8f8fa;
}
.tabactive {
  color: #6998fb;
  border-bottom: 10px solid #6998fb;
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
  .tab {
    width: 100%;
    height: 100px;
    color: #bfbfc0;
    font-size: 12px;
    background-color: #fbfbfb;
    border: 1px solid #eff2f9;
    box-shadow: #eff2f9 1px 1px 20px;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;

      li {
        float: left;
        text-align: center;
        width: 200px;
        line-height: 100px;
        width: 174px;
        margin: 0 70px;
        font-size: 20px;
      }
    }
  }
  .data1 {
    .search {
      height: 80px;
      margin: 0 auto;
      background-color: #fafafc;
      border: 1px solid #eff2f9;
      box-shadow: #eff2f9 1px 1px 20px;
      ul {
        width: 100%;
        display: flex;
        padding-top: 25px;
        justify-content: space-between;
        li:nth-child(1) {
          margin-left: 50px;
          margin-right: 150px;
          .schoolcheck1 {
            position: relative;
            top: -25px;
            left: 40px;
            width: 200px;
          }
        }
        li:nth-child(2) {
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
            top: -1px;
            border: 2px solid #e2e2e2;
            border-left: none;
          }
          .icon-wenhao {
            color: #169bd5;
            font-size: 25px;
          }
        }
      }
    }
  }
  .body {
    margin-top: 30px;
    overflow: hidden;
    .work {
      width: 90%;
      margin: 0 auto;
      span {
        display: inline-block;
        float: right;
        width: 60px;
        height: 20px;
        background-color: #ffffff;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        border-radius: 5px;
        border: 1px solid #9f9a9b;
        cursor: pointer;
        i {
          font-size: 20px;
          position: relative;
          top: 3px;
        }
      }
      span:nth-child(1) {
        margin-left: 20px;
      }
    }
    .datas {
      height: 640px;
      border: 1px solid #e6e6e8;
      margin: 0 50px;
      margin-top: 30px;
      background-color: #ffffff;

      .tb_list {
        margin: 0 auto;
        width: 100%;
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
          }
        }
      }
    }
  }
  .add {
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
  .data2 {
    width: 90%;
    height: 488px;
    margin: 0 auto;
    background-color: #ffffff;
    overflow: hidden;
    margin-top: 50px;
    border: 1px solid #e6e6e8;

    ul {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      margin-top: 100px;
      color: #a8a8a8;
      font-size: 20px;
      li {
        text-align: center;
        position: relative;
        span {
          position: absolute;
          left: -20px;
        }
      }

      li:nth-child(1) {
        width: 300px;
        height: 50px;
        margin-left: 20px;
        .schoolcheck1 {
          display: inline-block;
          position: relative;
          width: 235px;
          top: -5px;
        }
      }
      li:nth-child(2) {
        width: 300px;
        margin-left: 100px;
        .schoolcheck1 {
          position: relative;
          width: 235px;
          left: 35px;
          top: -5px;
        }
      }
      // li:nth-child(4) {
      //   width: 100px;
      //   height: 30px;
      //   background-color: #169bd5;
      //   text-align: center;
      //   span {
      //     position: absolute;
      //     top: 5px;
      //     left: 15px;
      //     color: white;
      //   }
      // }
    }
    .complet,
    .submit {
      width: 210px;
      height: 34px;
      margin: 0 auto;
      text-align: center;
      background-color: #6999fd;
      line-height: 34px;
      font-size: 20px;
      color: #ffffff;
      margin-top: 100px;
    }
  }
  .data3 {
    .search {
      height: 80px;
      margin: 0 auto;
      background-color: #f8f8fa;
      border: 1px solid #eff2f9;
      box-shadow: #eff2f9 1px 1px 20px;
      li {
        margin-top: 20px;
      }
      li:nth-child(1) {
        font-size: 25px;
        color: #9f9a9b;
        width: 200px;
        float: left;
        margin-left: 10px;

        .icon-wenhao {
          color: #169bd5;
          font-size: 30px;
        }
      }
      li:nth-child(2) {
        float: left;

        margin-left: 0;
        width: 400px;
        span {
          vertical-align: center;
          color: #9f9a9b;
          position: relative;
          top: 5px;
          left: -10px;
        }
        .schoolcheck1 {
          display: inline-block;
          width: 300px;
          position: absolute;
        }
      }
      li:nth-child(3) {
        float: left;
        span {
          display: inline-block;
          height: 33px;
          width: 30px;
          position: relative;
          top: 0px;
          left: -50px;
          cursor: pointer;
          border-radius: 5px;
          color: #bfbfc0;
          background-color: #f8f8fa;
          outline: none;
          line-height: 33px;
          font-size: 22px;
          color: #169bd5;
          border: 2px solid #e2e2e2;
          text-align: center;
        }
      }
    }
    .reset {
      line-height: 30px;
    }
  }
}
.btnactive {
  background-color: #c6e2ff !important
  ;
}
</style>



