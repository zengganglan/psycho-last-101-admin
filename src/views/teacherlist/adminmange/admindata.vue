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
        <div class="search">
          <ul>
            <li>
             <table class="tbs">
            <tr>
              <td>工号</td>
              <td>
                  <input type="number" style="height:40px;width:100%" placeholder="请输入数字"  v-model="form.job_num" min="0" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" >
                <!-- <el-input v-model="form.job_num"></el-input> -->
              </td>
              <td>性别</td>
              <td>
                <el-select name v-model="form.sex" id="type" clearable>
                  <el-option value="0" label="女"></el-option>
                  <el-option value="1" label="男"></el-option>
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
                                  <input style="height:40px;width:100%" type="number" placeholder="请输入数字"  v-model="form.phone" min="0" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" >

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
                     <input type="number" placeholder="请输入数字"  style="height:40px;width:100%" v-model="form.age" min="0" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" >

                <!-- <el-input v-model="form.age"></el-input> -->
              </td>
            </tr>
          </table>
           
            </li>
          
          </ul>
        </div>
        <div class="body">
          <div class="work">
            <span class="export" @click="handleDownload" :class="{ btnactive: isbtnActive }">
              导出
              <i class="iconfont icon-daochu1"></i>
            </span>
            <!-- <excel-box :thead="this.thead" :filterVal="this.filterVal"  :tableData3="this.tableData3"></excel-box> -->
            <span class="del" @click="del()" :class="{ btnactive: isbtnActive }">
              删除
              <i class="iconfont icon-trash"></i>
            </span>
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
                  <!-- 也可以循环遍历 -->
                  <th v-for="(item,index) in thead" :key="index">{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,index) in tableData3"
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
                    <td>
                    <span>{{item.id}}</span>
                  </td>
                  <td class="sort">{{item.job_num}}</td>
                  <td class="class">
                    <!-- 点击跳转相关年纪的班级 -->
                    <router-link :to="'/admin/settingStudent?id=' + item.id" tag="a">{{item.name}}</router-link>
                  </td>
                  <td>
                    <span>{{item.sex}}</span>
                  </td>
                  <td>
                    <span>{{item.age}}</span>
                  </td>
                    <td>
                    <span>{{item.unit_group_name}}</span>
                  </td>
                  <td>
                    <template>
                      <el-button size="mini" type="danger" @click="del(item.id)" >删除</el-button>
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
        </div>
      </li>
      <li class="data2" v-else-if="tabindex==2">
        <span style="color:#6999fd;fontsize:12px">提示：如果目标组别没有对应的数据集或者数据集为空则不能进行迁移数据
</span>
                        
        <ul>
          <li class="zy1">
            <span>原位：</span>
            <div class="schoolcheck1">
              <schoolcheck ref="schoolcheck11"></schoolcheck>
            </div>
          </li>
          <li class="zy2">
            <span>目标：</span>
            <div class="schoolcheck1">
              <schoolcheck ref="schoolcheck22"></schoolcheck>
            </div>
          </li>
        </ul>
        <div class="submit" v-if="submitflag" @click="changegroup">提交</div>
        <div class="complet" v-else>操作完成</div>

      </li>
      <li class="data3" v-else>
        <div class="search">
          <ul>
            <li>
              <span>密码重置</span>
              <!-- 点击搜索开始出现table表格 -->
              <span class="iconfont icon-wenhao"></span>
            </li>
            <li>
              <span>范围：</span>
              <div class="schoolcheck1">
                <schoolcheck ref="schoolcheck1"></schoolcheck>
              </div>
              <!-- <select name="school" id="school" selected="selected" value>
                <option value="1">演示中学1</option>
                <option value="2">演示中学2</option>
                <option value="3">演示中学3</option>
              </select>-->
            </li>
            <li>
              <span class="iconfont icon-sousuo" @click="checknode" ></span>
            </li>
          </ul>
        </div>
        <div class="body">
          <div class="work">
            <!-- <span class="reset" @click="reset">重置</span> -->
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
                  v-for="(item,index) in tableData3"
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
                   <td>
                    <span>{{item.id}}</span>
                  </td>
                  <td class="sort">{{item.job_num}}</td>
                  <td class="class">
                    <!-- 点击跳转相关年纪的班级 -->
                    <router-link :to="'/admin/settingStudent?' + item.sort" tag="a">{{item.name}}</router-link>
                  </td>
                  <td>
                    <span>{{item.sex}}</span>
                  </td>
                  <td>
                    <span>{{item.age}}</span>
                  </td>
 <td>
                    <span>{{item.unit_group_name}}</span>
                  </td>
                  <td>
                    <template>
                      <el-button size="mini" @click="setting(item.id)">重置密码</el-button>
                      <!-- <el-button size="mini" type="danger" @click="del(item.sort)">删除</el-button> -->
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
        </div>
         <el-dialog title="密码编辑" :visible.sync="dialogFormVisible1">
      <el-form >
        <el-form-item label="重设密码" >
          <el-input v-model="values.password" autocomplete="off" style="width: 210px;"  type="password"
                placeholder="英文大小写，数字，符号 4-20位"></el-input>
        </el-form-item>
         <el-form-item label="确认密码" >
          <el-input v-model="values.againpass" autocomplete="off" style="width: 210px;"  type="password"
                placeholder="英文大小写，数字，符号 4-20位"></el-input>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="queding()">确 定</el-button>
      </div>
    </el-dialog>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import md5 from "blueimp-md5";
