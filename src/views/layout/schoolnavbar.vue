


    <template>
  <div class="nav" ref="nav">
    <!-- <ul class="left">
      <li
        v-for="(value,index) in leftdata"
        :key="index"
        :class="{firstnav:index==domIindex}"
        @click="showright(index,$event)"
        ref="dom"
      >
        <span>{{value}}</span>
      </li>
    </ul>-->

    <ul class="right" v-show="rightflag">
      <li>
        <ul>
          <el-row class="tac">
            <el-col :span="12">
              <!--<h5>
                <i :class=" 'iconfont '+icon"></i>
                {{title}}
              </h5>-->
              <!-- bug :default-active="$route.path"
              -->
              <el-menu
                class="el-menu-vertical-demo"
                @select="handleOpen($event)"
                @close="handleClose"
                text-color="#fff"
                active-text-color="#00CBA3"
                router
              >
                <!-- <div v-for="(value,index) in navbardata" :key="index">
                  <el-menu-item :index="'/'+value['menu_route']+''" v-if="value['items'].length==0">
                    <span slot="title">{{value['menu_name']}}</span>
                  </el-menu-item>
                  <el-submenu :index="value['id']+''" v-else>
                  <template slot="title">
                      <span>{{value['menu_name']}}</span>
                  </template>
                  <el-menu-item-group
                      v-for="(valueson,indexson) in value['items']"
                      :key="indexson"
                    >
                      <el-menu-item :index="'/'+valueson['menu_route']+''">{{valueson['menu_name']}}</el-menu-item>                      
                    </el-menu-item-group>
                  </el-submenu>
                </div>-->
                <sidebar-item v-for="(menu,index) in navbardata" :key="index" :item="menu" />
              </el-menu>
            </el-col>
          </el-row>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import navbar from "../../vendor/schoolnavbar";
import { global } from "../../global/global";
import SidebarItem from "../../components/SidebarItem";

export default {
  name: "Navbar",
  data() {
    return {
      userId: 1,
      navbardata: [],
      rightdata: {},
      leftdata: [],
      title: "",
      icon: "",
      domIindex: 0,
      keys: [],
      rightflag: true,
      routename: ""
    };
  },
  components: { SidebarItem },

  watch: {
    $route() {
      this.handleOpen(this.routename);
    }
  },
  mounted() {
    this.navbardata1();
  },
  methods: {
    hanselect(event) {},
    handleOpen(key) {
      this.routename = key;

      console.log(key, this.$route.path);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    sortnumber(a, b) {
      return a - b;
    },
    navbardata1() {
      var that = this;
      var data = navbar;
      // 根据sort排序 数组不会影响顺序
      var arr = [];
      for (var key in data) {
        arr.push(data[key].sort);
      }
      arr.sort(that.sortnumber);
      arr.map(item => {
        for (var key in data) {
          if (item == data[key]["sort"]) {
            that.navbardata.push(data[key]);
          }
        }
      });
      // 刷新匹配路由渲染当前状态路由,根据当前路由匹配双向状态改变

      var index1;
      that.navbardata.map((item, index) => {
        console.log(that.$route.path.indexOf(item["menu_route"]));
        if (that.$route.path.indexOf(item["menu_route"]) !== -1) {
          console.log(item["menu_route"], index);
          index1 = index;
        }
      });
      console.log(that.navbardata, index1);

      // for (var key in that.navbardata) {
      //   that.keys.push(key);
      //   that.leftdata.push(that.navbardata[key]["menu_name"]);
      // }

      // that.showright(index1);
    },
    showright(index) {
      let right = this.navbardata[this.keys[index]];
      console.log(right);
      this.title = right["menu_name"];
      this.icon = right["icon"];
      this.rightdata = right["items"];
      console.log(this.rightdata);
      this.domIindex = index;
      if (right["items"].length == 0) {
        console.log(right["menu_route"]);
        this.rout(right["menu_route"]);
        this.$refs.nav.style.width = "122px";
        this.rightflag = false;
      } else {
        this.$refs.nav.style.width = "332px";
        this.rightflag = true;
      }
    },
    rout(value) {
      // console.log(key,value);
      console.log(value);
      this.$router.push("/" + value);
    },
    creatdata(nodes, treerootId) {
      var groups = {};
      for (var i in nodes) {
        // 不是根节点
        if (!groups[nodes[i].pid]) {
          groups[nodes[i].pid] = [];
        }
        groups[nodes[i].pid].push(nodes[i]);
      }
    },
    findroute(arr, pid) {
      var that = this;
      for (var key in arr) {
        if (arr[key]["id"] == pid) {
          if (arr[key]["pid"]) {
            pid = arr[key]["pid"];
            return that.findroute(arr, pid);
          } else {
            var id = arr[key]["id"];
            // console.log(arr[key]['id'])
            return id;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h5 {
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 25px;
  border-bottom: 1px solid #727272;
  color: white;
  background-color: rgb(48, 50, 64);
  i {
    font-size: 40px;
  }
}
.icon-rentou {
  font-size: 60px;
  color: #999999;
  vertical-align: middle;
}

.el-col {
  width: 100%;
}
.el-menu-item,
.el-submenu__title,
.el-submenu {
  width: 210px;
}
.el-menu-item {
  height: 75px;
}
.el-menu-item-group__title {
  padding: 0;
  line-height: 0;
}
.nav {
  width: 250px;
  // height: 1250px;
  background-color: #21212d;
  position: relative;
  // overflow: hidden;

  > .left {
    z-index: 2;
    position: absolute;
    width: 122px;
    top: 0;
    left: 0;
    // height: 1250px;
    background-color: #21212d;
    letter-spacing: 3px;
    font-size: 20px;

    > li {
      background-color: #21212d;
      height: 60px;
      width: 100%;
      line-height: 60px;
      text-align: center;
      position: relative;
      color: #5c7fd9;
      overflow: hidden;
      cursor: pointer;
      //   text-overflow:ellipsis;
      //   white-space: nowrap;
      span {
        display: inline-block;
        width: 100%;
        position: absolute;
        left: 0;
        font-size: 16px;
      }
    }
    .firstnav {
      background-color: rgb(48, 50, 64);
      color: white;
    }
  }
  > .right {
    // width: 219px;
    // margin-left: 122px;
  background-color: #00CBA3;
    height: 100%;
  }
}
</style>