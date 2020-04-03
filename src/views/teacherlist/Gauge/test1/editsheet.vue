<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->
    <div class="search"></div>

    <div class="data">
      <table
        width="100%"
        cellpadding="4"
        style="border-top:2px solid #6699FF; border-bottom:2px solid #6699FF"
      >
        <tbody class="data1">
          <tr>
            <td nowrap>量表名称：</td>
            <td>
              <el-input v-model="form.name" style="width:200px"></el-input>
            </td>
          </tr>
          <tr>
            <td nowrap>友好名称：</td>
            <td>
              <el-input v-model="form.name" style="width:200px"></el-input>
            </td>
          </tr>

          <tr>
            <td style="border-top:1px solid #6699FF">英&emsp;文：</td>
            <td style="border-top:1px solid #6699FF">
              <el-input v-model="form.name" style="width:200px"></el-input>
            </td>
          </tr>
          <tr>
            <td nowrap>题目数：</td>
            <td>
              <el-input v-model="form.name" style="width:200px"                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
></el-input>
            </td>
          </tr>
          <tr>
            <td nowrap>适用年龄：</td>
            <td>
              <el-input
               onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                v-model="form.name"
                style="width:90px"
                :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
              ></el-input>-
              <el-input
                             onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"

                v-model="form.name"
                style="width:90px"
                :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #6699FF" valign="top">简&emsp;介：</td>
            <td style="border-top:1px solid #6699FF">
              <p>该量表含有10个分量表，分别评价10个不同的家庭环境特征：（1）亲密度（Cohesion），即家庭成员之间互相承诺、帮助和支持的程度；（2）情感表达（Expressiveness），即鼓励家庭成员公开活动，直接表达情感的程度；（3）矛盾性（Conflict），也就是家庭成员之间公开表露愤怒、攻击和矛盾的程度；（4）独立性（Independence），即家庭成员的自尊、自信和自主程度；（5）成功性（Achievement Orientation），是将一般性活动，如上学和工作变为成就性或竞争性活动的程度；（6）知识性（Intellectual-Cultural Orientation），即对政治、社会、智力和文化活动的兴趣大小；（7）娱乐性（Active-Recreational Orientation），即参与社交和娱乐活动的程度；（8）道德宗教观（Moral-Religious Emphasis），即对伦理、宗教和价值观的重视程度；（9）组织性（Organization），即安排家庭活动和责任时有明确的组织和结构的程度；（10）控制性（Control），即使用固定家规和程序来安排家庭生活的程度。</p>
              <el-input type="textarea" v-model="form.name"></el-input>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #6699FF" valign="top">指导语：</td>
            <td style="border-top:1px solid #6699FF">
              <p>该问卷用于了解您对您家庭的看法。请您确定以下问题是否符合您家里的实际情况。如果您认为某一问题符合或基本上符合您家庭的实际情况，请选择“是”；如果不符合或基本上不符合，请选择“否”。如果难以判断是否符合，您应该按多数家庭成员的表现或者经常出现的情况做答。如果仍无法确定，就按您自己的估计回答。请务必回答每一个问题。有些问题带有“★”，表示此句有否定的含义，请注意正确理解句子内容。记住，该问卷所指的“家庭”是指与您共同食宿的小家庭。在回答问卷时不要推测别人对您的家庭的看法，请一定按实际情况来回答。</p>
              <el-input type="textarea" v-model="form.name"></el-input>
            </td>
          </tr>
          <tr>
            <td>测试题：</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div class="personinfo">
                <table>
                  <tr>
                    <th>#</th>
                    <th>题目</th>
                    <th>备选</th>
                  </tr>

                  <tr v-for="(item,index) in timu" :key="index">
                    <td align="center">{{index+1}}</td>
                    <td>{{item}}</td>
                    <td>从无/轻度/中度/偏重/严重</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div class="pages"></div>
    </div>
    <div class="add" @click="addnumber">保存</div>
    <el-dialog title="量表二维码" :visible.sync="dialogFormVisible" @opened="useqrcode" width="500px">
      <!-- <div class="tilt"><img src="../../../../assets/images/erweima.png" alt=""></div> -->
      <canvas id="canvas" ref="canvas" style="margin-left:150px"></canvas>
    </el-dialog>
    <el-dialog
      title="症状自评量表(SCL-90)"
      :visible.sync="dialogFormVisible1"
      :style="{'height':'500px'}"
    >
      <table class="personinfo">
        <tr>
          <th>#</th>
          <th>题目</th>
          <th>备选</th>
        </tr>

        <tr v-for="(item,index) in timu" :key="index">
          <td align="center">{{index+1}}</td>
          <td>{{item}}</td>
          <td>从无/轻度/中度/偏重/严重</td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headson from "../../../../components/headson";
