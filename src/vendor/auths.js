
export  default {
    // 所有id是唯一标志不能重复//或者标记每个模块的每个功能为二进制，根据后台返回额模块二进制中和判断哪些功能是否存在【二进制总和模块&模块功能名二进制标志{1，2、4，8,16标记}==0表示不存在】
    //一，管理员模块
    // 班级组,增加修改共用  v-has='["group","delid"]'
    group:{
    delid:62,
    setid:83,

    },
    // 角色组
    usertype:{
    delid:81,
    setid:80,
    addid:82,
    ruleid:61
    },
    // 角色、用户是两个模块共用接口，设置权限是要传pid.即使是一个接口共用，一个模块后台应该不会限制在另一个模块使用的api
    useradmin:{
        delid:85,
        setid:84,
        addid:86,
    },
    user:{
        delid:87,
        addid:88,
    },
    // 二咨询模块
    Theme:{
        delid:89,
        addid:90,
        setid:102,
        funcdel:105

    },
    coach:{
        addid:104,
        setid:103,
    },
    // 三文章
    artical:{
        columndelid:106,
        setlid:107,
        articaldelid:108
    },
    // 四数据模块
    // // vr
    // vr:{
    //     groupdelid:81,
    //     groupaddid:82,
    //     vrdelid:81,
    //     vrdownid:80,
    //     vraddid:82,
    // },   
    // // 沙盘
    // sand:{
    //     groupdelid:81,
    //     groupaddid:82,
    //     vrdelid:81,
    //     vrdownid:80,
    //     vraddid:82,
    // }
// 五，测评中心
// 六，设置中心
}