<template>
  <div class="main">
    <headson :headson="headson"></headson>

    <div class="tab">
      <ul>
        <li
          v-for="(item,index) in tabls"
          :class="{tabactive:tabindex-1==index}"
          :key="index"
          @click="tab(index)"
        >{{item}}</li>
      </ul>
    </div>
    <ul>
      <li class="data1" v-if="tabindex==1">
        <div class="body">
          <div class="work">
            <!-- <excel-box :thead="this.thead" :filterVal="this.filterVal"  :tableData3="this.tableData3"></excel-box> -->
            <span class="del" @click="del1()" :class="{ btnactive: isbtnActive }">
              删除
              <i class="iconfont icon-trash"></i>
            </span>
          </div>
          <div class="datas">
            <table class="tb_list" ref="tables">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      name="available"
                      value="0"
                      ref="allcheck"
                      @click="allcheck()"
                      class="icheck"
                    />
                  </th>
                  <!-- 也可以循环遍历 -->
                  <th v-for="(item,index) in thead" :key="index">{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,index) in tableData1"
                  :key="index"
                  @mouseover="changecolor(index)"
                  v-bind:class="{heightcolor:isactive==item.sort}"
                  @mouseout="colorcancel()"
                >
                  <td align="center">
                    <input
                      type="checkbox"
                      name="available"
                      :value="item.id"
                      ref="icheck"
                      @click.stop="icheck()"
                      class="icheck"
                    />
                  </td>
                  <!-- <td class="sort">{{item.job_num}}</td> -->
                  <td class="sort">{{item.id}}</td>
                  <td class="class">
                    <!-- 点击跳转相关年纪的班级 -->
                    <span>{{item.name}}</span>
                  </td>
                  <td class="class">
                    <!-- 点击跳转相关年纪的班级 -->
                    <span>{{item.mode}}</span>
                  </td>
                  <!-- <td>
                    <span>{{item.standmode}}</span>
                  </td>
                  <td>
                    <span>{{item.base_score}}</span>
                  </td>
                  <td>
                    <span>{{item.std_score}}</span>
                  </td> -->
                  <td>
                    <template>
                      <el-button size="mini" @click="setting1(item.id)">修改</el-button>

                      <el-button size="mini" type="danger" @click="del1(item.id)">删除</el-button>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pages">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              :page-sizes="[10, 20, 30, 40,50,60]"
              :page-size="page.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
          <div class="add" @click="addnumber1">新增</div>
          <el-dialog title="增加因子" :visible.sync="dialogFormVisible1" width="550px">
            <el-tabs type="border-card">
              <el-tab-pane label="手动录入因子信息">
                <el-form ref="form" :model="form1" label-width="100px">
                  <el-form-item label="因子名称">
                    <el-input v-model="form1.name"></el-input>
                  </el-form-item>
                  <el-form-item label="所属量表">
                    <el-select
                      filterable
                      reserve-keyword
                      placeholder="请输入关键词搜索"
                      :loading="loading"
                      v-model="form1.scale_id"
                      @change="changevalue"
                      value-key
                    >
                      <el-option
                        v-for="(item, index) in roles"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="因子解释">
                    <el-input v-model="form1.specification"></el-input>
                  </el-form-item>
                  <el-form-item label="得分计算">
                    <el-select placeholder="请选择" style="width:250px" v-model="form1.calc_mode">
                      <el-option
                        v-for="item in mode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- <el-form-item label="标准分计算">
                    <el-select
                      placeholder="请选择"
                      style="width:250px"
                      v-model="form1.standard_calc_mode"
                    >
                      <el-option
                        v-for="item in standmode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="基底分">
                    <el-input v-model="form1.base_score"></el-input>
                  </el-form-item>
                  <el-form-item label="标准差">
                    <el-input v-model="form1.std_score"></el-input>
                  </el-form-item> -->
                </el-form>
              </el-tab-pane>
              <!-- <el-tab-pane label="EXCEL上传因子">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList1" :limit="1">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                </el-upload>
              </el-tab-pane> -->
            </el-tabs>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="submit1">提交</el-button>
            </div>
          </el-dialog>
          <el-dialog title="修改因子" :visible.sync="dialogFormVisible2" width="550px">
            <el-form ref="form" :model="form2" label-width="100px">
              <el-form-item label="因子名称">
                <el-input v-model="form2.name"></el-input>
              </el-form-item>
              <el-form-item label="所属量表">
                <el-select
                  filterable
                  reserve-keyword
                  placeholder="请输入关键词搜索"
                  :loading="loading"
                  v-model="form2.scale_id"
                  @change="changevalue"
                  value-key
                >
                  <el-option
                    v-for="(item, index) in roles"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="因子解释">
                <el-input v-model="form2.specification"></el-input>
              </el-form-item>
              <el-form-item label="得分计算">
                <el-select placeholder="请选择" style="width:250px" v-model="form2.calc_mode">
                  <el-option
                    v-for="item in mode"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="标准分计算">
                <el-select placeholder="请选择" style="width:250px" v-model="form2.standard_calc_mode">
                  <el-option
                    v-for="item in standmode"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="基底分">
                <el-input v-model="form2.base_score"></el-input>
              </el-form-item>
              <el-form-item label="标准差">
                <el-input v-model="form2.std_score"></el-input>
              </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="makesure1">提交</el-button>
            </div>
          </el-dialog>
        </div>
      </li>
      <li class="data3" v-else>
        <div class="body">
          <div class="work">
            <span class="reset" @click="del2">删除</span>
          </div>
          <div class="datas">
         
             <el-table
        :data="tableData2"
        style="width: 100%; margin-top: 20px"
        :cell-style="{width:'80px',height:'30px'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="结果描述"></el-table-column>
        <el-table-column prop="factor_name" label="所属因子"></el-table-column>
        <!-- <el-table-column prop="types"  label='比较值'></el-table-column> -->
        <el-table-column prop="max" label="比较上限"></el-table-column>
        <el-table-column prop="min" label="比较下限"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="setting2(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
          </div>
          <div class="pages">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="page2.currentPage"
              :page-sizes="[10, 20, 30, 40,50,60]"
              :page-size="page2.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page2.total"
            ></el-pagination>
          </div>
          <div class="add" @click="addnumber2">新增</div>

          <el-dialog title="增加因子结算" :visible.sync="dialogFormVisible3" width="500px">
            <el-tabs type="border-card">
              <el-tab-pane label="手动录入因子结算">
                <el-form ref="form" :model="form3" label-width="80px">
                  <el-form-item label="比较描述">
                    <el-input v-model="form3.name"></el-input>
                  </el-form-item>
                  <el-form-item label="所属因子">
                    <el-select placeholder="请选择" style="width:250px" v-model="form3.factor_id">
                      <el-option
                        v-for="item in selectscale"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="结果解释">
                    <el-input type="textarea" v-model="form3.explain"></el-input>
                  </el-form-item>
                  <el-form-item label="结果建议">
                    <el-input type="textarea" v-model="form3.suggest"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="比较值">
                    <el-select placeholder="请选择" style="width:250px" v-model="form3.type">
                      <el-option
                        v-for="item in type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item> -->
                  <el-form-item label="比较上限">
                    <el-input v-model="form3.max" type="number" min='0' ></el-input>
                  </el-form-item>
                  <el-form-item label="比较下限" >
                    <el-input v-model="form3.min" type="number" min='0'></el-input>
                  </el-form-item>
                  <!-- onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/^(0|[1-9][0-9]*)(\.\d+)?$/g,'')}" -->
               
                </el-form>
                  <div >
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="submit2">提交</el-button>
            </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="上传因子结算">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList2" :limit="1">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                </el-upload>
              </el-tab-pane> -->
            </el-tabs>
           
          </el-dialog>
          <el-dialog title="修改因子结算" :visible.sync="dialogFormVisible4" width="450px">
            <el-form ref="form" :model="form4" label-width="80px">
              <el-form-item label="比较描述">
                <el-input v-model="form4.name"></el-input>
              </el-form-item>
              <el-form-item label="所属因子">
                <el-select placeholder="请选择" style="width:280px"  v-model="form4.factor_id">
                  <el-option
                    v-for="item in selectscale"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="结果解释">
                <el-input type="textarea" v-model="form4.explain"></el-input>
              </el-form-item>
              <el-form-item label="结果建议">
                <el-input type="textarea" v-model="form4.suggest"></el-input>
              </el-form-item>
              <!-- <el-form-item label="比较差">
                <el-select placeholder="请选择" style="width:280px" v-model="form4.type">
                  <el-option
                    v-for="item in type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="比较上限">
                <el-input v-model="form4.max"  type="number" min='0'></el-input>
              </el-form-item>
              <el-form-item label="比较下限">
                <el-input v-model="form4.min"  type="number" min='0'></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible4= false">取 消</el-button>
              <el-button type="primary" @click="makesure2">提交</el-button>
            </div>
          </el-dialog>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import schoolcheck from "../../../components/schoolcheck";
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";
import { global } from "../../../global/global";

