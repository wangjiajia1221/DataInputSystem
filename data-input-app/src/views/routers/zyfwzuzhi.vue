<template>
  <div>
    <el-tabs v-model="defaultYear" type="card">
      <el-tab-pane label="2018年" name="2018">
        <div style="display:inline-block;width:60%;vertical-align: top;">
          <div class="top-add">
            <el-button @click="handleAdd" type="primary" plain small>添加</el-button>
          </div>
          <div class="top-container">
            <el-tag type="success">表10：志愿服务组织情况统计表</el-tag>
          </div>
        </div>
        <div style="display:inline-block;text-align:left;width:35%">
          <el-card class="box-card">
            <div style="color: red;font-size: 16px;font-weight: 700">填写说明</div>
            <div>1.请统计依法成立、以开展志愿服务为宗旨的志愿服务组织数量，并按社会团体、社会服务机构、基金会三类分别提供名录；</div>
            <div>2.请按层级统计在单位内部成立的志愿服务队伍数量；</div>
            <div>3.请统计社区内部成立的志愿服务队伍总数；</div>
            <div>4.请统计全省社区志愿服务站点的总数，并提供社区志愿服务站点总体发展情况的文字材料。</div>
            <div style="color: red">注意:"社区内部成立的志愿服务队伍总数"和"全省社区志愿服务站点数"仅填写一次！</div>
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
            <el-form-item label="级别:" >
              <el-select placeholder="请选择级别" v-model="formData.level">
                <el-option :label="levels[1]" value="1"></el-option>
                <el-option :label="levels[2]" value="2"></el-option>
                <el-option :label="levels[3]" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="地区:"
              :rules="[
                { required: true, message: '不能为空'}
              ]"
              prop="areaName">
              <el-input 
                placeholder="如XX市或XX县"
                auto-complete="off" v-model="formData.areaName"></el-input>
            </el-form-item>
            <el-form-item
              label="社会团体:"
              
              prop="shtt"
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.shtt"></el-input>
            </el-form-item>
            <el-form-item
              label="社会服务机构:"
              prop="shfwjg"
              
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.shfwjg"></el-input>
            </el-form-item>
            <el-form-item
              label="基金会:"
              prop="jjh"
              
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input auto-complete="off" v-model.number="formData.jjh"></el-input>
            </el-form-item>
            <el-form-item
              label="单位内部成立的志愿服务队伍数（个）:"
              prop="innerOrgNum"
              
              :rules="[
                { required: true, message: '数量不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input
                auto-complete="off" v-model.number="formData.innerOrgNum"></el-input>
            </el-form-item>
            <el-form-item
              label="社区内部成立的志愿服务队伍总数（个）:"
              prop="sqTotalNum"
              :rules="[
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input 
                placeholder="仅能填写一次，重复填写将报错"
                auto-complete="off" v-model.number="formData.sqTotalNum"></el-input>
            </el-form-item>
            <el-form-item
              label="全省社区志愿服务站点数（个）:"
              prop="totalNum"
              
              :rules="[
                { type: 'number', message: '必须为数字值'}
              ]">
              <el-input 
                placeholder="仅能填写一次，重复填写将报错"
                auto-complete="off" v-model.number="formData.totalNum"></el-input>
            </el-form-item>
            <el-form-item label="上传文件:">
              <el-upload
                action="/file_upload"
                :data="{'menu': 'table11'}"
                :on-remove="handleRemove"
                accept=".doc, .docx, .pdf"
                :on-success="uploadSuccess"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="formData.fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf文件</div>
              </el-upload>
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
            label="级别">
            <template slot-scope="scope">
              {{levels[scope.row.level]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="areaName"
            sortable
            label="地区">
          </el-table-column>
          <el-table-column label="在民政部门登记的志愿服务组织数">
            <el-table-column
              prop="shtt"
              sortable
              label="社会团体">
            </el-table-column>
            <el-table-column
              prop="shfwjg"
              sortable
              label="社会服务机构">
            </el-table-column>
            <el-table-column
              prop="jjh"
              sortable
              label="基金会">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="innerOrgNum"
            sortable
            label="单位内部成立的志愿服务队伍数（个）">
          </el-table-column>
          <el-table-column
            prop="sqTotalNum"
            sortable
            label="社区内部成立的志愿服务队伍总数（个）">
          </el-table-column>
          <el-table-column
            prop="totalNum"
            sortable
            label="全省社区志愿服务站点数（个）">
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
        <el-card class="box-card" style="width: 80%; text-align: left; margin:20px 0 0 20px; font-size: 16px">
          <div slot="header" class="clearfix">
            当前用户已上传的文件列表：
          </div>
          <ol>
            <li v-for="file in fileLists">
              {{file}}
            </li>
          </ol>
        </el-card>
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
        areaName: null,
        shtt: null,
        shfwjg: null,
        jjh: null,
        innerOrgNum: null,
        totalNum: null,
        fileList: []
      },
      fileLists: [],
      utils: utils,
      dialogVisible: false,
      action: 'add',
      defaultYear: '2018',
      levels: ['0', '省级', '地市级', '县区级'],
      provinces: provinces.provinces
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    handleExceed(file, fileList) {
      this.$message.warning('一次只能上传一个文件!');
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    uploadSuccess(file, fileList) {
      console.log(file, fileList)
    },
    getData () {
      let params = {};
      let config = {
        // api请求的baseURL, 用于DataSourceGateWay
        baseURL: '/api/v1',
        // 请求参数以jquery.param方式进行序列化
        paramSerializerJQLikeEnabled: true,
        url: '/zyfwzuzhi/get',
        // to methods of that instance.
        method: 'get',
        // params仅用于get请求， 会拼接在url后面
        params: params
      };
      service.request(config)
      .then(data => {
        console.log(data);
        this.tableData = data.data;
        if(data.fileList) {
          // debugger
          this.fileLists = data.fileList;
        }
      }, err => {
        this.$alert(err.message);
      });
    },
    resetForm () {
      this.formData = {
        id: null,
        province: null,
        level: null,
        areaName: null,
        shtt: null,
        shfwjg: null,
        jjh: null,
        innerOrgNum: null,
        totalNum: null,
        fileList: []
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
          url: '/zyfwzuzhi/delete',
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
        url: '/zyfwzuzhi/add',
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
        url: '/zyfwzuzhi/update',
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