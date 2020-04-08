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
      <li class="data1" v-if="tabindex==5">
        <div class="search">
          <ul>
            <li>
              <span>范围：</span>
              <div class="schoolcheck1">
                <schoolcheck></schoolcheck>
              </div>
              <!-- <select name="school" id="school" selected="selected" value>
                <option value="1">演示中学1</option>
                <option value="2">演示中学2</option>
                <option value="3">演示中学3</option>
              </select>-->
            </li>
            <li><span>类型：</span> <select name=""  v-model="Groupid" id="type">
                <option :value="item['id']" v-for="(item,index) in group" :key="index" selected = "selected">{{item['title']}}</option>

              </select></li>
            <li>
              <span>学生查询：</span>
              <input type="text" value id="person">
              <!-- 点击搜索开始出现table表格 -->
              <i class="iconfont icon-sousuo" @click="showtable()"></i>
              <span class="iconfont icon-wenhao"></span>

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
        <!-- <span class="del" @click="handleDelAll" :class="{ btnactive: isbtnActive }">
          删除
          <i class="iconfont icon-trash"></i>
        </span> -->
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
                >
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
              @click="setting(item.sort)"
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
                >
              </td>
              <td class="sort">{{item.sort}}</td>
              <td class="class">
                <input v-if="item.sort==index1" type="text" v-model="item.b">
                <!-- 点击跳转相关年纪的班级 -->
                <router-link v-else :to="'/admin/comments?id='+item.sort" tag="a" :style="{color:'blue'}">{{item.b}}</router-link>
              </td>
              <td>
                <input v-if="item.sort==index1" type="text" v-model="item.c">
                <span v-else>{{item.c}}</span>
              </td>
              <td>
                <input v-if="item.sort==index1" type="text" v-model="item.d">
                <span v-else>{{item.d}}</span>
              </td>

               <td>
                        <template v-if="item.sort==index1">
               
                    <el-button  size="mini" @click.stop="queding()">确定</el-button>
                  <el-button  size="mini" type="danger"  @click.stop="cancle()">取消</el-button>
                </template>
                   
                 <template v-else>
                  <el-button size="mini" @click="setting(item.sort)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="del(item.sort)">删除</el-button>
                </template>
                </td>
            </tr>
            <template v-if="addflag">
              <tr>
                <td align="center">
                  <input type="checkbox" name="available" value="0" class="icheck">
                </td>
                <td class="sort">{{tableData3.length+1}}</td>
                <td class="class">
                  <input type="text" v-model="values.value1">
                </td>
                <td>
                  <input type="text" v-model="values.value2">
                </td>
                <td>
                  <input type="text" v-model="values.value3">
                </td>

                <template>
               
                    <el-button  size="mini" @click.stop="queding()">确定</el-button>
                  <el-button  size="mini" type="danger"  @click.stop="cancle()">取消</el-button>
                </template>
                   
              </tr>
            </template>
          </tbody>
        </table>
      </div>
 <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
     </div>
        </div>
        
      </li>
   
      <li class="data3" v-else>
         <div class="search">
          <ul>
            <li>
              <span>范围：</span>
              <div class="schoolcheck1">
                <schoolcheck ref="schoolcheck1"></schoolcheck>
              <span class="iconfont icon-sousuo" @click="checknode" ></span>

              </div>
            </li>
            <!-- <li><span>类型：</span> <select name=""  v-model="Groupid" id="type">
                <option :value="item['id']" v-for="(item,index) in group" :key="index" selected = "selected">{{item['title']}}</option>

              </select></li>
            <li>
              <span>学生查询：</span>
              <input type="text" value id="person">
              <i class="iconfont icon-sousuo" @click="showtable()"></i>
              <span class="iconfont icon-wenhao"></span>
            </li> -->
          </ul>
        </div>
        <div class="body"
        
        >
          <!-- <div class="work">
        <span class="export" @click="handleDownload">
          导出
          <i class="iconfont icon-daochu1"></i>
        </span>
        <span class="del" @click="handleDelAll">
          删除
          <i class="iconfont icon-trash"></i>
        </span>
      </div> -->
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
                  v-bind:class="{heightcolor:isactive==item.sort}"
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
                    <span  style=" color: #169bd5;cursor:pointer" @click="goreport(item.id)">{{item.name}}</span>
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
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import schoolcheck from "../../../components/schoolcheck";
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";
import { global } from "../../../global/global";



