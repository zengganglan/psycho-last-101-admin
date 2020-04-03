import Vue from 'vue'
import Router from 'vue-router'
//1，管理员所有子页面
import teacherlayout from '../views/layout/teacherlayout'
import teacherschool from '../views/layout/teacherschool'
import Groupsettings from '../views/teacherlist/adminmange/Groupsettings'
import admindata from "../views/teacherlist/adminmange/admindata"
import admintype from "../views/teacherlist/adminmange/admintype"
import adminlist from "../views/teacherlist/adminmange/adminlist"
import setdata from "../views/teacherlist/adminmange/setdata"
import permission from "../views/teacherlist/adminmange/permission"
import addAdmin from "../views/teacherlist/adminmange/addAdmin"
import stucomment from "../views/teacherlist/adminmange/stucomment"
import comments from "../views/teacherlist/adminmange/comments"
import resports from "../views/teacherlist/adminmange/resports"
import settingStudent from "../views/teacherlist/adminmange/settingStudent"
import setAdmin from "../views/teacherlist/adminmange/setAdmin"
import grade from "../views/teacherlist/adminmange/grade"


// 2，沙盘数据中心+VR数据中心+档案+其他
import gameCenter from "../views/teacherlist/game/gameCenter"
import gamedetail from "../views/teacherlist/game/gamedetail"
import presentation from "../views/teacherlist/VR/presentation"
import vrdetail from "../views/teacherlist/VR/vrdetail"
import Coachdata from "../views/teacherlist/data/Coach/Coachdata"
import Coachdetail from "../views/teacherlist/data/Coach/Coachdetail"
import feedback from "../views/teacherlist/data/feedback/feedback"
import feedbackdetail from "../views/teacherlist/data/feedback/feedbackdetail"
import relex from "../views/teacherlist/data/relex/relex"
import relexdetail from "../views/teacherlist/data/relex/relexdetail"
import phyArchive from "../views/teacherlist/data/archives/phy-archive"
import monthwork from "../views/teacherlist/data/archives/monthwork"
import daywork from "../views/teacherlist/data/archives/daywork"

//3，文章管理
import column from "../views/teacherlist/artical/column"
import articalList from "../views/teacherlist/artical/articalList"
import publish from "../views/teacherlist/artical/publish"
import read from "../views/teacherlist/artical/read"
import books from "../views/teacherlist/artical/books"
//4， 咨询中心
import appointment from "../views/teacherlist/Consultation/appointment"
import appointDetail from "../views/teacherlist/Consultation/appointDetail"
import history from "../views/teacherlist/Consultation/history"
import manageTime from "../views/teacherlist/Consultation/manageTime"
import message from "../views/teacherlist/Consultation/message"
import Invitation from "../views/teacherlist/Consultation/invitation"
import interview from "../views/teacherlist/Consultation/interview"
import historyview from "../views/teacherlist/Consultation/historyview"
import historydetail from "../views/teacherlist/Consultation/historydetail"
import setting from "../views/teacherlist/Consultation/setting"
import racking from "../views/teacherlist/Consultation/racking"
import rackdetail from "../views/teacherlist/Consultation/rackdetail"

//5，系统设置
import setpramas from "../views/teacherlist/system/setpramas"
import measure from "../views/teacherlist/system/measure"
import personinfo from "../views/teacherlist/system/personinfo"
import Consultation from "../views/teacherlist/system/Consultation"
import use from "../views/teacherlist/system/use"

