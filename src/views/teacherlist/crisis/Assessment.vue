<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data">
      <!-- <div class="chart" ref="chart"></div> -->
       <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        :cell-style="{width:'80px',height:'30px'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="scale_name" label="量表名称"></el-table-column>
        <el-table-column prop="stu_name" label="学生"></el-table-column>
        <el-table-column prop="start_test_time" label="测试时间"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="times" label="耗时"></el-table-column>
        <el-table-column prop="valid" label="有效"></el-table-column>
        <!-- <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)">数据统计</el-button>
          </template>
        </el-table-column> -->
      </el-table>
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
    </div>
    <!-- <div class="add">提交</div> -->
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";
import moment from 'moment'
export default {
  data() {
    return {
      obj:{
                scale_id: 12,

      },
      tableData:[],

       // 页码
      page: {
        currentpage: 1,
        countpage: 0,
        pagesize: "10",
        flag: false
      },
      headson: ["危机管理数据", ""],
      multipleSelection:"",
      data: {
        // value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: "",
        input: "",
        value5: "100",
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          }
        ]
      }
    };
  },
  mounted() {
    // this.draw();
          this.getlist(this.page.currentpage, this.page.pagesize,this.obj);

  },
  methods: {
     handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
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
      getlist(currentpage, pagesize, w,id) {
      // 获得列表数据
      // console.log(w)
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      if (!id) {
        id = "";
      }
      var that = this;
      this.axios
        .post("/api/v1/admin/scale/getTestResultList" , {
          page: currentpage,
          size: pagesize,
          w:w,
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            that.page.countpage = res["data"]["data"]["total"];
            that.tableData = res["data"]["data"]["list"];
            that.tableData.map((item, index) => {
              if (item["birth_date"]) {
                var a = new Date().getTime() - new Date(item["birth_date"]);
                var hours = a / 1000 / 60 / 60;
                var year = Math.floor(hours / (24 * 30 * 12));
                console.log(year);
                item["age"] = year;
              } else {
                item["age"] = "null";
              }
              item["times"] = moment(
                moment(item["end_test_time"]) - moment(item["start_test_time"])
              ).format("HH:mm:ss");
              if (item.sex == 0) {
                item.sex = "女";
              } else {
                item.sex = "男";
              }
              if (item.valid-0 == 1) {
                item.valid = "有效";
              } else {
                item.valid = "无效";
              }
              if (item.type == 2) {
                item.type = "自测";
              } else {
                item.type = "普查";
              }
            });
          }
        });
    },
    draw() {
      var chart = this.$refs.chart;
      console.log(chart);
      this.myChart = this.$echarts.init(chart);
      var option = {
        title: {
          text: "危机干预综合信息"
        },
        color: ["#3398DB"],
        legend: {
          data: ["销量"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "7%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["潜在风险评估", "自杀倾向评估"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "2015",
            type: "bar",
            barWidth: "100",
            data: [10, 52]
          }
        ]
      };
   
      this.myChart.setOption(option);
      this.myChart.resize();
      var that = this
      this.myChart.on("click", function(params) {
        console.log(params);
        if (params.name == "潜在风险评估") {
            // that.$router.push('/crisis/asses/danger')
        } else if (params.name == "自杀倾向评估") {
                        // that.$router.push('/crisis/asses/diebefore')

        } else if (params.name == "鉴别评估") {
                        // that.$router.push('/crisis/asses/check')

        } else {
                                // that.$router.push('/crisis/asses/lifeThing')

        }

        // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
      });
    }
  },

  components: {
    headson: headson,
    pagination: pagination
  }
};
</script>

<style scoped lang="scss">
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

.data {
  min-height: 640px;
  border: 1px solid #e6e6e8;
  margin: 0 50px;
  margin-top: 30px;
  background-color: #ffffff;
  .chart {
    width: 1000px;
    margin: auto auto;
    height: 500px;
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
  top: 20px;
  color: gray;
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>