<template>
  <div class="main">
    <div class="head">
      <div class="a1" style="color: #00CBA3;
">管理员类型</div>
      <span class="a2">单位组别设置，导出</span>
    </div>
    <div class="body">
      <div class="work">
        <!-- <span class="export" @click="permission(0)" :class="{ btnactive: isbtnActive }">
          权限
          <i class="iconfont icon-daochu1"></i>
        </span> -->
        <!-- <excel-box :thead="this.thead" :filterVal="this.filterVal"  :tableData3="this.tableData3"></excel-box> -->
        <!-- <span class="del" @click="handleDelAll" :class="{ btnactive: isbtnActive }" v-has='["usertype","delid"]'>
          删除
          <i class="iconfont icon-trash"></i>
        </span>-->
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
            <template v-if="addflag">
              <tr>
                <td align="center">
                  <input type="checkbox" name="available" value="0" class="icheck" />
                </td>
                <td class="sort">{{tableData3.length+1}}</td>
                <td class="class">
                  <input type="text" v-model="values.value1" />
                </td>
                <td>
                  <!-- <input type="text" v-model="values.value2"> -->
                  *
                </td>

                <td>
                  <el-button size="mini" @click.stop="complete()">确定</el-button>
                  <el-button size="mini" type="danger" @click.stop="cancle()">取消</el-button>
                </td>
              </tr>
            </template>
            <tr
              v-for="(item,index) in tableData3"
              :key="index"
              @mouseover="changecolor(index)"
              v-bind:class="{heightcolor:isactive===index}"
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
              <td class="sort">{{index+1}}</td>
              <td class="class">
                <input v-if="index===index1" type="text" v-model="item.title" />
                <!-- 点击跳转相关年纪的班级 -->
                <!-- <router-link v-else :to="'/admin/grade.vue/' + item.sort" tag="a">{{item.class}}</router-link> -->
                <span v-else>{{item.title}}</span>
              </td>
              <td>
                <span>{{item.id}}</span>
              </td>

              <td>
                <template>
                  <el-button size="mini" @click="setting(item.id,item.title)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="del(item.id)">删除</el-button>
                </template>
              </td>
              <!-- <span class="posi">
                <template v-if="index===index1">
                  <span @click.stop="queding(index)">确定</span>
                  <span @click.self="cancle(index)">取消</span>
                </template>
                <template v-else>
                  <span @click="setting(item.sort)">编辑</span>
                  <span @click="del(item.sort)">删除</span>
                </template>
              </span>-->
            </tr>
          </tbody>
        </table>
        <el-dialog title="角色添加" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" style="width: 210px;"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="complete()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="角色编辑" :visible.sync="dialogFormVisible1">
          <el-form :model="form1">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form1.name" autocomplete="off" style="width: 210px;"></el-input>
            </el-form-item>
            <el-form-item label="角色权限" :label-width="formLabelWidth">
              <el-tree
                :data="data2"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
                :default-checked-keys='selecteds'

              ></el-tree>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="queding()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="权限设置" :visible.sync="dialogFormVisible2" width="400px">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
          ></el-tree>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
    </div>-->
    <div>
      <div class="add" @click="addnumber()" v-if="!addflag">新增</div>
      <div class="complete" @click="complete()" v-else>完成</div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import excelbtn from "../../../components/excel";
