<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->
    <div class="search">
      <!-- <span>关键字</span>
      <input type="text"> -->
      <!-- <i data-v-30c34ff0 class="iconfont icon-sousuo"></i> -->
    </div>
     <div class="work">
        
        <!-- <excel-box :thead="this.thead" :filterVal="this.filterVal"  :tableData3="this.tableData3"></excel-box> -->
        <span class="del" @click="handleDelete">
          删除
          <i class="iconfont icon-trash"></i>
        </span>
      </div>
    <div class="data vrdata">

      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
         :default-sort = "{prop: 'date', order: 'descending'}"
           @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column property="sort" width="120mmmm" label="序号"></el-table-column> -->
          <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column  property="account"  label="账号"></el-table-column>
        <el-table-column property="name" label="校长名字" ></el-table-column>
        <el-table-column property="college" label="所属学校" ></el-table-column>

         <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click.stop="handleEdit(scope.$index, scope.row)">查看</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
      </el-table>
    </div>
    <div>
    <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="pageCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10,20,30,40,50,60]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.countpage"
          ></el-pagination>
     </div>    </div>
           <div class="add" @click="addnumber">新增</div>
           <el-dialog title="学校添加" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="学校名称" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
    <el-form-item label="学校简介" :label-width="formLabelWidth" >
      <el-input v-model="form.unit_name" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="makesure()">确 定</el-button>
  </div>
</el-dialog>
  <el-dialog title="学校管理编辑" :visible.sync="dialogFormVisible1">
  <el-form :model="form1">
    <el-form-item label="学校名称" :label-width="formLabelWidth" >
      <el-input v-model="form1.name" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
    <el-form-item label="学校简介" :label-width="formLabelWidth" >
      <el-input v-model="form1.unit_name" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
    <el-button type="primary" @click='editsure'>确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import headson from "../../components/headson";

export default {
  data() {
    return {
        dialogFormVisible :false,
        dialogFormVisible1:false,
          form: {
           name:"",
           unit_name:""
        },
         form1: {
            id:"",
           name:"",
           unit_name:""
        },
        formLabelWidth: '120px',
      // 头部组件信息
      headson: ["超级管理员管理"],
      tableData: [],
      data:[],     
       multipleSelection: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 0,
        pagesize: '10',
        flag: false
      },
     currentRow: null
    };
  },
  created() {
    this.getlist(this.page.currentpage,this.page.pagesize);

  },
  methods: {
    getlist(currentpage,pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that= this
      this.tableData=this.data
      this.axios.post('/api/v1/super/user/list',{page:currentpage,size:pagesize}).then(function(res){
          if (res['data'].code==0) {
              that.page.countpage=res['data']['data']['total']
              that.tableData=res['data']['data']['list']
          }
          console.log(res)
      })
     
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      console.log(row);
    },
    // handleCurrentChange(val) {
    //   this.currentRow = val;
    //   var id = val["id"]
    //   var name = val['name']
    //   console.log(val)
    //   // 点击的当前数据// 跳转路由传参// 根据参数查询当前这个人的所有ar报告
    //   this.$router.push({path:"/data/feedbackdetail",query:{id:id,name:name}})
    //   //获取参数方法:      this.$route.query.id;
    // },
       // 分页·
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page.pagesize=val
            this.getlist(this.page.currentpage,this.page.pagesize);

      },
      pageCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.currentpage=val
            this.getlist(this.page.currentpage,this.page.pagesize);

      },
       handleEdit(index, row) {
      //  this.dialogFormVisible1 = true
      console.log(row)
        this.form1.id= row.id
        this.form1.name=row.name
        this.form1.unit_name=row.unit_name
        this.$router.push({path:'/school/settingtprincipal',query:{id:row.id,name:row.college}})
        
      },
      editsure(){
          var that = this
          this.axios.post('/api/v1/admin/sand/group/edit',{
            id:this.form1.id,
            name:this.form1.name,
           unit_name:this.form1.unit_name

        }).then(function(res){
            console.log(res)
            if (res['data']['code']==0) {
                that.$message('编辑成功')
                    that.getlist(that.page.currentpage,that.page.pagesize);

            }else{
                 that.$message(res['data']['msg'])
            }
        })
      },
      handleDelete(index, row) {
          var id = []
          if (row) {
              id.push(row.id)
          }else{
              if (this.multipleSelection.length!==0) {
                 this.multipleSelection.map((item)=>{
                  id.push((item['id']))
              }) 
              }else{
                  this.$message('请确定选中了选项')
              }
              
          }
           var that=this
            this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios.post('/api/v1/super/user/delete',{id:id}).then(function(res){
              console.log(res)
              if (res['data']['code']==0) {
                  that.$message('删除成功')
                    that.getlist(that.page.currentpage,that.page.pagesize);

              }else{
                  that.$message(res['data']['msg'])
              }
          })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
         
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      addnumber(){
      //  this.dialogFormVisible = true
       this.$router.push({path:'/school/addprincipal'})
      },
      makesure(){
        this.dialogFormVisible = false
        var that=this
        console.log(this.form)
        this.axios.post('/api/v1/admin/sand/group/add',{
            name:that.form.name,
            unit_name:that.form.unit_name
        }).then(function(res){
            console.log(res)
            if (res['data']['code']==0) {
                that.$message('增加成功')
                    that.getlist(that.page.currentpage,that.page.pagesize);

            }else{
                that.$message(res['data']['msg'])
            }
        })

      },
      handleDelAll(){

      }
  },
  
  components: {
    headson: headson,  }
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
          top:3px
        }
      }
      span:nth-child(1) {
        margin-left: 20px;
      }
    }
.pages{
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
  span {
  }
  input {
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
      min-height: 200px;
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