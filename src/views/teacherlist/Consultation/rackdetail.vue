
<template>
  <div>
    <table class="tb_title">
      <tbody>
        <tr>
          <th rowspan="2">个案咨询记录修改</th>
          <td class="label">姓名：</td>
          <td>{{user['name']}}</td>
          <td class="label">学号：</td>
          <td>{{user['job_num']}}</td>
          <td class="label">班级：</td>
          <td>{{user['unit_group_name']}}</td>
        </tr>
        <tr>
          <td class="label">性别：</td>
          <td>{{user['sex']==1? '男' : '女'}}</td>
          <td class="label">手机：</td>
          <td>{{user['phone']}}</td>
          <td class="label">家庭住址/宿舍号：</td>
          <td>{{user['address']}}</td>
        </tr>
      </tbody>
    </table>
    <fieldset>
      <legend>一般信息</legend>
      <table width="100%">
        <tbody>
          <tr>
            <td>1、民族</td>
            <td>
              <input type="text" class="text" name="q_1" v-model="user_ext['nation']" />
            </td>
            <td>2、父亲年龄</td>
            <td>
              <input type="text" class="text" name="q_2" v-model="user_ext['father_age']" />
            </td>
          </tr>
          <tr>
            <td>3、父亲职业</td>
            <td>
              <input type="text" class="text" name="q_3" v-model="user_ext['father_job']" />
            </td>
            <td>4、如果父亲不在世，请问发生在___岁时。（父亲健在的不填写）</td>
            <td>
              <input type="text" class="text" name="q_4" v-model="user_ext['father_die_age']" />
            </td>
          </tr>
          <tr>
            <td>5、母亲年龄</td>
            <td>
              <input type="text" class="text" name="q_5" v-model="user_ext['mother_age']" />
            </td>
            <td>6、母亲职业</td>
            <td>
              <input type="text" class="text" name="q_6" v-model="user_ext['mother_job']" />
            </td>
          </tr>
          <tr>
            <td>7、如果母亲不在世，请问发生在___岁时。（母亲健在的不填写）</td>
            <td>
              <input type="text" class="text" name="q_7" v-model="user_ext['mother_die_age']" />
            </td>
            <td>8、父母婚姻状况</td>
            <td>
              <label>
                <el-radio-group v-model="user_ext['parent_marriage_status']">
                  <el-radio :label="1">良好</el-radio>
                  <el-radio :label="2">一般</el-radio>
                  <el-radio :label="3">较差</el-radio>
                  <el-radio :label="4">离异</el-radio>
                </el-radio-group>
              </label>
            </td>
          </tr>
          <tr>
            <td>9、如果父母离异的话，请问发生在___岁时。（父母未离异的不填写）</td>
            <td>
              <input type="text" class="text" name="q_9" v-model="user_ext['parent_divorced_age']" />
            </td>
            <td>10、是否有寄养经历</td>
            <td>
              <label>
                <el-radio-group v-model="user_ext['foster_flag']">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </label>
            </td>
          </tr>
          <tr>
            <td>11、寄养时的年龄（无寄养经历的不填写）</td>
            <td>
              <input type="text" class="text" name="q_11" v-model="user_ext['foster_age']" />
            </td>
            <td>12、生源类型</td>
            <td>
              <label>
                <el-radio-group v-model="user_ext['stu_type']">
                  <el-radio :label="1">农村</el-radio>
                  <el-radio :label="2">城市</el-radio>
                  <el-radio :label="3">城镇</el-radio>
                  <el-radio :label="4">留学生</el-radio>
                </el-radio-group>
              </label>
            </td>
          </tr>
          <tr>
            <td>13、独生子女</td>
            <td>
              <label>
                <el-radio-group v-model="user_ext['only_child']">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </label>
            </td>
            <td>14、家庭经济状况</td>
            <td>
              <label>
                <el-radio-group v-model="user_ext['economy']">
                  <el-radio :label="1">困难</el-radio>
                  <el-radio :label="2">不困难</el-radio>
                </el-radio-group>
              </label>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
      <input type="hidden" name="qnum" value="27" />
    </fieldset>
    <fieldset>
      <legend>排查情况</legend>
      <table width="100%">
        <tbody>
          <tr>
            <td width="80" valign="top">基本情况：</td>
            <td>
              <textarea
                v-model="case_data['check_basic']"
                name="paicha"
                id="paicha"
                style="width: 100%; overflow-x: hidden; word-wrap: break-word; resize: horizontal; height: 46px;"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td valign="top">采取措施：</td>
            <td>
              <textarea
                v-model="case_data['check_sps']"
                name="paicha_deal"
                id="paicha_deal"
                style="width: 100%; overflow-x: hidden; word-wrap: break-word; resize: horizontal; height: 46px;"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>问题分类：</td>
            <td>
              <el-select name="paicha_type" id="paicha_type" v-model="case_data['check_type']">
                <el-option v-for="item in check" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
    <fieldset>
      <legend>追踪情况</legend>

      <table width="100%">
        <tbody>
          <tr>
            <td width="80"></td>
            <td>（说明：以下两个文本框都要填写内容才算添加成功）</td>
          </tr>
          <tr>
            <td valign="top">基本情况：</td>
            <td>
              <textarea
                v-model="case_data['trace_basic']"
                name="zz_content"
                id="zz_content"
                style="width: 100%; overflow-x: hidden; word-wrap: break-word; resize: horizontal; height: 46px;"
                title="两个文本框都要填写内容才算添加成功"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td valign="top">采取措施：</td>
            <td>
              <textarea
                v-model="case_data['trace_sps']"
                name="zz_deal"
                id="zz_deal"
                style="width: 100%; overflow-x: hidden; word-wrap: break-word; resize: horizontal; height: 46px;"
                title="两个文本框都要填写内容才算添加成功"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>问题分类：</td>
            <td>
              <el-select name="paicha_type" id="paicha_type" v-model="case_data['trace_type']">
                <el-option v-for="item in check" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </td>
          </tr>
          <!-- <tr>
            <td>状态变更：</td>
            <td>
              <select name="zz_status" id="zz_status">
                <option>正常</option>
                <option>缓解</option>
                <option>持续</option>
                <option>恶化</option>
              </select>
            </td>
          </tr>-->
        </tbody>
      </table>
    </fieldset>
    <div class="buttom">
      <el-button @click="submit()">提交</el-button>
      <el-button type="primary" @click="return1()">返回</el-button>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      case_data: {
        check_basic: "",
        check_sps: "",
        check_type: "",
        trace_basic: "",
        trace_sps: "",
        trace_type: ""
      },
      user_ext: {
        nation: "",
        father_age: "",
        father_job: "",
        father_die_age: "",
        mother_age: "",
        mother_job: "",
        mother_die_age: "",
        parent_marriage_status: "",
        parent_divorced_age: "",
        foster_flag: "",
        foster_age: "",
        stu_type: "",
        only_child: "",
        economy: ""
      },
      user: {
        name: "",
        sex: "",
        job_num: "",
        phone: "",
        unit_group_name: "",
        address: ""
      },
      checkid: "",
      check: [
        { id: "0", name: "无需关注" },
        { id: "1", name: "学业问题" },
        { id: "2", name: "恋爱关系" },
        { id: "3", name: "人际交往" },
        { id: "4", name: "职业发展" },
        { id: "5", name: "情绪问题" },
        { id: "6", name: "躯体疾病" }
      ]
    };
  },
  mounted() {
    this.getlist();
  },
  beforeCreated() {
    this.getlist();
    //  console.log(this.$route.query.id)
  },
  methods: {
    getlist() {
      var that = this;
      this.axios
        .get("/api/v1/admin/counsel/caseDetail", {
          params: { id: this.$route.query.id }
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            Cookies.set("detail", res["data"]["data"]);
            // 扩展信息，个人刚开始返回没有这个数据表示为空
            if (res["data"]["data"]["user_ext"]) {
              for (var key in res["data"]["data"]["user_ext"]) {
                that.user_ext[key] = res["data"]["data"]["user_ext"][key];
                 if (!isNaN(res["data"]["data"][key] - 0)) {
            that.user_ext[key] = res["data"]["data"][key] - 0;
          }
              }
            }
            if (res["data"]["data"]["user"]) {
              // 基本信息，只要个人有
              that.user = res["data"]["data"]["user"];
            }

            //  访谈信息，个人和访谈都有
            for (var key in res["data"]["data"]["case_data"]) {
              that.case_data[key] = res["data"]["data"]["case_data"][key];
              that.htmlmain = res["data"]["data"]["case_data"]["suggest"];
            }
          }
        });
    },
    submit() {
        var that = this;
      var form = { counsel: {}, user_ext: {} };
      var detail = JSON.parse(Cookies.get("detail"));
      console.log(detail);
      if (detail["case_data"]) {
        for (var key in that.case_data) {
          if (
            that.case_data[key] &&
            that.case_data[key] !== detail["case_data"][key]
          ) {
            form["counsel"][key] = that.case_data[key];
          }
        }
      } else {
        form["counsel"] = that.case_data;
      }

      if (detail["user_ext"]) {
        for (var key in that.user_ext) {
          if (
            that.user_ext[key] &&
            that.user_ext[key] !== detail["user_ext"][key]
          ) {
            form["user_ext"][key] = that.user_ext[key];
          }
        }
      } else {
        form["user_ext"] = that.user_ext;
      }
      var form1={};
     
      for(var key in form){
         if ( JSON.stringify(form[key])!=='{}') {
            form1[key]=form[key]
         }
      }
       this.axios
        .post("/api/v1/admin/counsel/saveCaseEdit?id=" + this.$route.query.id, form1)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("修改反馈处理成功");
                that.getlist();

          } else {
            that.$message("修改反馈处理失败或者没有修改的数据");
          }
        });
    },
    return1() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.tb_title {
  margin-bottom: 5px;
  border-collapse: collapse;
  width: 100%;
  .label {
    text-align: right;
    background: #f1f1f1;
  }
  td,
  th {
    padding: 5px;
    border: 1px solid #ccc;
  }
}
fieldset {
  margin-bottom: 20px;
  border: 0;
  border-bottom: 1px dashed #ccc;
  padding: 10px 10px;
  font-size: 14px;
  legend {
    border-left: 3px solid #499ad1;
    font-size: 16px;
    font-weight: normal;
    color: #499ad1;
    padding-left: 15px;
    height: 25px;
    line-height: 25px;
  }
  table {
    border-spacing: 10px;
  }
  tr {
    // border-bottom: 1px solid #ccc;

    td {
      padding-top: 10px;
      vertical-align: top;
      input[type="radio"] {
        vertical-align: middle;
      }
    }

    input {
      height: 20px;
    }
  }
}
.buttom {
  text-align: center;
}
</style>