// 6，危机干预
import Assessment from "../views/teacherlist/crisis/Assessment"
// 危机干预=》评估管理
import check from "../views/teacherlist/crisis/asses/check"
import danger from "../views/teacherlist/crisis/asses/danger"
import diebefore from "../views/teacherlist/crisis/asses/diebefore"
import lifeThing from "../views/teacherlist/crisis/asses/lifeThing"
import cases from "../views/teacherlist/crisis/cases"
import DeathNotice from "../views/teacherlist/crisis/DeathNotice"
import environment from "../views/teacherlist/crisis/environment"
import preTeam from "../views/teacherlist/crisis/preTeam"
import prowarn from "../views/teacherlist/crisis/prowarn"
import strategy from "../views/teacherlist/crisis/strategy"
import safeplan from "../views/teacherlist/crisis/safeplan"
import enviromndetail from "../views/teacherlist/crisis/enviromndetail"
import preteamdetail from "../views/teacherlist/crisis/preteamdetail"
// 7测评中心
import alltest from "../views/teacherlist/Gauge/test1/alltest"
import editsheet from "../views/teacherlist/Gauge/test1/editsheet"
import selftestSheet from "../views/teacherlist/Gauge/test1/selftestSheet"
import reasonSheet from "../views/teacherlist/Gauge/test1/reasonSheet"
import warning from "../views/teacherlist/Gauge/test2/warning"
import result from "../views/teacherlist/Gauge/test2/result"
import resultdetail from "../views/teacherlist/Gauge/test2/resultdetail"
import totalresult from "../views/teacherlist/Gauge/test2/totalresult"
import test_export_answer from "../views/teacherlist/Gauge/test2/test_export_answer"
import answer_score from "../views/teacherlist/Gauge/test2/answer_score"
import statistic from "../views/teacherlist/Gauge/test2/statistic"
import testgroup from "../views/teacherlist/Gauge/testgroup"
import handdata from "../views/teacherlist/Gauge/testdata/handdata"
import importdata from "../views/teacherlist/Gauge/testdata/import"



//学生所有子页面
import studentlayout from '../views/layout/studentlayout'
import studentschool from '../views/layout/studentschool'
import gpartical from '../views/studentlist/gpartical'
import gocale from '../views/studentlist/gocale'
import caleindex from '../views/studentlist/caleindex'
import calequestion from '../views/studentlist/calequestion'
import caleresult from '../views/studentlist/caleresult'
// import survey from '../views/studentlist/survey'
import survey from '../views/studentlist/Evaluation/survey'
import zice from '../views/studentlist/Evaluation/zice'
import jilu from '../views/studentlist/Evaluation/jilu'
import test from '../views/studentlist/Evaluation/test'

import course from '../views/studentlist/group/course'
import courselist from '../views/studentlist/group/courselist'

import comment from '../views/studentlist/Growup/comment'
import record from '../views/studentlist/Growup/record'

import historys from '../views/studentlist/student/history'
import jianjie from '../views/studentlist/student/jianjie'
import messages from '../views/studentlist/student/message'
import yaoqing from '../views/studentlist/student/yaoqing'
import addyuyue from '../views/studentlist/student/addyuyue'

import login from "../views/login/login"
import loginlayout from "../views/login/loginlayout"
import register from "../views/login/register"
import getUserPassword from "../views/login/getUserPassword"
import liangbiao from "../views/login/liangbiao"
// 超级管理员页面
import globalAdminLogin from "../views/login/globalAdminLogin"
import school from "../views/school/school"
import schooladmins from "../views/school/schooladmins"
import settingtprincipal from "../views/school/settingtprincipal"
import addprincipal from "../views/school/addprincipal"
import gloablesheet from "../views/school/test1/alltest"
import gloEditsheet from "../views/school/test1/editsheet"
import gloReasonSheet from "../views/school/test1/reasonSheet"
import sheettype from "../views/school/test1/selftestSheet"

import schoollayout from '../views/layout/schoollayout'
import { strict } from 'assert';


Vue.use(Router)
var path = "单位组别设置";