export default {
  
  data() {
    return {
             isbtnActive:false,

      // 角色组
      Groupid:"",
      group:"",
        // 高亮显示
      isactive: "",
      // 头部组件信息
      headson: ["学生评价", "学生评价信息"],
      // 筛选
      filterText: "",
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        treeflag: false
      },
      // 切导航行栏
      // tabls: ["学生评语", "成长档案"],
            tabls: [ "成长档案"],

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
      values: {
        value1: "",
        value2: "",
        value3: ""

      },
       form: {
        job_num: '',
        phone: '',
        name: "",
        age: '',
        unit_group: '',
        sex: ""
      },
      thead: ['id',"学号", "姓名", "性别", "年龄", "班级"],
      thead1: ["序号", "学号", "姓名"],

      //请求数据赋值
      tableData3: [
      
      ],
      // 提交资料
      submitflag:true
    };
  },
  watch: {
     
  },

  created() {
         this.group=this.$store.state.adminGroup

    this.getList(this.page.currentPage, this.page.size);
  },
  methods: {
    goreport(id){
      this.$router.push({path:'/admin/resports',query:{id:id}})
    },
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
              item["age"] = "null";
            }

            if (!item["name"]) {
              item["name"] = "null";
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
    
    // 分页·
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      console.log(this.value1);
      this.addflag = false;
      this.index1 = "";
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
      console.log(id);
      this.index1 = id;
    },
    // 点击删除单条数据
    del(id) {},
    //点击删除选中的数据
    handleDelAll() {
      var icheck = this.$refs.icheck;
      var newarr = [];
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          // 找到选中单选框数据的id唯一值
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
        this.isbtnActive=true;
      } else {
        event.target.parentNode.parentNode.style.backgroundColor = "";
      }
      allcheck.checked = flag;
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
            // 1
            if (item["id"] == newarr[i]) {
              newtable.push(item);
            }
          });
        }       
      const tHeader =this.thead;
      // 2
     const filterVal = ["id", "job_num", "name", "unit_group",'phone','auth_group_id','last_login'];
     global.handleDownload(tHeader,filterVal,newtable)
    },
   
    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },
    // 搜索功能
    showtable() {
      // this.defaultProps.treeflag = false;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      
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
    //过滤操作
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //
    showtree() {
      this.defaultProps.treeflag = !this.defaultProps.treeflag;
    },
     // 划过事件
    changecolor(index) {
      console.log(index);
      this.isactive = index - 0 + 1;
    },
    colorcancel() {
      this.isactive = "";
    },
    
  },
  components: {
    schoolcheck: schoolcheck,
    headson: headson,
    pagination:pagination
  }
};
</script>

<style lang="scss" scoped>
.heightcolor {
  background-color: #f8f8fa;
}
.tabactive {
  color: #6998fb;
  border-bottom: 10px solid #6998fb;
}


.pages{
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
        margin-top: 10px;
        .schoolcheck1 {
          position: relative;
          top: -30px;
          left: 40px;
          width: 250px;
        }
      }
      li:nth-child(2){
         select{
           border: 2px solid #e2e2e2;
           width: 200px;

           height: 35px;
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
          top:-1px;
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
          top:3px
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
  .data3{
    .search{
      position: relative;
  .icon-sousuo {
          display: inline-block;
          font-size: 22px;
          vertical-align: middle;
          height: 32px;
          width: 30px;
          line-height: 32px;
          text-align: center;
          color: #bad6fc;
          position: absolute;
          left: 255px;
          top:0px;
          border: 2px solid #e2e2e2;
          border-left: none;
          cursor: pointer;
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

}
.btnactive{
  background-color: #c6e2ff !important
  ;
}
</style>



