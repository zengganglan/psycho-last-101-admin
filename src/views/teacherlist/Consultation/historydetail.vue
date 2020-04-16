
<template>
  <div>
    <table class="tb_title" v-if="type==2">
      <tbody>
        <tr>
          <th rowspan="2">访谈记录修改</th>
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

    <fieldset v-if="type==2">
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
      <legend>
        咨询师填写
        <span style="font-size:12px ; color:blue">【注：问题模板请不要随意删除,请随访谈结果一起提交】</span>
      </legend>
      <table width="100%" cellpadding="3" cellspacing="1">
        <tbody>
          <tr>
            <td width="50" valign="top">内容：</td>
            <td>
              <div id="editorElemcasedata" :style="{'text-align':'left'}">
                <!-- 如果没有值就放预制模板，如果有值肯定自带了这个模板这个删除 -->
                <textarea
                  v-if='!htmlmain'
                  name="question"
                  id="question"
                  style="width: 100%; overflow: hidden; word-wrap: break-word; resize: horizontal; font-size: 14px; height:900px"
                >
 问题模板：
1 希望通过咨询解决哪些方面的问题或困惑？

2 这些问题或困惑对您的生活造成了什么样的影响（学习、人际、实践活动）？

3 以前曾经尝试过什么方法或途径来解决这些问题？

4 您的家庭中曾出现过暴力吗？（选做）
4.1 您认为这和您自己目前所遇到的问题或困惑又怎样的联系呢？
4.2 您情绪不好时产生过扔东西、推搡、或打人的想法甚至付诸过行动了吗？
4.3 如果有过上述想法或行为，那是什么时候的事情？
4.4 是什么样的暴力？
4.5 现在怎么样了呢？（还会有类似的想法或行为吗？）

5 您曾经有过自杀或自伤的想法吗？（选做）
5.1 那是什么时候的事情？
5.2 那时候发生了些什么？
5.3 您曾计划过如何去实施吗？
5.4 您有尝试过自杀吗？
5.5 那是什么时候的事情？
5.6 结果如何？
5.6 现在再回过头去看这件事，您对此有什么样的想法或感受？

6 您的家庭成员中曾经有人自杀过吗？（选做）
6.1 如果有，那是什么时候的事情？
6.2 您知道那时候发生什么了吗？她/他为什么会选择自杀呢？
6.3 她/他是通过什么方式自杀的？
6.4 结果如何？
6.5 您对她/他的行为有什么看法或感受？

7 您的家庭成员中有人曾得过精神类的疾病吗？（选做）
7.1 是谁？
7.2 是什么时候的事情？
7.3 当时做的诊断是什么？
7.4 您是如何知道的？

8 您有喝酒的习惯吗？（选做）
8.1 多久喝一次？
8.2 每次一般喝多少？
8.3 喝酒后曾与人发生过冲突吗？
8.4 您的家庭成员中有人有饮酒方面的问题吗，如酗酒？

9 您觉得还有哪些问题是比较重要，需要让我们了解到的？

10 您以前曾经做过正式的心理咨询吗？感觉效果如何？

