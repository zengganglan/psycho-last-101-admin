// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 解决在IE和360兼容模式下无法显示问题
import 'babel-polyfill'
import Vue from 'vue'
import './assets/js/rem'
import ElementUI from 'element-ui';
import $ from 'jquery'

// 引入方式
import { global } from './global/global';//全局功能函数随处调调用
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import Axios from './http'
import layer from 'vue-layer'
import echarts from 'echarts'
import auths from './vendor/auths'
// 弹窗组件
Vue.prototype.$layer = layer(Vue);
// echart
Vue.prototype.$echarts = echarts;
Vue.prototype.axios = Axios;
Vue.use(ElementUI);
import router from './router/index'
import store from './store/index'
//引入公共样式文件
import "./assets/css/common.css"
import "./assets/css/iconfont.css"
//axios挂载在vue上面
Vue.prototype.axios = Axios;
import { routerMatch, asyrouter } from './router/index'

var permission = [{ path: "/data/game/gameCenter", permission: [1, 2, 3] }, { path: "/data/game/gamedetail", permission: [1, 2, 3] }]
// if (store.state.list.length === 0) {
//   // 如果没有权限列表就重新请求拿到权限开始匹配动态生成路由
//   routerMatch(permission, asyrouter).then(res => {
//     console.log(res[0])
//     router.addRoutes(res[0])
//     console.log(router)
//     // 看不到但是已经存在具有权限的路由  
//   }).catch(() => {
//     router.replace('/')
//   })
// };
//按钮权限 在vue原型上面注册一个方法[也可以创建一个插件vue use]
Vue.prototype.$_has = function (moudelName, funcNanme) {
  let isExist = false;
  let buttonspermsStr = sessionStorage.getItem('buttonspermissions')
  if (buttonspermsStr == undefined || buttonspermsStr == null) {
    return false
  }
  let buttonperms = JSON.parse(buttonspermsStr)
  for (var i = 0; i < buttonperms.length; i++) {
    console.log( auths[moudelName][funcNanme])
    if (buttonperms[i]['id'] == auths[moudelName][funcNanme]) {
      isExist = true;
      break;
    }
  }
  return isExist
}
// 在自定义自定义指令上使用方法判断是否成立
Vue.directive('has', {

  inserted: function (el, binding) { 
     var moudel=JSON.parse(binding.expression)
    //v-name='1+1'  binding所以一个对象，包含name value是2[1+1=2] expression是"1+1"
    if (!Vue.prototype.$_has(moudel[0],moudel[1])) {
      el.parentNode.removeChild(el);

    }
  }
});
//路由
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  //如果跳转页面存在uid表示登陆过 可以跳转，否则不能跳转
  var whitelist = ["/login", "/register", "/getUserPassword", '/studentindex/gpartical',"/studentindex/gocale","/studentindex/questionLogin",'/studentindex/caleindex','/studentindex/calequestion','/studentindex/caleresult']
  if (store.getters.token) {
    next()
    var role = store.state.userInfo
    if (typeof (role) == 'string') {
      role = JSON.parse(role)
    }
    console.log(role['type'])
    if (role['type'] == 1 || role['type'] == 2) {
      //只有管理员返回成功出现弹窗。可以点击进入系统/跳转相关页面
      store.state.loginsucess = false;
    }

  } else {
    // 如果要去的路由是白名单即使没有token 也可以跳转
    if (whitelist.indexOf(to.path) !== -1) {
      store.state.loginsucess = true;
      next()
    } else {
      //执行的时候uid还没设置上,刷新时候uid才放到数据库才能正确判断。当第一次登陆应该设置cokie跳转本应该可以跳转可是路由监测还没有存在uid,因为cookie.js,没有很快获取到放到数据，刚开始登陆的时候需要我们手动设置
      store.state.loginsucess = true;
      next('/login')
      alert("没有登录，请去登录")
      console.log(from, to)
    }
  }

});
store.commit("setGroup")
if (store.getters.token) {
  store.commit("column")
}

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

