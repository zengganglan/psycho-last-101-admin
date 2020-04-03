<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->
    <!-- <div class="search">
      <ul>
        <li>
          发送日期：
          <select name v-model="formLabelWidth" id="type">
            <option
              :value="item['id']"
              v-for="(item,index) in $store.state.adminGroup"
              :key="index"
              selected="selected"
            >{{item['title']}}</option>
          </select>
        </li>
        <li>
          咨询师：
          <select name v-model="formLabelWidth" id="type">
            <option
              :value="item['id']"
              v-for="(item,index) in $store.state.adminGroup"
              :key="index"
              selected="selected"
            >{{item['title']}}</option>
          </select>
        </li>
        <li>
          <span>关键字:</span>
          <input type="text">
          <i data-v-30c34ff0 class="iconfont icon-sousuo"></i>
        </li>
      </ul>
    </div> -->
    <div class="data" id="calendar">
      <span ref="toop" class="toop">提示:{{title}}</span>
      <full-calendar
        :events="monthData"
        class="test-fc"
        :config="config"
        ref="calendar"
        first-day="1"
        locale="fr"
        @event-selected="eventClick"
        @day-click="dayClick"
        @event-mouseover="eventMouseover"
        @event-mouseout="eventmouseout"
        @view-render='viewrender'
      ></full-calendar>
    </div>
    <!--点击更多触发事件@event-LimitClick='eventLimitClick'
    -->
    <!-- <div>
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
    </div> -->

    <!-- <div class="add" @click="addnumber">新增预约</div> -->
    <ul id="msg" style="margin-top:50px">
      <li style="color:#19be6b;" title="学生段可预约此时段，管理员段点击后可以手动添加预约（即指定）">◼ 没有预约</li>
      <li style="color:#2d8cf0;" title="管理员点击后可以进行回复、确认、删除等处理">◼ 有人预约</li>
      <!-- <li style="color:#ff9900;" title="管理员已经接受的预约，等待学生端再次确认">◼ 有人预约，教师确认</li> -->
      <li style="color:#7C2E9B;" title="该时段已经添加了咨询记录，可以查看或者修改">◼ 正在咨询</li>
    </ul>
    <el-dialog title="咨询时间添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="星期" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择" @change="changevalue" value-key>
            <el-option
              v-for="item in this.$store.state.sandgroups"
              :key="item.id"
              :label="item.name"
              :value="item.name"
              
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间起" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 210px;" type="time"></el-input>
        </el-form-item>
        <el-form-item label="时间止" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 210px;" type="time"></el-input>
        </el-form-item>
        <el-form-item label="咨询师" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择" @change="changevalue" value-key>
            <el-option
              v-for="item in this.$store.state.sandgroups"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="makesure()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="咨询时间编辑" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="沙盘组名称" :label-width="formLabelWidth">
          <el-input v-model="form1.name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form1.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editsure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";
// import fullCalendar from 'vue-fullcalendar'
import { FullCalendar } from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.css";
import moment from "moment";

