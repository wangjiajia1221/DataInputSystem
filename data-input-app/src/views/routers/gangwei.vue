<template>
  <div>
    <el-tabs v-model="defaultYear" type="card">
      <el-tab-pane label="2018年" name="2018">
        <div style="display:inline-block;width:70%;vertical-align:top;">
          <div class="top-add">
            <el-button @click="handleAdd" type="primary" plain small>添加</el-button>
          </div>
          <div class="top-container">
            <el-tag type="success">表2：社会工作岗位开发设置情况统计表</el-tag>
          </div>
        </div>
        <div style="display:inline-block;text-align:left;width:25%">
          <el-card class="box-card">
            <div style="color: red;font-size: 16px;font-weight: 700">填写说明</div>
            <div>1.社会工作岗位及职责的定义参照《关于加强社会工作专业岗位开发与人才激励保障的意见》（民发〔2017〕186号）；</div>
            <div>2.社会工作服务站（室、中心）应是明确设立，实际功能为提供社会工作服务的站（室、中心）；</div>
            <div>3.分类统计所辖范围内各类单位中设置社会工作岗位、站（科室、中心）等情况；</div>
          </el-card>
        </div>
        <el-dialog
          title="添加数据"
          :visible.sync="dialogVisible"
        >
          <el-form :model="formData" ref="formData">
            <el-form-item v-show="false">
              <el-input auto-complete="off" v-model="formData.id"></el-input>
            </el-form-item>
            <el-form-item label="类别:" >
              <el-select placeholder="请选择类别" v-model="formData.type">
                <el-option v-for="i in 5" :label="types[i]" :value="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="岗位数量（个）:"
              
              prop="gangweiNum"
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.gangweiNum"></el-input>
            </el-form-item>
            <el-form-item
              label="社会工作服务站（室、中心）设置情况（个）:"
              prop="fuwuzhanNum"
              
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.fuwuzhanNum"></el-input>
            </el-form-item>
            <el-form-item
              label="虽未明确为社会工作岗位，但实际岗位职责包括社会工作的（个）:"
              prop="otherNum"
              
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.otherNum"></el-input>
            </el-form-item>           
            <el-form-item
              label="已取得社会工作学历学位、职业资格或培训证书，但未从事社会工作的（人）:"
              prop="nojobNum"
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.nojobNum"></el-input>
            </el-form-item>
            <el-form-item
              label="备注:"
              :rules="[
                { required: true, message: '备注不能为空'}
              ]"
              prop="comment">
              <el-input 
                auto-complete="off" 
                :maxlength='1000' 
                type="textarea" 
                placeholder="最多不不超过1000字"
                v-model.number="formData.comment"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd" v-if="action=='add'">确 定</el-button>
            <el-button type="primary" @click="confirmEdit" v-if="action=='edit'">确 定</el-button>
          </div>
        </el-dialog>
        <el-table
        :data="tableData"
        border
        show-summary
        style="width: 95%;margin-left:20px">
          <el-table-column
            width="50"
            label="序号">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="province"
            sortable
            label="省（区、市）">
          </el-table-column>
          <el-table-column
            sortable
            label="类别">
            <template slot-scope="scope">
              {{types[scope.row.type]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="gangweiNum"
            sortable
            label="岗位数量（个）">
          </el-table-column>
          <el-table-column
            prop="fuwuzhanNum"
            sortable
            label="社会工作服务站（室、中心）设置情况（个）">
          </el-table-column>
          <el-table-column
            prop="otherNum"
            sortable
            label="虽未明确为社会工作岗位，但实际岗位职责包括社会工作的（个）">
          </el-table-column>
          <el-table-column
            prop="nojobNum"
            sortable
            label="已取得社会工作学历学位、职业资格或培训证书，但未从事社会工作的（人）">
          </el-table-column>
          <el-table-column
            sortable
            label="总计（人）">
            <template slot-scope="scope">
              {{sum(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="备注">
            <template slot-scope="scope" v-if="scope.row.comment">
              {{utils.subString(scope.row.comment, 50, true)}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DataProvider from '@bbfe/data-provider';
import provinces from '../../config/provinces'
import utils from '../../utils'

let service = new DataProvider();
export default {
  data () {
    return {
      tableData: [],
      formData: {
        id: null,
        province: null,
        type: null,
        gangweiNum: null, 
        fuwuzhanNum: null,
        otherNum: null,
        nojobNum: null,
        comment: null
      },
      utils: utils,
      types: ['0', '乡镇、街道和社区', '民政事业单位', '其他系统事业单位', '社会组织', '其他（请在备注注明）'],
      dialogVisible: false,
      action: 'add',
      defaultYear: '2018',
      provinces: provinces.provinces
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    sum(rowData) {
      let sum = 0;
      Object.keys(rowData).forEach(item => {
        // debugger
        if(item!='id'&&item!='province'&&item!='type'&&item!='comments')
        sum += parseInt(rowData[item]);
      })
      return sum;
    },
    getData () {
      let params = {};
      let config = {
        // api请求的baseURL, 用于DataSourceGateWay
        baseURL: '/api/v1',
        // 请求参数以jquery.param方式进行序列化
        paramSerializerJQLikeEnabled: true,
        url: '/gangwei/get',
        // to methods of that instance.
        method: 'get',
        // params仅用于get请求， 会拼接在url后面
        params: params
      };
      service.request(config)
      .then(data => {
        console.log(data);
        this.tableData = data.data;
      }, err => {
        this.$alert(err.message);
      });
    },
    resetForm () {
      this.formData = {
        id: null,
        province: null,
        gangweiNum: null,
        type: null,
        fuwuzhanNum: null,
        otherNum: null,
        nojobNum: null,
        comment: null
      }
    },
    handleEdit (index, rowData) {
      console.log(index, rowData, this.formData)
      this.resetForm();
      this.action = 'edit';
      Object.keys(this.formData).forEach(item => {
        this.formData[item] = rowData[item];
      })
      this.dialogVisible = true;
    },
    handleDelete (index, rowData) {
      console.log(index, rowData)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let config = {
          baseURL: '/api/v1',
          paramSerializerJQLikeEnabled: true,
          url: '/gangwei/delete',
          method: 'post',
          data: {id: rowData.id}
        };
        service.request(config)
        .then(data => {
          if (Object.keys(data) == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.tableData.splice(index, 1);
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            });
          }
        }, err => {
          this.$alert(err.message);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleAdd () {
      this.resetForm();
      this.action = 'add';
      this.dialogVisible = true;
    },
    confirmAdd () {
      let data = this.formData;
      let config = {
        // api请求的baseURL, 用于DataSourceGateWay
        baseURL: '/api/v1',
        // 请求参数以jquery.param方式进行序列化
        paramSerializerJQLikeEnabled: true,
        url: '/gangwei/add',
        // to methods of that instance.
        method: 'post',
        // data仅用于post请求， 放在http请求体中
        data: data
      };
       this.$refs['formData'].validate((valid) => {
        if (valid) {
          service.request(config)
          .then(data => {
            console.log(data);
            if (data.id) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.formData.id = data.id;
              this.formData.province = data.province;
              this.tableData.unshift(this.formData);
              this.dialogVisible = false;
            } else {
              this.$message({
                message: '添加失败',
                type: 'error'
              });
            } 
          }, err => {
            this.$alert(err.message);
          });
        }
      })
    },
    confirmEdit () {
      let data = this.formData;
      let config = {
        baseURL: '/api/v1',
        paramSerializerJQLikeEnabled: true,
        url: '/gangwei/update',
        method: 'post',
        data: data
      };
      service.request(config)
      .then(data => {
        if (Object.keys(data) == 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.tableData.forEach((item, index) => {
            if (this.formData.id == item.id) {
              this.tableData.splice(index, 1, this.formData);
            }
          })
          console.log(this.tableData);
          this.dialogVisible = false;
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          });
        }
      }, err => {
        this.$alert(err.message);
      });
    }
  }
}

</script>
<style lang="less">
  .dialog-footer {
    text-align:center;
  }
</style>