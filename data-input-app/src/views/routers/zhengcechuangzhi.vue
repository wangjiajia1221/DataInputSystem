<template>
  <div>
    <el-tabs v-model="defaultYear" type="card">
      <el-tab-pane label="2017年" name="2017">
        <div class="top-container">
          <el-button @click="handleAdd" type="primary" plain small>添加</el-button>
        </div>
        <el-dialog
          title="添加数据"
          :visible.sync="dialogVisible"
          width="40%"
        >
          <el-form :model="formData">
            <el-form-item v-show="false">
              <el-input auto-complete="off" v-model="formData.id"></el-input>
            </el-form-item>
            <el-form-item label="省/直辖市:" label-width="100px">
              <el-select placeholder="请选择省/直辖市" v-model="formData.province">
                <el-option
                  v-for="province in provinces"
                  :key="province.name"
                  :label="province.name_cn"
                  :value="province.name_cn">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文件名:" label-width="100px">
              <el-input auto-complete="off" v-model="formData.docName"></el-input>
            </el-form-item>
            <el-form-item label="文号:" label-width="100px">
              <el-input auto-complete="off" v-model="formData.docRef"></el-input>
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
            label="省/直辖市">
          </el-table-column>
          <el-table-column
            prop="docName"
            sortable
            label="社会工作政策">
          </el-table-column>
          <el-table-column
            prop="docRef"
            sortable
            label="文号">
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

let service = new DataProvider();
export default {
  data () {
    return {
      tableData: [],
      formData: {
        id: null,
        province: null,
        docName:null,
        docRef:null
      },
      provinces: provinces.provinces,
      dialogVisible: false,
      action: 'add',
      defaultYear: '2017'
    }
  },
  mounted () {
    this.getData();
    // console.log('provinces',provinces.provinces);
    // console.log('this', this)
  },
  methods: {
    getData () {
      let params = {};
      let config = {
        // api请求的baseURL, 用于DataSourceGateWay
        baseURL: '/api/v1',
        // 请求参数以jquery.param方式进行序列化
        paramSerializerJQLikeEnabled: true,
        url: '/zhengcechuangzhi/get',
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
        console.log(err);
      });
    },
    resetForm () {
      this.formData = {
        id: null,
        province: null,
        docName:null,
        docRef:null
      }
    },
    handleEdit (index, rowData) {
      console.log(index, rowData)
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
          url: '/zhengcechuangzhi/delete',
          method: 'post',
          data: rowData.id
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
          console.log(err);
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
        url: '/zhengcechuangzhi/add',
        // to methods of that instance.
        method: 'post',
        // data仅用于post请求， 放在http请求体中
        data: data
      };
      service.request(config)
      .then(data => {
        console.log(data);
        if (data.id) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.formData.id = data.id;
          this.tableData.unshift(this.formData);
          this.dialogVisible = false;
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          });
        }
        
      }, err => {
        console.log(err);
      });
    },
    confirmEdit () {
      let data = this.formData;
      let config = {
        baseURL: '/api/v1',
        paramSerializerJQLikeEnabled: true,
        url: '/zhengcechuangzhi/update',
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
        console.log(err);
      });
    }
  }
}

</script>
<style lang="less">
  .top-container {
    height:80px;
    line-height:80px;
    text-align:left;
    padding-left:20px;
  }
  .el-form-item{
    margin-left: 30px;
    .el-form-item__content {
      width: 60%;
      text-align: left;
    }
  }
  .dialog-footer {
    text-align:center;
  }
</style>