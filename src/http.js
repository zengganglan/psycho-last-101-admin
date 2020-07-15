//配置http拦截
import axios from 'axios'
import router from './router/index'
import store from './store/index'
import Cookies from 'js-cookie';
// axios 配置
let Axios = axios.create({
  // baseURL: "http://psy.hxxlcloud.com/", // 基础URL
  // timeout: 30000,
  // responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
});
// Axios.defaults.headers.common['X-Token'] = store.state.token;
Axios.interceptors.request.use(
  // 在发送请求之前给请求头配置taken
  config => {
    if (store.state.token) {
      console.log(store.state.token)
      config.headers['X-Token'] = `${store.state.token}`
    }
     if (config.method=='post') {
        // if(cityId){//如果是超级管理员所有post请求加公共的请求参数super
	    	// 	let test = config.data;
	    	// 	if(test){
	    	// 		config.data['super']= cityId;
	    	// 	}
        // }
     }
     // 添加时间戳       
 if (config.method === 'post') {            
  config.data = {                
   ...config.data,                
   t: Date.parse(new Date()) / 1000           
  }       
 } else if (config.method === 'get') {          
   config.params = {               
     t: Date.parse(new Date()) / 1000,               
    ...config.params            
  }       
 }
 console.log(config)
   
    return config
  },
  err => {
    console.log(22)
    return Promise.reject(err)
  },
)

// http response 响应拦截器
Axios.interceptors.response.use(
  response => {
    console.log(response);
    if (response['data']['code']==-1 && response['data']['msg']=="Expired token" ) {
      Cookies.set("userToken", "");
      store.state.loginsucess = true;
      router.replace('/login')
      // store.getters.token=""
     
    }
    if (response['data']['code']==-10004) {
      alert(response['data']['msg'])
      // return 后就后面不再执行 response不在返回给每个地方请求、、
      return;

    }
    return response
  },
  error => {
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      alert("网络超时");
    return Promise.reject(error);          // reject这个错误信息
  }
    if (error) {
      console.log(error,14)
      // 判断是否失效
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(loginout)         
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.path },
            })
      }
    }
   
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  },
)
export default Axios