import timu from "../../../../vendor/item";
import QRCode from "qrcode";
export default {
  data() {
    return {
      timu: timu,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        name: "",
        unit_name: ""
      },
      form1: {
        id: "",
        name: "",
        unit_name: ""
      },
      formLabelWidth: "100px",
      // 头部组件信息
      headson: ["系统量表", "系统量表编辑"],
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tableData: [
        {
          1: "症状自评量表(SCL-90)",
          2: "大学生心理健康普查问卷",
          3: "ZSQZFX",
          4: "121",
          5: "18",
          6: "15-78"
        },
        {
          1: "心理健康诊断测验",
          2: "心理健康诊断测验",
          3: "XLJK",
          4: "98",
          5: "70",
          6: "10~100"
        },
        {
          1: "斯特里劳气质调查表(STI)",
          2: "	你的气质类型是什么？",
          3: "STI",
          4: "3",
          5: "134",
          6: "15-78"
        },
        {
          1: "卡特尔16种人格因素问卷(15-70岁)",
          2: "	你是什么样的人格呢？(16pf)",
          3: "16PF",
          4: "234",
          5: "56",
          6: "17-78"
        },
        {
          1: "大五人格量表（NEO）",
          2: "大五人格量表（NEO）",
          3: "neo",
          4: "121",
          5: "93",
          6: "15-78"
        },
        {
          1: "艾森克人格问卷成人式(EPQA)",
          2: "	你的个性是什么样的？（成人版）",
          3: "EPQA",
          4: "33",
          5: "85",
          6: "15-78"
        },
        {
          1: "性格倾向性测试",
          2: "	你的性格是内向还是外向？",
          3: "XGQX",
          4: "58",
          5: "50",
          6: "15-78"
        },
        {
          1: "爱德华个人偏好量表（EPPS）",
          2: "	爱德华个人偏好量表（EPPS）",
          3: "EPPS",
          4: "456",
          5: "56",
          6: "7-78"
        },
        {
          1: "人格特质测试",
          2: "你的人格特质是怎样呢？",
          3: "ZFX",
          4: "121",
          5: "93",
          6: "15-78"
        },
        {
          1: "症自我和谐量表",
          2: "	自我和谐量表",
          3: "SCCS",
          4: "121",
          5: "93",
          6: "15-78"
        },
        {
          1: "自尊量表（SES）",
          2: "	测测你的自尊水平（SES）",
          3: "ses",
          4: "121",
          5: "93",
          6: "15-78"
        }
      ],
      multipleSelection: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 10,
        pagesize: "10",
        flag: false
      },
      currentRow: null,
      spanArr: [],
      pos: ""
    };
  },
  created() {
    // this.getlist(this.page.currentpage,this.page.pagesize);
    // this.changeobj(this.tableData);
  },
  methods: {
    show() {
      // 按钮事件 传值
      this.dialogFormVisible = true;
      console.log(1);
    },
    //动态生成二维码
    useqrcode() {
      //对话框打开生成二维码生成的二维码内容，可以添加变量
      var canvas = document.getElementById("canvas");
      console.log(1);

      QRCode.toCanvas(canvas, "http://psy.hxxlcloud.com/mpsycholo/ ", function(
        error
      ) {
        if (error) console.error(error);
        console.log("QRCode success!");
      });
    },
    getlist(currentpage, pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      // this.axios
      //   .post("/api/v1/admin/sand/group/list", {
      //     page: currentpage,
      //     size: pagesize
      //   })
      //   .then(function(res) {
      //     if (res["data"].code == 0) {
      //       that.page.countpage = res["data"]["data"]["total"];
      //       that.tableData = res["data"]["data"]["list"];
      //     }
      //     console.log(res);
      //   });
    },
    changeobj(data) {
      // 数据前提是相同的数据排在一起
      if (data == null) {
        return;
      }
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);

          // 记录循环每一次当前索引。第一次空数组第一个数据加1
          this.pos = 0;
        } else {
          if (data[i].id === data[i - 1].id) {
            // 如果后面跟前面相同的数据 就在上一次索引加一 索引不要去改变，以防几次重复记录增加1，把当前数据记录合并值为0 在前面的数据已经把他合并了
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            // 跟前面不同时直接合并记录直接为1 表示出现一次只合并一个相当于没合并
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
      console.log(this.spanArr);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //  列号为0 行号是偶数0 2 4 的位置开始合并相应的行数和列数  进行合并 合并是列号合并一列 行合并两行
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]; //从处理完的数组里获取
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col //相当于给给表格加上rowspan,colspan属性
        };
      }
    },

    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      console.log(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      var id = val["id"];
      var name = val["name"];
      console.log(val);
      // 点击的当前数据// 跳转路由传参// 根据参数查询当前这个人的所有ar报告
      this.$router.push({
        path: "/game/gamedetail",
        query: { id: id, name: name }
      });
      //获取参数方法:      this.$route.query.id;
    },
    // 分页·
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
      this.getlist(this.page.currentpage, this.page.pagesize);
    },
    pageCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentpage = val;
      this.getlist(this.page.currentpage, this.page.pagesize);
    },
    handleEdit(index, row) {
      this.dialogFormVisible1 = true;
      this.form1.id = row.id;
      this.form1.name = row.name;
      this.form1.unit_name = row.unit_name;
      this.timu = timu;
      console.log(timu);
    },
    editsure() {
      this.axios
        .post("/api/v1/admin/sand/group/edit", {
          id: this.form1.id,
          name: this.form1.name,
          unit_name: this.form1.unit_name
        })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("编辑成功");
            that.getlist(that.page.currentpage, that.page.pagesize);
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    handleDelete(index, row) {
      var id = [];
      if (row) {
        id.push(row.id);
      } else {
        if (this.multipleSelection.length !== 0) {
          this.multipleSelection.map(item => {
            id.push(item["id"]);
          });
        } else {
          this.$message("请确定选中了选项");
        }
      }
      var that = this;
      this.axios
        .post("/api/v1/admin/sand/group/delete", { id: id })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("删除成功");
            that.getlist(that.page.currentpage, that.page.pagesize);
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    addnumber() {
      this.dialogFormVisible = true;
    },
    makesure() {
      this.dialogFormVisible = false;
      var that = this;
      console.log(this.form);
      this.axios
        .post("/api/v1/admin/sand/group/add", {
          name: that.form.name,
          unit_name: that.form.unit_name
        })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("增加成功");
            that.getlist(that.page.currentpage, that.page.pagesize);
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleDelAll() {},
    changevalue() {},
    cellStyle() {
      return;
    }
  },

  components: {
    headson: headson
  }
};
</script>

<style scoped lang="scss">
.canvas {
  margin: 0 auto;
}
.tilt {
  text-align: center;
}
.tr {
  height: 40px;
}
.personinfo {
  border-collapse: separate;
  border-spacing: 2px;
  td {
    width: 250px;
    height: 30px;
  }
  td:nth-child(odd) {
    width: 200px;
    color: #169bd5;
  }
  tr:nth-child(odd) {
    background-color: rgb(237, 242, 252);
  }
  tr:nth-child(even) {
  }
}
.luru {
  border-left: 8px solid #679afa;
  margin: 0 50px;
  color: #679afa;
  padding-left: 10px;
  font-size: 20px;
  margin-top: 40px;
}
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
.pages {
  margin: 0 50px;

  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  // float: right;
  height: 100px;
}
.search {
  margin-top: 50px;
  margin-left: 50px;
  ul {
    width: 100%;
    display: flex;
    padding-top: 25px;
    justify-content: center;
    li {
      width: 320px;
    }
  }

  input,
  select {
    height: 32px;
    width: 200px;
    outline: none;
    border: none;
    border: 2px solid #e2e2e2;
  }
  i {
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
.data {
  min-height: 640px;
  border: 1px solid #e6e6e8;
  margin: 0 50px;
  margin-top: 30px;
  background-color: #ffffff;
  .data1 {
    tr {
      td {
        padding: 10px;
      }
      .personinfo {
        height: 1000px;
        overflow-y: scroll;
        td {
          width: 500px;
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
  top: -20px;
  color: gray;
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>