export default {
  data() {
    return {
      fileList1:[],
      fileList2:[],
      test:"",
      loading: false,
      isbtnActive: false,
      mode: [
        {
          value: "1",
          label: "求和"
        },
        {
          value: "2",
          label: "平均数"
        }
      ],
      standmode: [
        {
          value: "1",
          label: "基底分+标准差"
        },
        {
          value: "2",
          label: "基底分-标准差"
        },
        {
          value: "3",
          label: "基底分±标准差（区间值）"
        }
      ],
      type:[
        {
          value: "1",
          label: "标准分"
        },
        {
          value: "2",
          label: "基底分"
        },
      ],
      selectscale:[],
      // 高亮显示
      isactive: "",
      // 头部组件信息
      headson: ["量表因子", "量表因子和因子结算管理"],
      // 切导航行栏
      tabls: ["因子信息", "因子结算"],
      tabindex: 1,
      // 页码
      page: {
        currentPage: 1,
        total: 0,
        flag: false,
        size: 20
      },
      // 页码
      page2: {
        currentPage: 1,
        total: 0,
        flag: false,
        size: 20
      },
      // 编辑
      index1: "",
      //增加数据
      addflag: false,
      values: {
        value1: "",
        value2: "",
        value3: ""
      },
      thead: [
        "id",
        "因子名称",
        "得分计算",
        // "标准分计算",
        // "基底分",
        // "标准差",
        "操作"
      ],
      thead1: [
        "结果描述",
        "所属因子",
        // "比较值",
        "比较上限",
        "比较下限",
        "操作"
      ],
      //请求数据赋值
      tableData1: [],
      tableData2: [],
      // 提交资料
      submitflag: true,
      roles: "",
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      ida: "",
      idb: "",
      form1: {
        name: "",
        specification: "",
        calc_mode: "",
        standard_calc_mode: "1",
        base_score: "0",
        std_score: "0",
        scale_id: ""
      },

      form2: {
        name: "",
        specification: "",
        calc_mode: "",
        standard_calc_mode: "1",
        base_score: "0",
        std_score: "0",
        scale_id: ""
      },
      form3: {
        name:"",
        type: 1,
        min: "",
        max: "",
        explain: "",
        suggest: "",
        factor_id: ""
      },
      form4: {
       name:"",
        type: 1,
        min: "",
        max: "",
        explain: "",
        suggest: "",
        factor_id: ""
      },
      multipleSelection:[],
    };
  },
  watch: {},

  created() {
    this.getList(this.page.currentPage, this.page.size);
    this.getList1(this.page2.currentPage, this.page2.size);
    this.getscale()
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList(currentPage, pagesize) {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/system/scale/getScaleFactorList", {
          page: currentPage,
          size: pagesize
        })
        .then(function(res) {
          var data = res["data"]["data"]["list"];
          console.log(data);

          data.map((item, index) => {
            console.log(item.calc_mode);
            if (item.calc_mode == 1) {
              item["mode"] = "求和";
            } else {
              item["mode"] = "平均数";
            }
            switch (item.standard_calc_mode) {
              case 1:
                item["standmode"] = "基底分+标准差";
                break;
              case 2:
                item["standmode"] = "基底分-标准差";
                break;
              case 3:
                item["standmode"] = "基底分±标准差（区间值）";
                break;
            }
          });
          that.tableData1 = data;
          that.page.total = res["data"]["data"]["total"];
        });
    },
    // getList获取列表数据给tableData3赋值
    getList1(currentPage, pagesize) {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/system/scale/getFactorCalcList", {
          page: currentPage,
          size: pagesize
        })
        .then(function(res) {
          var data = res["data"]["data"]["list"];
          console.log(data);
          data.map((item,index)=>{
            if (item.type==1) {
                item['types']='标准分'
            }else{
                item['types']='基底分'
            }
          })
          console.log(data)
          that.tableData2 = data;
          that.page2.total = res["data"]["data"]["total"];
        });
    },
    getscale(){
      var that = this
     this.axios.get('/api/v1/system/scale/getSelectFactorList').then((res)=>{
       console.log(res)
       that.selectscale=res['data']['data']
     })
    },
    remoteMethod(query) {
      console.log(query);
      var that = this;
      this.axios
        .get("/api/v1/system/scale/getSelectScaleList?key=" + query)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.roles = res["data"]["data"];
          }
        });
    },
    changevalue(a) {
      var that = this;
      that.roles.map((item, index) => {
        if (item["id"] == a) {
          // that.counselorname = item["name"];
        }
      });
    },
    // 分页·
    handleSizeChange(val) {
      this.page.size = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    // 分页·
    handleSizeChange2(val) {
      this.page2.size = val;
      this.getList1(this.page2.currentPage, this.page2.size);
    },
    handleCurrentChange2(val) {
      this.page2.currentPage = val;
      this.getList1(this.page2.currentPage, this.page2.size);
    },
    // 增加数据
    addnumber1() {
      this.dialogFormVisible1 = true;
      this.remoteMethod('')
      
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },

    // 增加数据
    addnumber2() {
      this.addflag = true;
      this.dialogFormVisible3 = true;
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },
    submit1() {
      var that = this;
      for (var key in this.form1) {
        console.log(this.form1[key]);
        if (!(this.form1[key] + "")) {
          this.$message("请填全因子信息在增加");
          return;
        }
      }
      this.dialogFormVisible1 = false;
      this.axios
        .post("/api/v1/system/scale/saveScaleFactor", this.form1)
        .then(res => {
          if (res["data"]["code"] == 0) {
            that.$message("增加因子成功");
                that.getList(that.page.currentPage, that.page.size);

          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    submit2() {
      var that = this;
      for (var key in this.form3) {
        if (this.form3.min-0>=this.form3.max-0) {
           this.$message('上限值一定要大于下限值')
                      return;
           
        }
        console.log(this.form3[key]);
        if (!(this.form3[key] + "")) {
          this.$message("请填全因子结算信息在增加");
          return;
        }
      }
      this.dialogFormVisible3 = false;
      this.axios
        .post("/api/v1/system/scale/saveFactorCalc", this.form3)
        .then(res => {
          if (res["data"]["code"] == 0) {
            that.$message("增加因子成功");
                that.getList1(this.page2.currentPage, this.page2.size);

          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    // 编辑 增加点击编{辑出现文本框
    setting1(id) {
      this.ida = id;
      this.dialogFormVisible2 = true;
      var that = this;
     that.remoteMethod('');
      this.axios
        .get("/api/v1/system/scale/getScaleFactorDetail?id=" + id)
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            var data = res["data"]["data"];
            var query = data['scale_name']
            for (var key in that.form2) {
              that.form2[key] = data[key] + "";
            }
            that.form2.scale_id = data['scale_id'];
          }
        });
    },
    makesure1() {
      this.dialogFormVisible2 = false;
      var that = this;
      for (var key in this.form2) {
        console.log(this.form2[key]);
        if (!(this.form2[key] + "")) {
          this.$message("请填全因子信息在增加");
          return;
        }
      }
      this.axios
        .post("/api/v1/system/scale/saveScaleFactor?id=" + that.ida, this.form2)
        .then(res => {
          if (res["data"]["code"] == 0) {
            that.$message("编辑因子成功");
              that.getList(that.page.currentPage, that.page.size);

          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    // 编辑 点击编辑出现文本框
    setting2(id) {
      this.dialogFormVisible4 = true;
      this.idb = id;
      var that = this;
      this.axios
        .get("/api/v1/system/scale/getFactorCalcDetail?id=" + id)
        .then(function(res) {
          if (res["data"]["code"] == 0) {
             var data = res["data"]["data"]['list'];
            for (var key in that.form4) {
              that.form4[key] = data[key] + "";
            }
            that.form4.factor_id = data['factor_id'];
            // that.remoteMethod(query);
          }
        });
    },
     makesure2() {
      this.dialogFormVisible4= false;
      var that = this;
      for (var key in this.form4) {
        console.log(this.form4[key]);
        if (!(this.form4[key] + "")) {
          this.$message("请填全因子结算信息在增加");
          return;
        }
      }
      this.form4.min=this.form4.min-0
      this.form4.max=this.form4.max-0
      this.axios
        .post("/api/v1/system/scale/saveFactorCalc?id=" + that.idb, this.form4)
        .then(res => {
          if (res["data"]["code"] == 0) {
            that.$message("编辑因子结算成功");
             this.getList1(this.page2.currentPage, this.page2.size);

          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
  
    
    // 点击删除单条数据
    del1(id) {
      var ids = [];
      if (id) {
        ids.push(id);
      } else {
        var icheck = this.$refs.icheck;
        for (var i = 0; i < icheck.length; i++) {
          if (icheck[i].checked) {
            var value = icheck[i].value;
            // 找到选中单选框数据的id唯一值
            ids.push(value);
          }
        }
        if (ids.length == 0) {
          this.$message("请至少选择一个删除");
          return;
        }
      }
      console.log(ids);

      var that = this;
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .post("/api/v1/system/scale/delScaleFactor", { id: ids })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.getList(that.page.currentPage, that.page.size);
                that.$message("删除成功");
              } else {
                that.$message(res["data"]["msg"]);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
   del2(id,row) {
      var id = [];
      if (row) {
        id.push(row.id);
      } else {
        if (this.multipleSelection.length !== 0) {
          this.multipleSelection.map(item => {
            id.push(item["id"]);
          });
        } else {
          this.$message("请确定选中了选项");
          return;
        }
      }
      var that = this;
         //  点击确定开始删除
          this.axios
            .post("/api/v1/system/scale/delFactorCalc", { id: id })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.getList1(that.page2.currentPage, that.page2.size);
                that.$message("删除成功");
              } else {
                that.$message(res["data"]["msg"]);
              }
            });
    },   
     //点击删除选中的数据
    handleDelAll() {},
    // 全选反选
    allcheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      for (var i = 0; i < icheck.length; i++) {
        // 把allchecked的状态赋值给每一个子选框
        icheck[i].checked = allcheck.checked;
      }
    },
    //反选
    icheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      var flag = true;
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked == false) {
          flag = false;
        }
      }
      allcheck.checked = flag;
      if (event.target.checked) {
        event.target.parentNode.parentNode.style.backgroundColor = "#F8F8FA";
        this.isbtnActive = true;
      } else {
        event.target.parentNode.parentNode.style.backgroundColor = "";
      }
    },
     handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 导出excel表格功能
    handleDownload() {
      let vm = this;
      const list = vm.tableData3;
      var icheck = this.$refs.icheck;
      var newarr = [];
      var newtable = [];
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          newarr.push(value);
        }
      }
      //  把删除的标记值传给后台
      console.log(newarr);
      for (var i = 0; i < newarr.length; i++) {
        this.tableData3.map(function(item, index) {
          // sort是数据标记值
          if (item["sort"] == newarr[i]) {
            newtable.push(item);
          }
        });
      }
      console.log(newtable);
      const tHeader = this.thead;
      const filterVal = [
        "id",
        "job_num",
        "name",
        "unit_group",
        "phone",
        "auth_group_id",
        "last_login"
      ];
      global.handleDownload(tHeader, filterVal, newtable);
    },

    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },
    // 搜索功能
    showtable() {
      // this.tableflag = true;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      console.log(1);
    },
    //过滤操作
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    // 划过事件
    changecolor(index) {
      this.isactive = index - 0 + 1;
    },
    colorcancel() {
      this.isactive = "";
    },
    checknode() {
      console.log(this.$refs.schoolcheck1.newvalue);
      // this.tableflag = true;
    },
    reset() {
      // 重置密码 选中的
    }
  },
  components: {
    schoolcheck: schoolcheck,
    headson: headson,
    pagination: pagination
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #169bd5;
}
.heightcolor {
  background-color: #f8f8fa;
}
.tabactive {
  color: #6998fb;
  border-bottom: 10px solid #6998fb;
}

.pages {
  margin: 0 50px;

  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  // float: right;
  height: 100px;
}
.main {
  .tab {
    width: 100%;
    height: 100px;
    color: #bfbfc0;
    font-size: 12px;
    background-color: #fbfbfb;
    border: 1px solid #eff2f9;
    box-shadow: #eff2f9 1px 1px 20px;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;

      li {
        float: left;
        text-align: center;
        width: 200px;
        line-height: 100px;
        width: 174px;
        margin: 0 70px;
        font-size: 20px;
      }
    }
  }
  .data1 {
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
        li:nth-child(1) {
          margin-left: 50px;
          margin-right: 150px;
          .schoolcheck1 {
            position: relative;
            top: -25px;
            left: 40px;
            width: 200px;
          }
        }
        li:nth-child(2) {
          width: 500px;
          float: left;
          margin-left: 50px;
          #person {
            height: 32px;
            outline: none;
            width: 200px;
            outline: none;
            border: none;

            border: 2px solid #e2e2e2;
          }
          .icon-sousuo {
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
            top: -1px;
            border: 2px solid #e2e2e2;
            border-left: none;
          }
          .icon-wenhao {
            color: #169bd5;
            font-size: 25px;
          }
        }
      }
    }
  }
  .body {
    margin-top: 30px;
    overflow: hidden;
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
        line-height: 20px;
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
    .datas {
      // overflow-y: scroll;
      min-height: 200px;
      border: 1px solid #e6e6e8;
      margin: 0 50px;
      margin-top: 30px;
      background-color: #ffffff;

      .tb_list {
        margin: 0 auto;
        width: 100%;
        thead {
          th {
            border-bottom: 1px solid #dfd7d7;
            text-align: center;
            height: 30px;
            line-height: 30px;
          }
        }
        tbody {
          td {
            border-bottom: 1px solid #dfd7d7;
            text-align: center;
            height: 36px;
            line-height: 36px;
          }
        }
      }
    }
  }
  .add {
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
  .data2 {
    width: 90%;
    height: 488px;
    margin: 0 auto;
    background-color: #ffffff;
    overflow: hidden;
    margin-top: 50px;
    border: 1px solid #e6e6e8;

    ul {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      margin-top: 100px;
      color: #a8a8a8;
      font-size: 20px;
      li {
        text-align: center;
        position: relative;
        span {
          position: absolute;
          left: -20px;
        }
      }

      li:nth-child(1) {
        width: 300px;
        height: 50px;
        margin-left: 20px;
        .schoolcheck1 {
          display: inline-block;
          position: relative;
          width: 235px;
          top: -5px;
        }
      }
      li:nth-child(2) {
        width: 300px;
        margin-left: 100px;
        .schoolcheck1 {
          position: relative;
          width: 235px;
          left: 35px;
          top: -5px;
        }
      }
      // li:nth-child(4) {
      //   width: 100px;
      //   height: 30px;
      //   background-color: #169bd5;
      //   text-align: center;
      //   span {
      //     position: absolute;
      //     top: 5px;
      //     left: 15px;
      //     color: white;
      //   }
      // }
    }
    .complet,
    .submit {
      width: 210px;
      height: 34px;
      margin: 0 auto;
      text-align: center;
      background-color: #6999fd;
      line-height: 34px;
      font-size: 20px;
      color: #ffffff;
      margin-top: 100px;
    }
  }
  .data3 {
    .search {
      height: 80px;
      margin: 0 auto;
      background-color: #f8f8fa;
      border: 1px solid #eff2f9;
      box-shadow: #eff2f9 1px 1px 20px;
      li {
        margin-top: 20px;
      }
      li:nth-child(1) {
        font-size: 25px;
        color: #9f9a9b;
        width: 200px;
        float: left;
        margin-left: 10px;

        .icon-wenhao {
          color: #169bd5;
          font-size: 30px;
        }
      }
      li:nth-child(2) {
        float: left;

        margin-left: 0;
        width: 400px;
        span {
          vertical-align: center;
          color: #9f9a9b;
          position: relative;
          top: 5px;
          left: -10px;
        }
        .schoolcheck1 {
          display: inline-block;
          width: 300px;
          position: absolute;
        }
      }
      li:nth-child(3) {
        float: left;
        span {
          display: inline-block;
          height: 33px;
          width: 30px;
          position: relative;
          top: 0px;
          left: -50px;
          cursor: pointer;
          border-radius: 5px;
          color: #bfbfc0;
          background-color: #f8f8fa;
          outline: none;
          line-height: 33px;
          font-size: 22px;
          color: #169bd5;
          border: 2px solid #e2e2e2;
          text-align: center;
        }
      }
    }
    .reset {
      line-height: 30px;
    }
  }
}
.btnactive {
  background-color: #c6e2ff !important
  ;
}
</style>