import { global } from "../../../global/global";
import { constants } from "fs";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      selecteds:[],//权限
      formLabelWidth: "120px",
      form: { name: "" },
      form1: { name: "", id: "", pid: "" },
      isbtnActive: false,

      data2: [],
      defaultProps: {
        children: "item",
        label: "menu_name",
      },
      // 权限设置
      ichecks: [],
      // 高亮显示
      isactive: "",
      // 页码
      page: {
        currentPage: 1,
        countpage: "",
        pagesize: 1,
        flag: false,
        offset: 0,
        size: "20",
      },
      // 编辑
      index1: "",
      //增加数据
      addflag: false,
      values: {
        value1: "",
        value2: "",
      },
      //请求数据赋值
      thead: ["序号", "角色", "ID", "操作"],
      tableData3: [],
    };
  },
  created() {
    this.getList();
    console.log(this.index1);
  },
  mounted() {
    console.log(11111111111);
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList() {
      var that = this;
      this.axios
        .get("/api/v1/admin/user/roleGroup")
        .then(function (res) {
          if (res["data"]["code"] == 0) {
            var data = res["data"]["data"];
            data.map(function (item, index) {
              if (item[status] == 0) {
                return item;
              }
            });
            that.tableData3 = res["data"]["data"];
            that.$store.commit("setGroup");
          } else {
            that.$message(res["data"]["msg"]);
          }
          console.log(that.tableData3);
        })
        .catch(function (err) {
          alert(err);
        });
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      this.countpage = Math.ceil(this.tableData3.length / this.pagesize);
    },
    // 分页·
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 增加数据开始
    addnumber() {
      // this.addflag = true;
      this.dialogFormVisible = true;

      console.log(this.addflag);
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },
    //增加数据把填写的数据得到完成向后台提交数据
    complete() {
      this.addflag = false;
      var that = this;
      this.axios
        .post("/api/v1/admin/user/addRoleGroup", {
          title: this.form.name,
        })
        .then(function (res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("增加成功");
            that.dialogFormVisible = false;
            that.getList();
            that.values.value1 = "";
          }
        });
    },
    //编辑后确定
    queding(id, item) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false和关闭打开的编辑框
      console.log(id, item);
      var ids = [];
      ids.push(this.form1.id);
      console.log(ids);
      this.getCheckedNodes();//编辑的时候设置权限
      var that = this;
      this.axios
        .post("/api/v1/admin/user/editRoleGroup", {
          id: ids,
          title: this.form1.name,
          status: "1",
        })
        .then(function (res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("编辑成功");
            that.dialogFormVisible1 = false;
            that.getList();
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
      this.addflag = false;
      this.index1 = "";
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
      console.log("zg");
    },
    // 点击编辑出现文本框
    setting(id, name) {
      // this.settingflag.id=id
      // console.log(this.settingflag)
      console.log(id);
      // this.index1 = id;
      this.form1.id = id;
      this.form1.name = name;
      this.permission(id);
      this.dialogFormVisible1 = true;
    },
    // 点击删除单条数据
    del(id) {
      var that = this;

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .get("/api/v1/admin/user/deleteRoleGroup?id=" + id)
            .then(function (res) {
              if (res["data"]["code"] == 0) {
                that.$message("删除成功");
                that.getList();
              } else {
                that.$message(res["data"]["msg"]);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
    //权限设置
    permission(set) {
      // 检查列表被选这的元素
      if (set) {
        // 编辑的时候的权限id
        console.log(set);
        this.ichecks.push(set);
      } else {
        // 统一操作的时候权限
        this.dialogFormVisible2 = true;
      }
      if (global.actioncheck("permission") === false) {
        this.$message.error("错误提示。您没有权限操作的权限");
        return false;
      }
      var icheck = this.$refs.icheck;
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked == true) {
          console.log(icheck[i].value)
          this.ichecks.push(icheck[i].value);
        }
      }
      // 角色组id集合
      console.log(this.ichecks);
      if (this.ichecks.length == 0) {
        alert("请至少选择一个角色");
      } else {
        // this.$router.push({ path: "/admin/permission" ,query:{id:this.ichecks}});
        var that = this;
        this.axios.get("/api/v1/admin/rules?id="+set).then(function (res) {
          var data = res["data"]["data"];
          var arr = [];
          var selecteds=[]
          var datas = that.copy(data, arr, selecteds);
          that.data2 = datas;
          that.selecteds=selecteds
          console.log(selecteds)
         
        });
      }
    },

    // 划过事件
    changecolor(index) {
      // console.log(index)
      this.isactive = index;
    },
    //   setting(index){
    //        console.log(index)
    // },
    colorcancel() {
      this.isactive = "";
    },
    getCheckedNodes() {
      var data = this.$refs.tree
        .getCheckedNodes()
        .concat(this.$refs.tree.getHalfCheckedNodes());
      var ids = [];
      data.map((item) => {
        ids.push(item.id);
      });
      if (ids.length !== 0) {
        var that = this;
        that.axios
          .post("/api/v1/admin/user/editRoleGroup", {
            id: that.ichecks,
            rules: ids,
          })
          .then(function (res) {
            if (res["data"]["code"] == 0) {
              that.$message("权限设置成功");
              that.dialogFormVisible2 = false;
            } else {
              that.$message("权限提交失败");
            }
          });
      } else {
        this.$message("请为角色组选择权限或者取消");
      }
    },

    copy(obj, arr,selecteds) {
      var that = this;
      for (var key in obj) {
        arr.push(obj[key]);
        if (obj[key]["items"].length !== 0) {
          var arrs = [];
          obj[key]["item"] = arrs;
          that.copy(obj[key]["items"], arrs,selecteds);
        }else{

          if (obj[key]["selected"]==1) {
            // console.log(obj[key]["id"])
            selecteds.push(obj[key]["id"])
          }
        }
      }
      return arr;
    },
  },
  //  components: {
  //     // 用来注册子组件的节点
  //     "excel-box": excelbtn
  //   }
};
</script>

<style lang="scss" scoped>
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
.pagi {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: flex-end;
  margin-top: 20px;
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
  .head {
    height: 135px;
    padding: 0 20px;
    background-color: #ffffff;
    box-shadow: #bdc0c3 1px 1px 10px;
    overflow: hidden;
    .a1 {
      margin-top: 30px;
      font-size: 25px;
    }
    .a2 {
      font-size: 12px;
      color: #9f9a9b;
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
        line-height: 15px;
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
      min-height: 200px;
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
          tr {
            position: relative;

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
  }
  .add,
  .complete {
    width: 310px;
    height: 25px;
    margin: 0 auto;
    text-align: center;
    line-height: 25px;
    position: relative;
    top: 10px;
    color: gray;
    border: 1px solid #dfd7d7;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
  }
}
.btnactive {
  background-color: #c6e2ff !important
  ;
}
</style>