import { log } from "util";
import schoolcheck from "../../../components/schoolcheck";
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";
import { global } from "../../../global/global";

export default {
  data() {
    return {
      isbtnActive: false,
        form: {
        job_num: '',
        phone: '',
        name: "",
        age: '',
        unit_group: '',
        sex: ""
      },

      // 高亮显示
      isactive: "",
      // 头部组件信息
      headson: ["学生资料管理", "学生资料信息"],

      // 切导航行栏
      // tabls: ["查询列表", "资料转移", "密码操作"],
       tabls: ["查询列表", "学生资料转移","密码操作"],
     
      tabindex: 1,
      // 页码
      page: {
        currentPage: 1,
        total: 0,
        flag: false,
        size: 20
      },
      // 编辑
      index1: "",
      //增加数据
      addflag: false,
      dialogFormVisible1:false,
      values: {
        password: "",
        againpass: "",
      },
      thead: ['id',"学号", "姓名", "性别", "年龄", "班级","操作"],

      //请求数据赋值
      tableData3: [],
      // 提交资料
      submitflag: true
    };
  },
  watch: {},

  created() {
    this.getList(this.page.currentPage, this.page.size);
  },
  methods: {
    changegroup(){
             var a=this.$refs.schoolcheck11.item.id-0
             var b=this.$refs.schoolcheck22.item.id-0
             var that = that
            //  无数据集调换失败有可能你转移的这个班级并没有学生存在
             this.axios.get(`/api/v1/admin/user/changeUnitGroup?srcid=${a}&dstid=${b}`).then(function(res){
                 if (res['data']['code']==0) {
                     alert('转移资料成功')
                 }else{
                    alert(res['data']['msg'])
                 }
             })

        
    },
    // getList获取列表数据给tableData3赋值
    getList(currentPage, pagesize,w) {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/admin/user/student/list", {
          page: currentPage,
          size: pagesize,
          w:w
        })
        .then(function(res) {
          var data = res["data"]["data"]['data'];
          data.map(function(item, index) {
            if (item["birth_date"]) {
              var a = new Date().getTime() - new Date(item["birth_date"]);
              var hours = a / 1000 / 60 / 60;
              var year = Math.floor(hours / (24 * 30 * 12));
              console.log(year);
              item["age"] = year;
            } else {
              item["age"] = "无";
            }

            if (!item["name"]) {
              item["name"] = "无";
            }

            item.sex = item.sex + "";
           if (item.sex == 0) {
                item.sex = "女";
            } else {
                item.sex = "男";
            }
          });
          that.tableData3 = data;
            that.tableData3 = data;
            that.page.total = res["data"]["data"]['total'];
          console.log(data);
        });
      // this.page.countpage = Math.ceil(
      //   this.tableData3.length / this.page.pagesize
      // );
    },
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
    // 分页·
    handleSizeChange(val) {
      this.page.size = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    // 增加数据
    addnumber() {
      this.addflag = true;
      console.log(this.addflag);
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },
    //编辑后确定
    queding(id) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false
      this.dialogFormVisible1=false
      console.log(this.value1,this.index1);
      this.addflag = false;
       if (this.values.password !== this.values.againpass) {
        this.$message("两次输入密码不相同");
        return;
      }
      var obj={
        id:this.index1,
        password: md5(this.values.password),
        repassword: md5(this.values.againpass),
      }
      this.axios.post('/api/v1/admin/user/pwdReset',obj).then((res)=>{
           if (res['data']['code']==0) {
             alert('重置密码成功')
           }else{
             res['data']['msg']
           }
      })
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
    },
    // 点击编辑出现文本框
    setting(id) {
      // this.settingflag.id=id
      // console.log(this.settingflag)
            this.dialogFormVisible1=true

      this.index1 = id-0;
            console.log(id,this.index1 );

      
    },
    // 点击删除单条数据
    del(id) {
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
    //点击删除选中的数据
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
      var that=this
       this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
         this.axios.post("/api/v1/admin/user/delRole",{id:newarr}).then(function(res){
        console.log(res)
        if (res['data']['code']==0) {
            that.getList(that.page.currentPage,that.page.size);
            that.$message('删除成功')
        }else{
          that.$message(res['data']['msg'])
        }
      })
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
          if (item["id"] == newarr[i]) {
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
       this.form.unit_group=this.$refs.schoolcheck1.item.id-0
      console.log( this.form);
      var obj ={}
      for(var key in this.form){
         if (this.form[key]) {
           obj[key]=this.form[key]
         }
      }
      this.getList(this.page.currentPage, this.page.size,obj) 
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
    background-color: #169bd5;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
    color: white;
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
       height: 50px;

        span {
          position: absolute;
          left: -20px;
        }
      }

      li:nth-child(1) {
        width: 300px;
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



