<template>
  <div class="main">
    <headson :headson="headson"></headson>

    <div class="search">
      <ul>
        <li>
          <el-checkbox-group v-model="type" @change="changefun()">
            <el-checkbox-button
              v-for="(item,index) in group"
              :label="item['type']"
              :key="index"
            >{{item['name']}}</el-checkbox-button>
          </el-checkbox-group>
        </li>
        <li>
          <!-- <el-button type="primary" plain @click="archive">
            <i class="iconfont icon-daochu1"></i>浏览档案
          </el-button> -->

          <!-- <input type="text" value id="person">
              <i class="iconfont icon-sousuo" @click="showtable()"></i>
          <span class="iconfont icon-wenhao"></span>-->
        </li>
      </ul>
    </div>
    
    <div class="body">
      <div class="block">
        <el-timeline >
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
            <el-timeline-item
              placement="top"
              color="#C0D3E1"
              size="large"
              icon="el-icon-more"
              type="primary"
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              <el-card :class="{aClass: activity.types==1,bClass: activity.types==2,mClass: activity.types==3,nClass: activity.types==4}">
                <el-checkbox :label="activity.id" :key="activity.id">
                  <h4>{{activity.timestamp}}</h4>
                  <p>{{activity.content}}</p>
                </el-checkbox>
              </el-card>
            </el-timeline-item>
          </el-checkbox-group>
          <!-- <el-timeline-item  placement="top"  color="#C0D3E1" size="large" icon="el-icon-more" type='primary'  v-for="(activity, index) in activities"  :key="index" :timestamp='activity.timestamp'>
          <el-card>
                   <h4>{{activity.timestamp}}</h4>
            <p>{{activity.content}}</p>
          
          </el-card>
          </el-timeline-item>-->
        </el-timeline>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import headson from "../../../components/headson";

export default {
  data() {
    return {
      type: [],
      checkAll: false,
      isIndeterminate: true,
      checked: [1, 2],
      headson: ["学生个人档案", "个人档案资料导出记录"],
      group: [
        {
          type: 1,
          name: "留言"
        },
        {
          type: 2,
          name: "咨询"
        },
        {
          type: 3,
          name: "访谈"
        },
        {
          type: 4,
          name: "测评"
        }
      ],
         activities: [
        {
          id: 1,
          content: "更新留言",
          timestamp: "2018-03-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
          types: 1
        },
        {
          id: 2,

          content: "咨询记录",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
          types: 2
        },
        {
          id: 3,

          content: "访谈记录",
          timestamp: "2018-04-02 20:46",
          size: "large",
          types: 3
        },
        {
          id: 4,

          content: "留言",
          timestamp: "2018-04-01 20:46",
          types: 1
        },
        {
          id: 5,
          content: "测评",
          timestamp: "2018-03-03 20:46",
          types: 4
        }
      ],
      
      activities1: [
        {
          id: 1,
          content: "更新留言",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
          types: 1
        },
        {
          id: 2,

          content: "咨询记录",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
          types: 2
        },
        {
          id: 3,

          content: "访谈记录",
          timestamp: "2018-04-03 20:46",
          size: "large",
          types: 3
        },
        {
          id: 4,

          content: "留言",
          timestamp: "2018-04-03 20:46",
          types: 1
        },
        {
          id: 5,
          content: "测评",
          timestamp: "2018-04-03 20:46",
          types: 4
        }
      ]
    };
  },
  created() {
    console.log(this.checked);
  },
  methods: {
    getlist() {
      var type = this.type;
      var data = [];
      this.activities1.map((item, index) => {
        type.map(item1 => {
          if (item.types == item1) {
            data.push(item);
          }
          console.log(item, item1);
        });
      });
      this.activities = data;
      console.log(data, type);
      this.handleCheckAllChange();
    },
    handleCheckAllChange(val) {
      if (this.checked) {
        this.checked = [];

        this.activities.map((item, index) => {
          this.checked.push(item.id);
        });
      } else {
        this.checked = [];
      }
      // if (this.checked=val) {
      //                 this.checked=[ ]

      //      this.activities.map((item,index)=>{
      //         this.checked.push(item.id)
      //      })
      //  }else{
      //    this.checked=[]
      //  }
      // this.checked = val ? this.activities : [];
      console.log(val, this.checked);

      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.activities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.activities.length;
    },
    archive() {
      this.$router.push({ path: "/student/archives", query: { id: 27 } });
    },
    changefun() {
      console.log(this.type);
      this.getlist();
    }
  },
  // 头部组件信息
  components: {
    headson: headson
  }
};
</script>

<style scoped lang='scss'>
.top1 {
  height: 112px;
  //  border-bottom: 1px solid #BDC0C3;
  padding-left: 24px;
  padding-top: 18px;
  background-color: #ffffff;
  box-shadow: #bdc0c3 1px 1px 10px;
  > .left {
    display: inline-block;
    width: 75px;

    text-align: center;
  }
  > .right {
    display: inline-block;
    > .help {
      margin-bottom: 10px;
      > span {
        margin-right: 40px;
      }
    }
    > .dear {
      margin-bottom: 10px;
    }
    > .btn {
      background-color: #fff;
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
    // li:nth-child(1) {
    //   margin-left: 50px;
    //   margin-right: 150px;
    //   margin-top: 10px;
    //   .schoolcheck1 {
    //     position: relative;
    //     top: -30px;
    //     left: 40px;
    //     width: 250px;
    //   }
    // }
    li:nth-child(1) {
      select {
        border: 2px solid #e2e2e2;
        width: 200px;

        height: 35px;
      }
    }
    li:nth-child(2) {
      // width: 500px;
      float: right;
      margin-left: 50px;
      // #person {
      //   height: 32px;
      //   outline: none;
      //   width: 200px;
      //   outline: none;
      //   border: none;

      //   border: 2px solid #e2e2e2;
      // }
      // .icon-sousuo {
      //   display: inline-block;
      //   font-size: 22px;
      //   vertical-align: middle;
      //   height: 32px;
      //   width: 30px;
      //   line-height: 32px;
      //   text-align: center;
      //   color: #bad6fc;
      //   position: relative;
      //   left: -5px;
      //   top:-1px;
      //   border: 2px solid #e2e2e2;
      //   border-left: none;
      // }
      // .icon-wenhao {
      //   color: #169bd5;
      //   font-size: 25px;
      // }
    }
  }
}
.body {
  width: 59%;
  margin-top: 100px;
  margin-left: 50%;
  transform: translateX(-40%);
  .el-timeline-item {
    width: 300px;
    height: 100px;
  }
}
.aClass{
  background-color: #BDD8E1;
}
.bClass{
  background-color: rgb(232, 193, 186);
}
.mClass{
  background-color: rgb(206, 188, 228);
}
.nClass{
  background-color: #D8DAD9;
}
</style>