export default {
  data() {
    return {
      // 鼠标滑过显示内容
      title: "",
      Mouseoverflag:true,
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
      config: {
        locale: "zh-cn",
        header: {
          left: "month",
          center: "title",
          right: "today prev,next,prevYear,nextYear "
        },
        // allDaySlot : false,
        allDay: true,
        defaultView: "month",
        displayEventTime: false,
        eventLimit: 4,
        eventLimitText: "更多",
        allDayDefault: false,
        eventLimitClick: "popover"
      },
      monthData: [],
      // 头部组件信息
      headson: ["预约管理", "预约时间主题管理"],
      tableData: [
        {
          id: "1",
          a1: "周一",
          a2: "2:00-400",
          a3: "50"
        },
        {
          id: "1",
          a1: "周一",
          a2: "2:00-400",
          a3: "50"
        }
      ],
      multipleSelection: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 0,
        pagesize: "10",
        flag: false
      },
      currentRow: null,
      spanArr: [],
      pos: ""
    };
  },
  created() {
    // this.viewrender();
    this.changeobj(this.tableData);
  },
  methods: {
    viewrender(view,element){
    var a=this.$refs.calendar.fireMethod('getDate')['_d']     
    var that= this
    that.monthData=[]
    this.axios.post('/api/v1/admin/counsel/monthList',{
      year:a.getFullYear(),
      month:a.getMonth()+1
    }).then(function(res){
       var data= res["data"]["data"]
            data.map((item,index)=>{
              item['date']=moment(item['start_time']).format('YYYY-MM-DD')
              item['times']=moment(item['start_time']).format('HH:mm:ss')+'至'+moment(item['end_time']).format('HH:mm:ss')+' '+item['name']+' '+item['funcname']
              var obj={}
              obj['title']=item['times']
              obj['start']=item['start_time']
              obj['end']=item['end_time']
              var sta = item['status']
              // 已改只有3状态：0空闲，1已被预约
              if (sta==1) {
                 var tt= moment().isBetween(item['start_time'], item['end_time'])
                 if (tt) {
                   sta=4
                 }
              }
              switch (sta-0) {
                case 0:
                  obj['backgroundColor']='rgb(25, 190, 107)'
                  break;
              
                 case 1:
                  obj['backgroundColor']='rgb(45, 140, 240)'

                  break;
                case 3:
                  obj['backgroundColor']='rgb(255, 153, 0)'
                  break;  
                case 4:
                  obj['backgroundColor']='rgb(124, 46, 155)'
                  break;
              }
              that.monthData.push(obj)
            })
                        // console.log(data)

    })
    },
     getfunc(){
      var that = this
      this.axios.post('/api/v1/admin/func/selectList').then(function(res){
          if (res['data']['code']==0) {
          that.funcs=res['data']['data']
          }
      })
    },
    getlist(year, month) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/admin/counsel/monthList", {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            that.page.countpage = res["data"]["data"]["total"];
            that.tableData = res["data"]["data"]["list"];
          }
          console.log(res);
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
      this.dialogFormVisible1 = true;
      this.form1.id = row.id;
      this.form1.name = row.name;
      this.form1.unit_name = row.unit_name;
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
    handleDelAll() {},
    changevalue() {},
    changeMonth(start, end, current) {
      // console.log("changeMonth", start, end, current);
    },
    eventClick(event, jsEvent, pos) {
      // console.log("eventClick", event, jsEvent, pos);
    },
    dayClick(day, jsEvent) {
      console.log("dayClick", day, jsEvent);
      // this.$router.push({path:'/Consultation/appointDetail'})
    },
    moreClick(day, events, jsEvent) {
      // console.log("moreCLick", day, events, jsEvent);
    },
    eventMouseover(day, events, jsEvent) {
      // console.log(day, events, jsEvent)
      var that=this
      if (that.Mouseoverflag) {
           this.$refs.toop.style.display = "block";
           var scrollTop=document.documentElement.scrollTop || document.body.scrollTop; //滚动条滚动的距离浏览器兼容
           this.$refs.toop.style.left = events.clientX + "px";
           this.$refs.toop.style.top = events.clientY + scrollTop + "px";
           this.title = day["title"];
          that.Mouseoverflag=false;
       }
     
    },
    eventmouseout() {
      this.Mouseoverflag=true;
      this.$refs.toop.style.display = "none";
    },
    eventLimitClick() {
      console.log("ssss");
    }
  },
  components: {
    headson: headson,
    pagination: pagination,
    "full-calendar": FullCalendar
  }
};
</script>

<style scoped lang="scss">
#msg {
  display: flex;
  justify-content: center;
  font-size: 16px;
  li {
    display: inline-block;
    margin-right: 10px;
  }
}
// .a1 {
//   background-color: rgb(25, 190, 107);
// }
// .a2 {
//   background-color: rgb(45, 140, 240);
// }
// .a3 {
//   background-color: rgb(255, 153, 0);
// }
// .a4 {
//   background-color: rgb(124, 46, 155);
// }
.tr {
  height: 40px;
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
      width: 300px;
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
  .toop {
    position: absolute;
    z-index: 999999;
    display: block;
    font-size: 14px;
    background-color: #f3fdf2;
    color: #b6e184;
    display: none;
    // left: 0;
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