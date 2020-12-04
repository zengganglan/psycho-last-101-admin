<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data">
      <table class="a1">
        <tr>
          <td>二维码管理：</td>
          <td>
            <span class="iconfont icon-qrcode" style="font-size:40px;cursor:pointer" @click="show"></span>
           
          </td>
        </tr>
        
       
        <tr>
          <td>首页LOGO：</td>
          <td>
                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                <!-- <form action="UploadOneServlet" method="post" name="f_upload" enctype="multipart/form-data">
    <input type="file" name="filename" multiple="multiple" /><br>
    <input type="submit" value="上传" />
</form> -->
           <!-- <input type="file" name="file" ref="file">
         
            <input type="button" value="上传" style="width:40px;backgroundColor:#00CBA3;cursor:pointer" @click="upload" > -->
     <el-upload
  class="avatar-uploader"
  action="/api/v1/admin/setting/upload"
   :headers="{'X-Token':this.$store.state.token}"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        
          </td>
        </tr>
        <tr>
          <td>基本信息修改许可：</td>
          <td>
            <!-- <el-tooltip :content="'Switch value: ' + data.edit_stu" placement="top">
             
            </el-tooltip> -->
             <el-switch
                v-model="data.edit_stu"
                active-color="#13ce66"
                 active-text="开"
                inactive-text="关"
                active-value="1"
                inactive-value="0"               
                inactive-color="#ff4949"
              ></el-switch>
          </td>
        </tr>
        <tr>
          <td>自注册审核许可</td>
          <td>
            <el-switch v-model="data.register_audit"  active-text="开"
                inactive-text="关" active-color="#13ce66" inactive-color="#ff4949"  active-value="1"
                inactive-value="0"></el-switch>
          </td>
        </tr>
       
       
        <tr>
          <td>是否允许学生评价：</td>
          <td>
             <el-switch v-model="data.stu_comment"  active-text="开"
                inactive-text="关" active-color="#13ce66" inactive-color="#ff4949"  active-value="1"
                inactive-value="0"></el-switch>
          </td>
        </tr>
        <tr>
          <td>学生页面底部显示信息：</td>
          <td>
            <el-input v-model="data.std_page_tip" type="textarea" placeholder="请输入页面底部显示信息" style="width:300px"></el-input>
          </td>
        </tr>        
      </table>
    </div>
    <div class="add" @click="sub">提交设置</div>
     <el-dialog title="手机二维码" :visible.sync="dialogFormVisible" @opened="useqrcode" width="500px">
      <!-- <div class="tilt"><img src="../../../../assets/images/erweima.png" alt=""></div> -->
      <canvas id="canvas" ref="canvas" style="margin-left:150px"></canvas>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcode";
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";

export default {
  data() {
    return {
      headson: ["系统参数设置", "有关系统的参数设置"],
      file:"",
       imageUrl: '',
      data: {
        edit_stu: 0,
        stu_comment: 0,
        register_audit: 0,
        std_page_tip: '11',
        logo:""
      },
      dialogFormVisible:false
    };
  },
  created() {
    this.getdata()
  },
  methods: {
      show() {
      // 按钮事件 传值
      this.dialogFormVisible = true;
 
      //  this.$router.push({path:'/studentindex/questionLogin',query:{id:this.lbId,name:this.name}})

    },
      useqrcode() {
      //对话框打开生成二维码生成的二维码内容，可以添加变量//http://psy.hxxlcloud.com/#/studentindex/caleindex?id=
      var canvas = document.getElementById("canvas");
      console.log(this.lbId);
      // http://115.159.209.142:7006 服务器域名
      if (!this.name) {
        this.name='无'
      }
      
      QRCode.toCanvas(canvas, `http://116.62.71.97/mobile/`, function(
        error
      ) {
        if (error) console.error(error);
        console.log("QRCode success!");
        
      });
    },
    getdata(){
      var that = this
      this.axios.get('/api/v1/admin/setting/index').then(function(res){
        if (res['data']['code']==0) {
           var data = res['data']['data']
           that.data.edit_stu=data['edit_stu']
           that.data.stu_comment=data['stu_comment']
           that.data.register_audit=data['register_audit']
           that.data.std_page_tip=data['std_page_tip']
           that.imageUrl=data['logo']
        }
      })
    },
    sub(){
      var that = this
      this.data.stu_comment= this.data.stu_comment-0
       this.data.register_audit=this.data.register_audit-0
      this.data.edit_stu= this.data.edit_stu-0
      this.axios.post('/api/v1/admin/setting/save',this.data).then(function(res){
        if (res['data']['code']==0) {
          that.$message('设置参数成功')
          that.getdata()
        }
      })
    },
    // upload(){
    //   console.log(this.$refs.file.files)
    //   var files=this.$refs.file.files
    //   var form = new FormData(),
    //   file = files[0];
    //   form.append('file', file);
    //   this.axios.post('/ersion/admin/setting/upload',form).then(function(res){
    //       console.log(res)
    //   })
    // },
     handleAvatarSuccess(res, file) {
      //  只是成功本地路径显示界面还没上传
        this.imageUrl = URL.createObjectURL(file.raw);
        if (res['code']==0) {
          this.data.logo=res['data']['file_name']
        }
        console.log(res,file, this.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isJPG && isLt2M;
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