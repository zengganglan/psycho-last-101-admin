<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->
    <div class="search">
      <!-- <ul>
        <li>
          范围：
          <select name v-model="formLabelWidth" id="type">
             <option value="">认识自我</option>
             <option value="">心理健康</option>
             <option value="">自由量表</option>
             <option value="">人际关系</option>
          </select>
        </li>
     
        <li>
          <span>关键字：</span>
          <input type="text" placeholder="请输入手机号，学号，姓名">
          <i data-v-30c34ff0 class="iconfont icon-sousuo"></i>
        </li>
      </ul>-->
    </div>
    <div class="work">
      <span class="del" @click="handleDelete">
        删除
        <i class="iconfont icon-trash"></i>
      </span>
    </div>

    <div class="data">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="index"
          :label="item.name"
          :name="item.id"
        ></el-tab-pane>
      </el-tabs>
      <!-- <div class="tab">
        <ul class="wrap">
          <li
            v-for="(item, index) in editableTabs"
            :key="index"
            :class="[mousflag===index? 'current' : ''] "
          >{{item.title}}</li>
          <li>22222222222222f河长制</li>
          <li>22222222222222</li>
          <li>22222222222222</li>
          <li>22222222222222</li>
          <li>22222222222222</li>
          <li>22222222222222</li>
          <li>22222222222222</li>
          <li>22222222222222</li>
          <li>22222222222222</li>
        </ul>
      </div>-->
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        :cell-style="{width:'80px',height:'30px'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="name" label="专业名称"></el-table-column>
        <el-table-column prop="view_name" label="友好名称"></el-table-column>
        
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="short_name" label="英文简称"></el-table-column>
        <el-table-column prop="topic_count" label="题数"></el-table-column>
        <el-table-column label="适用年龄">
          <template slot-scope="scope">
            <span>{{scope.row.min_age+" — "+scope.row.max_age}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <!-- <el-button size="mini" @click.stop="show(scope.$index, scope.row)">
              <span class="iconfont icon-qrcode"></span>
            </el-button> -->
            <!-- <el-button
                size="mini"
                type="danger"
            @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="pageCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10,20,30,40,50,60]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.countpage"
        ></el-pagination>
      </div>
    </div>
    <div class="add" @click="addnumber">新增</div>
    <el-dialog title="量表二维码" :visible.sync="dialogFormVisible" @opened="useqrcode" width="500px">
      <!-- <div class="tilt"><img src="../../../../assets/images/erweima.png" alt=""></div> -->
      <canvas id="canvas" ref="canvas" style="margin-left:150px"></canvas>
    </el-dialog>
    <el-dialog title="上传量表" :visible.sync="dialogFormVisible1">
      <el-form ref="form" :model="form1" label-width="80px">
        <el-form-item label="类别">
         
          <el-select
          
            filterable
            reserve-keyword
            placeholder="请输入关键词搜索"
            :loading="loading"
            v-model="form1.ctgy_id"
            @change="changevalue"
            value-key
          >
            <el-option
              v-for="(item, index) in roles"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input v-model="form1.name"></el-input>
        </el-form-item>
        <el-form-item label="友好名称">
          <el-input v-model="form1.view_name"></el-input>
        </el-form-item>
        <el-form-item label="英文简称">
          <el-input v-model="form1.short_name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="题数">
          <el-input
            v-model="form1.name"
            style="width:90px"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          ></el-input>
        </el-form-item>-->
        <el-form-item label="适用年龄">
          <el-input
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            v-model="form1.min_age"
            style="width:90px"
            :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
          ></el-input>-
          <el-input
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            v-model="form1.max_age"
            style="width:90px"
            :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
          ></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" autosize v-model="form1.intro"></el-input>
        </el-form-item>
        <el-form-item label="指导语">
          <el-input type="textarea" autosize v-model="form1.guide"></el-input>
        </el-form-item>
        <!-- <el-form-item label="测试题">
          <el-upload
            style="width:200px;display:inline-block;vertical-align:top"
            class="upload-demo"
            action="/api/v1/admin/vr/report/upload"
            :headers='{"X-Token":this.$store.state.token}'
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :on-success="success"
          >
            <el-button size="small" type="primary">点击上传测试题</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
          </el-upload>
          <el-button size="small" type="primary">点击下载模板</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="makesure">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import timu from "../../../vendor/item";
import QRCode from "qrcode";
import $ from "jquery";

export default {
  data() {
    return {
      loading: false,
      roles: "",
      activeName: "",
      mousflag: 0,
      fileList: [],
      timu: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,

      form1: {
        name: "",
        view_name: "",
        short_name: "",
        ctgy_id: "",
        min_age: "",
        min_age: "",
        intro: "",
        guide: ""
      },
      formLabelWidth: "100px",
      // 头部组件信息
      headson: ["系统量表", "系统量表管理"],
      editableTabs: [],
      tableData: [],
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
      pos: "",
      query: ""
    };
  },
  mounted() {},
  created() {
    this.gettype();
    this.remoteMethod()
    // this.changeobj(this.tableData);
  },
  methods: {
    gettype() {
      var that = this;
      this.axios.get("/api/v1/tools/selectScaleTypeList").then(res => {
        if (res["data"]["code"] == 0) {
          that.editableTabs = res["data"]["data"];
          that.editableTabs.map((item, index) => {
            item.id = item.id + "";
          });
          that.activeName = that.editableTabs[0]["id"];
          that.getlist(that.page.currentpage, that.page.pagesize);
        }
      });
    },
    remoteMethod(query) {
      console.log(query);
      var that = this;
      this.axios
        .get("/api/v1/tools/selectScaleTypeList?id=" + query)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.roles = res["data"]["data"];
          }
        });
    },
    changevalue(a) {
      var that = this;
      that.roles.map((item, index) => {
        if (item["id"] == a) {
          // that.counselorname = item["name"];
        }
      });
    },
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
      this.axios
        .post("/api/v1/system/scale/getScaleList", {
          page: currentpage,
          size: pagesize,
          type: that.activeName
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            that.page.countpage = res["data"]["data"]["count"];
            that.tableData = res["data"]["data"]["list"];
          }
        });
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
      this.form1.id = row.id;
      this.form1.name = row.name;
      this.form1.unit_name = row.unit_name;
      this.$router.push({ path: "/school/gloEditsheet",query:{
        id:row.id
      } });
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
        .post("/api/v1/system/scale/delScaleBaseInfo", { id: id })
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
      this.dialogFormVisible1 = true;
    },
    makesure() {
       if (this.form1.min_age-0>this.form1.max_age-0) {
        this.$message("最小年龄不能大于最大年龄");
        return false;
      }
      this.dialogFormVisible1 = false;
      var that = this;
      this.axios
        .post("/api/v1/system/scale/saveScaleInfo", this.form1)
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
      this.activeName = tab.name;
      var that = this;
      that.getlist(that.page.currentpage, that.page.pagesize);
    },
 
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
  overflow: hidden;
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
.current {
  border-top-color: #499ad1;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 2px solid transparent;
  background: #fff;
}
.data {
      min-height: 200px;
  border: 1px solid #e6e6e8;
  margin: 0 50px;
  margin-top: 30px;
  background-color: #ffffff;
  .tab {
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    height: 50px;
    position: relative;

    ul {
      height: 50px;
      width: 2000px;
      position: absolute;
      left: 0;
      // display: flex;
      // flex-wrap: nowrap;
      li {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        cursor: pointer;
        display: inline-block;
        text-align: center;
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