export default new Router({
  routes: [
    //登陆页
    {
      path: "/login",
      name: '登陆',
      component: login,

    },
    {
      path: "/globalAdminLogin",
      name: '超级管理员登陆',
      component: globalAdminLogin,

    },
    // 量表报告
    {
      path: "/liangbiao",
      name: '个人量表',
      component: liangbiao,
    },
    // {
    //   path: "/studentindex",
    //   name: '登陆',
    //   component: loginlayout,
    //   children:[
    //     {
    //       path: "gpartical",
    //       name: "学校",
    //       component: gpartical
    //     },
    //   ]
    // },
    {
      path: "/register",
      name: "注册",
      component: register,
    },
    {
      path: "/getUserPassword",
      name: "设置密码",
      component: getUserPassword,
    },
    //老师初始页面及所有子页面[侧边栏和顶部相同]
    {
      path: '/admin/teacherindex',
      name: '生涯测评',
      component: teacherlayout,
      // redirect: 'noredirect',
      children: [{
        path: "teacherschool",
        name: "学校",
        component: teacherschool
      },]
    },
    // 学校管理
    {
      path: "/school",
      // name: "管理类",
      component: schoollayout,
      children: [{
        path: "localadminschool",
        name: "学校管理",
        component: school,
        meta: {
          permission: []
        }
      },
      {
        path: "schooladmins",
        component: schooladmins,
        meta: {
          permission: []
        }
      },
      {
        path: "settingtprincipal",
        component: settingtprincipal,
        meta: {
          permission: [addprincipal]
        }
      },
      {
        path: "addprincipal",
        component: addprincipal,
        meta: {
          permission: []
        }
      },
      {
        path: "gloablesheet",
        component: gloablesheet,
        meta: {
          permission: []
        }
      },
      {
        path: "gloEditsheet",
        component: gloEditsheet,
        meta: {
          permission: []
        }
      },
      {
        path: "reasonsheet",
        component: gloReasonSheet,
        meta: {
          permission: []
        }
      },
      {
        path: "sheettype",
        component: sheettype,
        meta: {
          permission: []
        }
      },
      {
        path: "system/measure",
        name: "测量参数",
        component: measure
      },
      ]
    },
    // 管理人员模块
    {
      path: "/student/archives",
      name: "个人档案",
      component: grade,
      name: "grade",

    },
    {
      path: "/admin",
      // name: "管理类",
      component: teacherlayout,
      children: [{
        path: "Groupsettings",
        name: "单位组别",
        component: Groupsettings,
        meta: {
          permission: []
        }
      },
      {
        path: "admindata",
        name: "管理数据",
        component: admindata,
        meta: {
          permission: []
        }
      },
   
      {
        path: "admintype",
        name: "管理类型",
        component: admintype,
        meta: {
          permission: []
        }
      },
      {
        path: "adminlist",
        name: "管理列表",
        component: adminlist,
        meta: {
          permission: []
        }
      },
      {
        path: "setdata",
        name: "学生资料录入",
        component: setdata,
        meta: {
          permission: []
        }
      },
      {
        path: "permission",
        name: "权限设置",
        component: permission
      },
      {
        path: "addAdmin",
        name: "管理员增加",
        component: addAdmin
      },
      {
        path: "stucomment",
        name: "学生评价",
        component: stucomment,
        meta: {
          permission: []
        }
      },
      {
        path: "comments",
        name: "学生评语",
        component: comments
      },
      {
        path: "resports",
        name: "成长报告",
        component: resports
      },
      {
        path: "settingStudent",
        name: "修改学生信息",
        component: settingStudent
      },
      {
        path: "setAdmin",
        name: "修改管理员信息",
        component: setAdmin
      },
      ]

    },
    // 测评中心
    {
      path: "/Gauge/totalresult",
      name: "量表分析",
      component: totalresult
    },
    {
      path: "/Gauge/test_export_answer",
      name: "答题卡选择答案",
      component: test_export_answer
    },
    {
      path: "/Gauge/answer_score",
      name: "答题卡因子分数",
      component: answer_score
    },
    {
      path: "/Gauge/statistic",
      name: "答题卡答题分析",
      component: statistic
    },
    {
      path: "/Gauge",
      name: "测评",
      component: teacherlayout,
      children: [{
        path: "alltest",
        name: "测评量表",
        component: alltest
      },
      {
        path: "selftestSheet",
        name: "量表类别",
        component: selftestSheet
      },
      {
        path: "reasonSheet",
        name: "因子管理",
        component: reasonSheet
      },
      {
        path: "editsheet",
        name: "编辑量表",
        component: editsheet
      },
      {
        path: "warning",
        name: "量表预警",
        component: warning
      },
      {
        path: "result",
        name: "查看量表",
        component: result
      },
     
      {
        path: "resultdetail",
        name: "量表详情",
        component: resultdetail
      },
      {
        path: "testgroup",
        name: "量表分发",
        component: testgroup
      },
      {
        path: "testdata/handdata",
        name: "手动录入",
        component: handdata
      },
      {
        path: "testdata/import",
        name: "导入量表",
        component: importdata
      }
      ]
    },
    // 数据中心-vr数据中心handdata
    {
      path: "/data/vrdata",
      name: "数据类",
      component: teacherlayout,
      children: [{
        path: "presentation",
        name: "数据报告",
        component: presentation,
        meta: {
          permission: []
        }
      },
      {
        path: "vrdetail",
        name: "个人数据",
        component: vrdetail
      }
      ],
    },
    // 数据中心-沙盘数据中心
    {
      path: "/data/game",
      name: "沙盘游戏",
      component: teacherlayout,
      children: [{
        path: "gameCenter",
        name: "游戏中心",
        component: gameCenter,
        meta: {
          permission: []
        }
      },
      {
        path: "gamedetail",
        name: "组内数据",
        component: gamedetail
      },

      ],
    },
    // 数据中心
    {
      path: "/data",
      name: "rest",
      component: teacherlayout,
      children: [{
        path: "Coachdata",
        name: "身体反馈",
        component: Coachdata,
        meta: {
          permission: []
        }
      },
      {
        path: "Coachdetail",
        name: "身体反馈详情",
        component: Coachdetail,
        meta: {
          permission: []
        }
      },
      {
        path: "feedback",
        name: "身心放松数据",
        component: feedback
      },
      {
        path: "feedbackdetail",
        name: "身心放松数据1",
        component: feedbackdetail,
        meta: {
          permission: []
        }
      },
      {
        path: "relex",
        name: "团体辅导数据",
        component: relex
      },
      {
        path: "relexdetail",
        name: "团体辅导数据1",
        component: relexdetail,
        meta: {
          permission: []
        }
      },
      // 档案中心
      {
        path: "archives/monthwork",
        name: "月报表",
        component: monthwork,
        meta: {
          permission: []
        }
      },
      {
        path: "archives/daywork",
        name: "操作日志",
        component: daywork,
        meta: {
          permission: []
        }
      },
      {
        path: "archives/phyArchive",
        name: "心理档案",
        component: phyArchive,
        meta: {
          permission: []
        }
      },
      ],
    },
    // 文章管理
    {
      path: "/artical",
      name: "文章类",
      component: teacherlayout,
      children: [{
        path: "column",
        name: "文章管理",
        component: column,
        meta: {
          permission: []
        }
      },
      {
        path: "articalList",
        name: "文章列表",
        component: articalList,
        meta: {
          permission: []
        }
      },
      {
        path: "publish",
        name: "发布文章",
        component: publish,
        meta: {
          permission: []
        }
      },
      {
        path: "read",
        name: "阅读情况",
        component: read,
        meta: {
          permission: []
        }
      },
      {
        path: "books",
        name: "心理图书",
        component: books,
        meta: {
          permission: []
        }
      }
      ]
    },
    // 咨询中心
    {
      path: "/Consultation",
      name: "咨询中心",
      component: teacherlayout,
      children: [{
        path: "appointment",
        name: "预约时间",
        component: appointment,
      },
      {
        path: "appointDetail",
        name: "时间详情",
        component: appointDetail,
      },
      {
        path: "history",
        name: "咨询记录",
        component: history,
      }, {
        path: "manageTime",
        name: "咨询时间",
        component: manageTime,
      },

      {
        path: "message",
        name: "留言消息",
        component: message,
      },
      {
        path: "arrangement",
        name: "访谈时间",
        component: interview,
      },
      {
        path: "invitation",
        name: "邀请记录",
        component: Invitation,
      },
      {
        path: "historyview",
        name: "访谈记录",
        component: historyview,
      },
      {
        path: "historydetail",
        name: "访谈记录详细",
        component: historydetail,
      },
      {
        path: "setting",
        name: "功能室设置",
        component: setting,
      },
      {
        path: "racking",
        name: "个案追踪",
        component: racking,
      },
      {
        path: 'rackdetail',
        name: '个案追踪相关信息',
        component: rackdetail,
      }

      ]

    },
    // 危机干预
    {
      path: "/crisis",
      name: "危机干预",
      component: teacherlayout,
      children: [{
        path: "Assessment",
        name: "评估管理",
        component: Assessment,
      },
      {
        path: "asses/check",
        name: "鉴别评估",
        component: check,
      },
      {
        path: "asses/danger",
        name: "潜在风险评估",
        component: danger,
      },
      {
        path: "asses/diebefore",
        name: "自杀倾向评估",
        component: diebefore,
      },
      {
        path: "asses/lifeThing",
        name: "生活事件动态",
        component: lifeThing,
      },

      {
        path: "strategy",
        name: "应对策略指导",
        component: strategy,
      }, {
        path: "manageTime",
        name: "咨询时间",
        component: manageTime,
      },

      {
        path: "prowarn",
        name: "预警触发",
        component: prowarn,
      },
      {
        path: "safeplan",
        name: "安全计划",
        component: safeplan,
      },
      {
        path: "preTeam",
        name: "危机预防小组",
        component: preTeam,
      },
      {
        path: "environment",
        name: "环境安全管理",
        component: environment,
      },
      {
        path: "cases",
        name: "个案总结",
        component: cases,
      },
      {
        path: "setting",
        name: "功能室设置",
        component: setting,
      },
      {
        path: "DeathNotice",
        name: "学生死亡通知模板",
        component: DeathNotice,
      },
      {
        path: "enviromndetail",
        name: "鉴别管理",
        component: enviromndetail,
      },
      {
        path: "preteamdetail",
        name: "事件动态",
        component: preteamdetail,
      },

      ]

    },
    // 系统设置
    {
      path: "/system",
      name: "学生模块",
      component: teacherlayout,
      children: [{
        path: "setpramas",
        name: "系统参数",
        component: setpramas
      },     
      {
        path: "Consultation",
        name: "咨询参数",
        component: Consultation
      },
      {
        path: "personinfo",
        name: "个人信息",
        component: personinfo
      },
      {
        path: "usepage",
        name: "页面使用",
        component: use,
      },
      {
        path: "measure",
        name: "测量参数",
        component: measure
      },
      ]
    },
    //学生初始页面及所有子页面，[侧边栏和顶部相同]
    {
      path: '/Evaluation/studentindex',
      name: '学生测评',
      component: studentlayout,
      children: [{
        path: "studentschool",
        name: "学生",
        component: studentschool
      },

      ]

    },
    {
      path: '/studentindex/gpartical',
      name: '文章详情',
      component: gpartical,
    },
    // {
    //   path: '/studentindex/comnonartical',
    //   name: '文章详情',
    //   component: comnonartical,
    // },
    {
      path: '/studentindex/gocale',
      name: '量表',
      component: gocale,
    },
    {
      path: '/studentindex/caleindex',
      name: '量表开始',
      component: caleindex,
    },
    {
      path: '/studentindex/calequestion',
      name: '手机量表测题',
      component: calequestion,
    },
    {
      path: '/studentindex/caleresult',
      name: '量表测题结果',
      component: caleresult,
    },
    // 学生测评中心
    {
      path: "/Evaluation",
      name: "测评中心",
      component: studentlayout,
      children: [{
        path: "survey",
        name: "心理普查",
        component: survey
      },
      {
        path: "zice",
        name: "心理自测",
        component: zice
      },
      {
        path: "jilu",
        name: "心理记录",
        component: jilu
      },
     
      ]
    },
    {
      path: "/test",
      name: "测试题",
      component: test
    },
    // 学生咨询中心
    {
      path: "/student",
      name: "咨询中心",
      component: studentlayout,
      children: [{
        path: "jianjie",
        name: "中心简介",
        component: jianjie
      },
      {
        path: "history",
        name: "咨询记录",
        component: historys
      },
      {
        path: "yaoqing",
        name: "访谈邀请",
        component: yaoqing
      },
      {
        path: "message",
        name: "问题留言",
        component: messages
      },
      {
        path: "addyuyue",
        name: "增加预约",
        component: addyuyue
      }
      ]
    },
    // 学生团体辅导
    {
      path: "/group",
      name: "团体辅导",
      component: studentlayout,
      children: [{
        path: "courselist",
        name: "课程列表",
        component: courselist
      },
      {
        path: "course",
        name: "心理课程",
        component: course
      }
      ]
    },

    // 学生成长档案
    {
      path: "/Growup",
      name: "成长档案",
      component: studentlayout,
      children: [{
        path: "record",
        name: "自我成长报告",
        component: record
      },
      {
        path: "comment",
        name: "评价中心",
        component: comment
      }
      ]
    },
    //重定向，如果两个登录页面没法进行重定向 需要后台根据路由配置不同路径，同时主业需要返回登录界面需要判断是超级管理员还是普通管理员
    {
      path: '/',
      redirect: '/login',
    },
    // {
    //   path: '/',
    //   redirect: '/globalAdminLogin',
    // }

  ]
})
export const asyrouter = [{
  path: "/data/game",
  name: "沙盘游戏",
  component: teacherlayout,
  children: [{
    path: "gameCenter",
    name: "游戏中心",
    component: gameCenter,
    meta: {
      permission: []
    }
  },
  {
    path: "gamedetail",
    name: "组内数据",
    component: gamedetail
  },

  ],
}]

