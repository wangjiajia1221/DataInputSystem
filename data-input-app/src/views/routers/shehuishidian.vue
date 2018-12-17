<template>
  <div>
    <el-tabs v-model="defaultYear" type="card">
      <el-tab-pane label="2018年" name="2018">
        <div style="display:inline-block;width:70%;vertical-align:top;">
          <div class="top-add">
            <el-button @click="handleAdd" type="primary" plain small>添加</el-button>
          </div>
          <div class="top-container">
            <el-tag type="success">表8：社会工作试点示范、工程、计划、项目开展情况统计表</el-tag>
          </div>
        </div>
        <div style="display:inline-block;text-align:left;width:25%">
          <el-card class="box-card">
            <div style="color: red;font-size: 16px;font-weight: 700">填写说明</div>
            <div>1.只填写在省级和地市级范围内开展的社会工作试点示范、工程、计划和项目；不包括民政部在本辖区实施的活动；</div>
            <div>2.覆盖贫困地区数量统计应区分贫困县、贫困村两级，分别填写数量。贫困地区为国家扶贫开发工作重点县、集中连片特困地区覆盖县和国家深度贫困地区覆盖县。</div>
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
                <el-option v-for="index in 3" :label="types[index]" :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="名称:"
              :rules="[
                { required: true, message: '不能为空'}
              ]"
              prop="name">
              <el-input auto-complete="off" v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item
              label="主要情况简介:"
              :rules="[
                { required: true, message: '不能为空'}
              ]"
              prop="description">
              <el-input auto-complete="off" :maxlength="1000" placeholder="最多不超过1000字" type="textarea" v-model="formData.description"></el-input>
            </el-form-item>
            <el-form-item
              label="开展的地区和单位名称:"
              :rules="[
                { required: true, message: '不能为空'}
              ]"
              prop="areaUnit">
              <el-input auto-complete="off" v-model="formData.areaUnit"></el-input>
            </el-form-item>
            <el-form-item
              label="覆盖贫困地区县/村数量（个）:"
              prop="num"
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.num"></el-input>
            </el-form-item>
            <el-form-item
              label="投入资金（万元）:"
              prop="trzj"
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.trzj"></el-input>
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
            prop="name"
            sortable
            label="名称">
          </el-table-column>
          <el-table-column
            sortable
            label="主要情况简介">
            <template slot-scope="scope" v-if="scope.row.description">
              {{utils.subString(scope.row.description, 50, true)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="areaUnit"
            sortable
            label="开展的地区和单位名称">
          </el-table-column>
          <el-table-column
            prop="num"
            sortable
            label="覆盖贫困地区县/村数量（个）">
          </el-table-column>
          <el-table-column
            prop="trzj"
            sortable
            label="投入资金（万元）">
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
        name: null,
        description: null,
        areaUnit: null
      },
      utils: utils,
      types: ['0', 
        '社会工作参与脱贫攻坚示范项目',
        '社会工作试点示范', 
        '社会工作工程、计划、项目',
        ],
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
    getData () {
      let params = {};
      let config = {
        // api请求的baseURL, 用于DataSourceGateWay
        baseURL: '/api/v1',
        // 请求参数以jquery.param方式进行序列化
        paramSerializerJQLikeEnabled: true,
        url: '/shehuishidian/get',
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
        type: null,
        name: null,
        description: null,
        areaUnit: null
      }
    },
    handleEdit (index, rowData) {
      console.log(index, rowData, this.formData)
      this.resetForm();
      this.action = 'edit';
      Object.keys(rowData).forEach(item => {
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
          url: '/shehuishidian/delete',
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
        url: '/shehuishidian/add',
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
        url: '/shehuishidian/update',
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