11 您对咨询有什么疑问或顾虑吗？</textarea>
                <p v-html="htmlmain">访谈建议：</p>
              </div>
            </td>
          </tr>
          <!-- <tr>
            <td>分类：</td>
            <td>
                 <el-select   placeholder="请选择">
                <el-option label="学业问题" value="1"></el-option>

                <el-option label="恋爱关系" value="2"></el-option>

                <el-option label="人际交往" value="3"></el-option>

                <el-option label="职业发展" value="4"></el-option>

                <el-option label="情绪问题" value="5"></el-option>
              </el-select>
            
            </td>
          </tr>-->
          <tr>
            <td>建议：</td>
            <td>
              <el-select v-model="case_data.proc_idea" placeholder="请选择">
                <el-option
                  v-for="item in casedata"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <!-- <tr>
            <td>日期：</td>
            <td>
              <el-date-picker v-model="case_data.feedback_time" type="date" placeholder="选择日期"></el-date-picker>
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
import E from "wangeditor";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      casedata: [
        { id: "1", name: "无须干预" },
        { id: "2", name: "预约面询" },
        { id: "3", name: "危机干预" },
        { id: "4", name: "联系领导" },
        { id: "5", name: "跟踪随访" }
      ],
      type: this.$route.query.type,
      htmlmain: "",
      suggestdata:'',
      case_data: {
        proc_idea: "",
        suggest: ""
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
      form: {
        suggest: "<h1>Some initial content</h1>",
        proc_idea: "1",
        id: this.$route.query.id
      },
      editor: ""
    };
  },
  mounted() {
    // 实例化
    console.log(this.$store.state.columns);
    // 视频<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=b0837pjcueo" allowFullScreen="true"></iframe>
    var editor = new E("#editorElemcasedata");
    this.editor = editor;
    console.log(editor);
    editor.customConfig.onchange = html => {
      this.case_data.suggest = html;
    };
    //  editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    editor.customConfig.uploadImgServer = "/api/v1/admin/article/upload"; //上传URL
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    editor.customConfig.uploadImgMaxLength = 5;
    editor.customConfig.uploadFileName = "file";
    editor.customConfig.uploadImgHeaders = {
      "X-Token": this.$store.state.token //头部token
    };
    editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        if (result["code"] == 0) {
          // var url = 'http://psy.hxxlcloud.com/uploads/'+result.data.upload_path
          var url = "/uploads/" + result.data.upload_path;
          insertImg(url);
        } else {
          that.$message(result["msg"]);
        }
      }
    };

    editor.create();
  },
  created() {
    this.case_data["proc_idea"] = "5";

    this.getlist();
  },
  methods: {
    getlist() {
      var that = this;
      this.axios
        .get("/api/v1/admin/coach/detail", {
          params: { id: this.$route.query.id }
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
           
            localStorage.setItem("detail", JSON.stringify(res["data"]["data"]) )
            // Cookies.set("detail", res["data"]["data"]);
            // 扩展信息，个人刚开始返回没有这个数据表示为空
            if (res["data"]["data"]["user_ext"]) {
              for (var key in that.user_ext) {                
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
            for (var key in that.case_data) {
              that.case_data[key] = res["data"]["data"]["case_data"][key];
              that.htmlmain = res["data"]["data"]["case_data"]["suggest"];
            }
            // that.case_data['proc_idea']=5
          }
        });
    },
    submit() {
      
      console.log();
      this.casedata["suggest"] = this.editor.txt.html();
      this.$route.query.id;
      var that = this;
      var form = { coach: {}, user_ext: {}};
      var detail = JSON.parse(localStorage.getItem("detail"));
      if (detail["case_data"]) {

        for (var key in that.case_data) {
          console.log(key)
          if (
            that.case_data[key] &&
            that.case_data[key] !== detail["case_data"][key]
          ) {
            form["coach"][key] = that.case_data[key];
          }
        }
      } else {
        form["coach"] = that.case_data;
      }

      if (detail["user_ext"]) {
        for (var key in that.user_ext) {
          if (
            that.user_ext[key] &&
            that.user_ext[key] !== detail["user_ext"][key]
          ) {
                    console.log(that.user_ext[key],detail["user_ext"][key])

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
      // form["coach"]["proc_idea"] = that.case_data["proc_idea"];
      // form["coach"]["suggest"] = that.case_data["suggest"];
      // form["user_ext"]["nation"] = that.user_ext["nation"];
      // form["user_ext"]["father_age"] = that.user_ext["father_age"];
      // form["user_ext"]["father_job"] = that.user_ext["father_job"];
      // form["user_ext"]["father_die_age"] = that.user_ext["father_die_age"];
      // form["user_ext"]["mother_age"] = that.user_ext["mother_age"];
      // form["user_ext"]["mother_job"] = that.user_ext["mother_job"];
      // form["user_ext"]["mother_die_age"] = that.user_ext["mother_die_age"];
      // form["user_ext"]["parent_marriage_status"] =
      //   that.user_ext["parent_marriage_status"];
      // form["user_ext"]["parent_divorced_age"] =
      //   that.user_ext["parent_divorced_age"];
      // form["user_ext"]["foster_flag"] = that.user_ext["foster_flag"];
      // form["user_ext"]["foster_age"] = that.user_ext["foster_age"];
      // form["user_ext"]["stu_type"] = that.user_ext["stu_type"];
      // form["user_ext"]["only_child"] = that.user_ext["only_child"];
      // form["user_ext"]["economy"] = that.user_ext["economy"];
      this.axios
        .post("/api/v1/admin/coach/saveEdit?id=" + this.$route.query.id, form1)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            alert("修改反馈处理成功");
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