<template>
  <div>
    <el-tabs v-model="defaultYear" type="card">
      <el-tab-pane label="2017年" name="2017">
        <div class="top-add">
          <el-button @click="handleAdd" type="primary" plain small>添加</el-button>
        </div>
        <div class="top-container">
          <el-tag type="success">志愿者注册情况统计表</el-tag>
        </div>
        <el-dialog
          title="添加数据"
          :visible.sync="dialogVisible"
        >
          <el-form :model="formData" ref="formData">
            <el-form-item v-show="false">
              <el-input auto-complete="off" v-model="formData.id"></el-input>
            </el-form-item>
            <el-form-item
              label="注册志愿者总数:"
              
              prop="total"
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.total"></el-input>
            </el-form-item>
            <el-form-item
              label="占当地居民百分比:"
              
              prop="percent"
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.percent"></el-input>%
            </el-form-item>
            <el-form-item
              label="在全国系统注册数:"
              
              prop="sysNum"
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.sysNum"></el-input>
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
            prop="total"
            sortable
            label="注册志愿者总数（人）">
          </el-table-column>
          <el-table-column
            prop="percent"
            sortable
            label="注册志愿者占当地居民人口总数的比例（%）">
          </el-table-column>
          <el-table-column
            prop="sysNum"
            sortable
            label="在全国志愿服务信息系统中的注册志愿者数（人）">
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
        total: null,
        percent: null, 
        sysNum: null
      },
      utils: utils,
      dialogVisible: false,
      action: 'add',
      defaultYear: '2017',
      provinces: provinces.provinces
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      let params = {};
      let config = {
        // api请求的baseURL, 用于DataSourceGateWay
        baseURL: '/api/v1',
        // 请求参数以jquery.param方式进行序列化
        paramSerializerJQLikeEnabled: true,
        url: '/zyzzhuce/get',
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
        total: null,
        percent: null, 
        sysNum: null
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
          url: '/zyzzhuce/delete',
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
        url: '/zyzzhuce/add',
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
        url: '/zyzzhuce/update',
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