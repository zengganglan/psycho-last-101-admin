<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data">
      <table class="a1">
        <!-- <tr>
          <td>同表重测间隔：</td>
          <td>
  <el-select v-model="data.value" placeholder="请选择" style="width:300px">
    <el-option
      v-for="item in data.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>          </td>
        </tr>-->
        <!-- <tr>
          <td>无效问卷判断：</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>-->
        <tr>
          <td>学生测试结果许可：</td>
          <td>
            <el-switch v-model="data.stu_view" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
                inactive-value="0"></el-switch>
          </td>
        </tr>
        <tr>
          <td>测前学生资料完善许可：</td>
          <td>
            <el-switch v-model="data.profile_check" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
                inactive-value="0"></el-switch>
          </td>
        </tr>
        <tr>
          <td>学生自测功能开发：</td>
          <td>
            <el-switch v-model="data.self_testing" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
                inactive-value="0"></el-switch>
          </td>
        </tr>

        <tr>
          <td>学生端普测量表页面显示说明：</td>
          <td>
            <el-input v-model="data.testing_desc"  type="textarea" placeholder="学生端普测量表页面显示说明" style="width:500px"></el-input>
            <span class="iconfont icon-question-circle-fill"></span>
          </td>
        </tr>
      </table>
    </div>
    <div class="add" @click="sub">提交</div>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";

export default {
  data() {
    return {
      headson: ["测量参数设置", "有关测量的参数设置"],
      data: {
        stu_view: 0,
        profile_check: 0,
        self_testing: 0,
        testing_desc: ""
      }
    };
  },
  created() {
     this.getdata()
  },
  methods: {
    getdata(){
      var that = this
         this.axios.get('/api/v1/admin/setting/getScaleSetting').then((res)=>{
           if (res['data']['code']==0) {
              var data = res['data']['data']
           that.data.stu_view=data['stu_view']
           that.data.profile_check=data['profile_check']
           that.data.self_testing=data['self_testing']
           that.data.testing_desc=data['testing_desc']
           }
         })
    },
    sub(){
      var that = this
      this.axios.post('/api/v1/admin/setting/saveScaleSettings',this.data).then(function(res){
          if (res['data']['code']==0) {
          that.$message('设置参数成功')
          that.getdata()
        }
      })
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
  .a1 {
    width: 100%;
    tr {
      height: 50px;
      border-bottom: 1px dashed #9f9a9b;
      td:nth-child(1) {
        width: 200px;
        vertical-align: center;
        text-align: right;
      }
      td:nth-child(2) {
        vertical-align: center;
        text-align: right;
        padding-right: 100px;
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
  top: -50px;
  color: gray;
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>