// 返回某个权限某个页面 {path:"xxxx",permission:[]}
// export const routerMatch = function (permission, asyncRouter) {
//   return new Promise(((resolve) => {
//     //  创建路由
//     const routers = []
//     function creatRouter(permission) {
//       permission.forEach(item => {
//         debugger;
//         if (item.children && item.children.length) {
//           creatRouter(item.children)
//         }
//         // 把返回的权限循环 有权限就会有存在的路由
//         let path = item.path
//         for (let i = 0; i < asyncRouter.length; i++) {
//           console.log(asyncRouter[i]['path'])
//           if (asyncRouter[i]['children']) {
//             for (let j = 0; j < asyncRouter[i]['children'].length; j++) {
//               let routepath = asyncRouter[i]['path'] + '/' + asyncRouter[i]['children'][j]['path']
//               console.log(asyncRouter[i]['children'][j]['path'])
//               if (routepath == path) {
//                 // 每次找到就定义一个新数组
//                 let arrson = []
//                 let async = {}
//                 async['path'] = asyncRouter[i]['path']
//                 async['name'] = asyncRouter[i]['name']
//                 async['component'] = asyncRouter[i]['component']
//                 asyncRouter[i]['children'][j].permission = item.permission
//                 arrson.push(asyncRouter[i]['children'][j])
//                 async['children'] = arrson
//                 console.log(async)
//                 // // 把所有需要权限页面罗列出来和后台返回的权限做匹配 如果匹配上了就动态增加路由
//                 routers.push(async)

//               }
//             }
//           }

//         }

//       });
//       console.log(routers)
//     }
//     // 调用函数
//     creatRouter(permission)
//     resolve([routers])
//   }))
// }
