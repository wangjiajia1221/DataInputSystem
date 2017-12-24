<template>
  <div>
    <el-tabs v-model="defaultYear" type="card">
      <el-tab-pane label="2017年" name="2017">
        <div style="display:inline-block;width:70%;vertical-align:top;">
          <div class="top-add">
            <el-button @click="handleAdd" type="primary" plain small>添加</el-button>
          </div>
          <div class="top-container">
            <el-tag type="success">社会工作（志愿服务）行政管理机构成立情况统计表</el-tag>
          </div>
        </div>
        <div style="display:inline-block;text-align:left;width:25%">
          <el-card class="box-card">
            <div>1.请分类提供省级、地市级、县区级社会工作行政管理机构的具体名称；</div>
            <div>2.不符合以上四类情况的不统计。</div>
          </el-card>
        </div>
        <el-dialog
          title="添加数据"
          :visible.sync="dialogVisible"
        >
          <el-form :model="formData">
            <el-form-item v-show="false">
              <el-input auto-complete="off" v-model="formData.id"></el-input>
            </el-form-item>
            <!-- <el-form-item label="省/直辖市:" >
              <el-select placeholder="请选择省/直辖市" v-model="formData.province">
                <el-option
                  v-for="province in provinces"
                  :key="province.name"
                  :label="province.name_cn"
                  :value="province.name_cn">
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="级别:" >
              <el-select placeholder="请选择级别" v-model="formData.level">
                <el-option :label="levels[1]" value="1"></el-option>
                <el-option :label="levels[2]" value="2"></el-option>
                <el-option :label="levels[3]" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类别:" >
              <el-select placeholder="请选择类别" v-model="formData.type">
                <el-option :label="types[1]" value="1"></el-option>
                <el-option :label="types[2]" value="2"></el-option>
                <el-option :label="types[3]" value="3"></el-option>
                <el-option :label="types[4]" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地区和机构名称:" prop="orgNames" :rules="[
                { required: true, message: '不能为空'}
              ]">
              <el-input auto-complete="off" type="textarea" v-model="formData.orgNames" :maxlength='1000' placeholder="例：XX省/市/县/区民政厅社会工作处，最多不不超过1000字"></el-input>
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
        
        max-height="100px"
        border
        style="width: 95%; margin-left:20px">
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
            sortable
            label="级别">
            <template slot-scope="scope">
              {{levels[scope.row.level]}}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="类别">
            <template slot-scope="scope">
              {{types[scope.row.type]}}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="地区和机构名称">
            <template slot-scope="scope" v-if="scope.row.orgNames">
              {{utils.subString(scope.row.orgNames, 50, true)}}
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
        level: null,
        type: null,
        orgNames: null
      },
      utils: utils,
      types: ['0', '编制管理部门批准设立的社会工作处（科、股）',
        '内部设立相对独立的社会工作处（科、股）',
        '在相关处（科、股）加挂社会工作处（科、股）牌子',
        '成立社会工作事业单位'],
      levels: ['0', '省级', '地市级', '县级'],
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
        url: '/xingzhengjigou/get',
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
        level: null,
        type: null,
        orgNames: null
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
          url: '/xingzhengjigou/delete',
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
        url: '/xingzhengjigou/add',
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
    },
    confirmEdit () {
      let data = this.formData;
      let config = {
        baseURL: '/api/v1',
        paramSerializerJQLikeEnabled: true,
        url: '/xingzhengjigou/update',
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