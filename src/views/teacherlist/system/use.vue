<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data" id="pages">
      <el-tree
        :data="data4"
        :props="defaultProps"
        node-key="id"
        :expand-on-click-node="false"
        :render-content="renderContent"
      ></el-tree>
    </div>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";

let id = 1000;

export default {
  data() {
    return {
      headson: ["页面资料管理", "页面管理"],

      value5: false,
      data4: [],
      defaultProps: {
        children: "children",
        label: "menu_name"
      }
    };
  },
  created() {
    this.navbardata()
  },
  methods: {
    navbardata(){
      var that =this
        this.axios
        .get("/api/v1/admin/menu")
        .then(function(res) {
         var data = res["data"]["data"];
          var obj=[]
          var arr=[]
            function a(group,obj) {
            for (var key in group) {              
                if (group[key]["items"].length !== 0) {
                  for(var key1 in group[key]["items"]){
                   if (group[key]["items"][key1]['flag']==0) {
                      group[key]["items"]=[]
                      break;//如果找到有flag==0设置成空数组跳出当前这层循环 这个带有flag的items都设置成空数组了后面的没办法在循环了其他数据了，
                    }
                  }
                   a(group[key]["items"],obj)
                }
            }  
            return group;//如果函数内部重新用变量group1接收data才会重新赋值成功为[]
          }
         var data1= a(data,obj)
         that.func(data1,arr)
         that.data4=arr

        })
    },
     func(obj,arr){
         for(var key in obj){
           arr.push(obj[key])
           if (obj[key]["items"]!==0) {
             var arr1 = []
              obj[key]['children']=arr1
              this.func(obj[key]["items"],arr1)
            
             
           }
         }
     },
    renderContent(h, { node, data, store }) {
      // 判断data的status 赋值给value
      var value = this.value5;
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
         
            <el-switch value={value} on-change={() => this.append(data)} active-color="#13ce66"
  inactive-color="#ff4949" active-value="on"
    inactive-value="off"></el-switch>
          </span>
        </span>
      );
    },
    append(data) {
      // 根据data取得当前数据status/id/pid=>如果staus为开，就当前数据设置成关，反之
      // const newChild = { id: id++, label: "testtest", children: [] };
      // if (!data.children) {
      //        console.log(  data)

      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    }
  },

  components: {
    headson: headson
  }
};
</script>

<style scoped lang="scss">
.box{
  display: inline-block;
  height: 20px;
  width: 50px;
}
.on{
  background-color: green
}
.off{
  background-color: red;
}
.red {
  background-color: blue;
}
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