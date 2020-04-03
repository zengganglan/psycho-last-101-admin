<template>
  <div>
    <headson :headson="headson"></headson>

    <div class="search">
      <ul>
        <li>
          <div>
            <el-input placeholder="请输入内容" v-model="formLabelWidth" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择" size="large">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div class="box">
        <div class="calendarbox">
          <h3 style="backgroundColor:#008000">无预约时段</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#169BD5">尚未处理时段</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#FF9900">教师已确认预约</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#FF0000">双方已确认</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#999999">忙碌状态</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#333333">开始咨询</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
      </div>
      <div style="text-align: center;margin-top:10px">
        <el-button type="primary" plain @click="back()">返回</el-button>
        <el-button type="primary" plain @click="back()">增加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import headson from "../../../components/headson";

export default {
  data() {
    return {
      headson: ["访谈邀请安排", "邀请时间记录"],

      formLabelWidth: 300,
      select: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  components: {
    headson: headson
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin-top: 50px;
  width: 400px;
  ul {
    width: 100%;
    display: flex;
    padding-top: 25px;
    justify-content: center;
    li {
      width: 4rem;
      .el-select {
        width: 100px;
      }
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
.box {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .calendarbox {
    width: 250px;
    margin: 10px 10px;
    h3 {
      font-weight: 400;
      font-size: 15px;
      color: #ffffff;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
    div {
      min-height: 120px;
      font-size: 12px;
      border: 1px solid #9f9a9b;
    }
  }
}
</style>