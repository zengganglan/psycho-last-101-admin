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
              <el-input v-model="detail.name" style="width:200px" :disabled="disabled"></el-input>
            </td>
          </tr>
          <tr>
            <td nowrap>量表类别：</td>
            <td>
              <!-- <template v-if="disabled">
                <el-input v-model="detail.type_name" disabled style="width:200px"></el-input>
              </template>-->
              <template>
                <div>
                  <el-select
                    :disabled="disabled"
                    style="width:200px"
                    filterable
                    reserve-keyword
                    placeholder="请输入关键词搜索"
                    :loading="loading"
                    v-model="detail.type_id"
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
                </div>
              </template>
            </td>
          </tr>
          <tr>
            <td nowrap>友好名称：</td>
            <td>
              <el-input v-model="detail.view_name" :disabled="disabled" style="width:200px"></el-input>
            </td>
          </tr>

          <tr>
            <td style="border-top:1px solid #6699FF">英&emsp;文：</td>
            <td style="border-top:1px solid #6699FF">
              <el-input v-model="detail.short_name" :disabled="disabled" style="width:200px"></el-input>
            </td>
          </tr>
          <tr v-if="disabled">
            <td nowrap>题目数：</td>
            <td>
              <el-input
                v-model="detail.topic_count"
                :disabled="disabled"
                style="width:200px"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td nowrap>适用年龄：</td>
            <td>
              <el-input
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                v-model="detail.min_age"
                :disabled="disabled"
                style="width:90px"
                :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
              ></el-input>-
              <el-input
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                :disabled="disabled"
                v-model="detail.max_age"
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
              <el-input type="textarea" :disabled="disabled" v-model="detail.intro" :autosize="{ minRows: 7, maxRows: 50}"></el-input>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #6699FF" valign="top">指导语：</td>
            <td style="border-top:1px solid #6699FF">
              <el-input type="textarea" :disabled="disabled" v-model="detail.guide" :autosize="{ minRows: 7, maxRows: 50}"></el-input>
            </td>
          </tr>

          <tr>
            <td valign="top">测试题：</td>
            <td>
              <el-upload
                style="width:200px;display:inline-block;vertical-align:top"
                class="upload-demo"
                action="/api/v1/system/scale/upload"
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
              <el-button size="small" type="primary">    <a style="color:#fff;font-size: 16px;" :href="links" download>【点击下载模板】</a>
</el-button>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #6699FF" valign="top"></td>
            <td style="border-top:1px solid #6699FF">
              <div class="add" @click="check" v-if="disabled">修改</div>
              <div class="add" @click="makesure" v-else>保存</div>
            </td>
          </tr>
          <tr>
            <td>测试题：</td>
            <td>
              <span v-if="!topicflag" style="color:blue;font-size:12px">还没有上传题目</span>
            </td>
          </tr>
          <tr v-if="topicflag">
            <td></td>
            <td>
              <div class="personinfo">
                <table >
                  <tr>
                    <th>#</th>
                    <th>题目</th>
                    <th>备选</th>
                  </tr>

                  <tr v-for="(item,index) in timu" :key="index">
                    <td align="center">{{index+1}}</td>
                    <td>{{item['topic']['content']}}</td>
                    <td>
                      <span
                        v-for="(item1,index1) in item['topic']['option']"
                        :key="index1"
                      >{{item1[0]}} |</span>
                    </td>
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
  </div>
</template>

<script>
import headson from "../../../components/headson";
// import timu from "../../../vendor/item";
import QRCode from "qrcode";
export default {
  data() {
    return {
      loading: false,
      disabled: true,
      roles: "",
      timu: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      detail: {},
      form: {
        name: "",
        view_name: "",
        short_name: "",
        ctgy_id: "",
        min_age: "",
        min_age: "",
        intro: "",
        guide: ""
      },
      form1: {
        id: "",
        name: "",
        unit_name: ""
      },
      formLabelWidth: "100px",
      // 头部组件信息
      headson: ["系统量表", "系统量表编辑"],
      topicflag: false,
      links:`http://${window.location.host}/scale.xlsx`
    };
  },
  created() {
    this.getdetail(this.$route.query.id);
    this.getquestion(this.$route.query.id);
    console.log(window.location.host)
    // this.changeobj(this.tableData);
  },
  methods: {
    getquestion(id) {
      var that = this;
      this.axios
        .get("/api/v1/system/scale/getScaleTopic?id=" + id)
        .then(res => {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.timu = res["data"]["data"];
            if (that.timu.length == 0) {
              that.topicflag = false;
            }else{
              that.topicflag=true
            }
          }
        });
    },
    getdetail(id) {
      var that = this;
      this.axios
        .get("/api/v1/system/scale/getScaleDetail?id=" + id)
        .then(res => {
          if (res["data"]["code"] == 0) {
            that.detail = res["data"]["data"];
            var query = that.detail.type_name;
            that.remoteMethod(query);
          }
          console.log(res);
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
          that.counselorname = item["name"];
        }
      });
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
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    check() {
      this.disabled = false;
    },
    makesure() {
      if (!this.form.ctgy_id) {
        this.form.ctgy_id=this.detail.type_id;
      }
      this.form.name = this.detail.name;
      this.form.view_name = this.detail.view_name;
      this.form.short_name = this.detail.short_name;
      this.form.ctgy_id;
      this.form.min_age = this.detail.min_age;
      this.form.max_age = this.detail.max_age;
      this.form.intro = this.detail.intro;
      this.form.guide = this.detail.guide;
      var that = this;
      console.log(this.values);
      if (this.form.min_age-0>this.form.max_age-0) {
        this.$message("最小年龄不能大于最大年龄");
        return false;
      }
      this.axios
        .post(
          "/api/v1/system/scale/saveScaleInfo?id=" + this.$route.query.id,
          this.form
        )
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("编辑成功");
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    success(response, file, fileList) {
      var that = this;
      let cache_path = response["data"]["file_name"];
      let suffix = response["data"]["suffix"];
      // let save_name = file.name;
      that.axios
        .post("/api/v1/system/scale/importTopic", {
          id: this.$route.query.id,
          suffix: suffix,
          file_name: cache_path
        })
        .then(res => {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("上传题库成功");
            that.getquestion(that.$route.query.id);
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
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
      min-height: 200px;
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
  height: 30px;
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  position: relative;
  top: 10px;
  color: gray;
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>