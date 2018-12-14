<template>
  <div>
    <el-tabs v-model="defaultYear" type="card">
      <el-tab-pane label="2018年" name="2018">
        <div style="display:inline-block;width:60%;vertical-align:top;">
          <div class="top-add">
            <el-button @click="handleAdd" type="primary" plain small>添加</el-button>
          </div>
          <div class="top-container">
            <el-tag type="success">表9：出台志愿服务政策情况统计表</el-tag>
          </div>
        </div>
        <div style="display:inline-block;text-align:left;width:35%">
          <el-card class="box-card">
            <div style="color: red;font-size: 16px;font-weight: 700">填写说明</div>
            <div>1.只填报2018年出台的政策；</div>
            <div>2.填报省委、省人大、省政府及省级民政部门单独或联合相关部门出台的志愿服务法规政策文件（含法规、规划、标准）；</div>
            <div>3.请以上传附件形式，提供文本红头扫描件。</div>
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
            <el-form-item label="文件名:" prop="docName" :rules="[
                { required: true, message: '不能为空'}
              ]">
              <el-input auto-complete="off" placeholder="例：《关于加快XXXX的意见》" v-model="formData.docName"></el-input>
            </el-form-item>
            <el-form-item label="上传文件:">
              <el-upload
                action="/file_upload"
                :data="{'menu': 'table10'}"
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
            <el-form-item label="文号:" prop="docRef" :rules="[
                { required: true, message: '不能为空'}
              ]">
              <el-input auto-complete="off" placeholder="例：（XX发〔2016〕XXX号）" v-model="formData.docRef"></el-input>
            </el-form-item>
            <el-form-item label="发文单位:" prop="creator" :rules="[
                { required: true, message: '不能为空'}
              ]">
              <el-input auto-complete="off"  placeholder="例：XX厅、XX厅、XX局"v-model="formData.creator"></el-input>
            </el-form-item>
            <el-form-item label="发文时间:" >
              <el-date-picker
                v-model="formData.createTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
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
            label="省/直辖市">
          </el-table-column>
          <el-table-column
            prop="docName"
            sortable
            label="文件名称">
          </el-table-column>
          <el-table-column
            prop="docRef"
            sortable
            label="发文文号">
          </el-table-column>
          <el-table-column
            prop="creator"
            sortable
            label="发文单位">
          </el-table-column>
          <el-table-column
            prop="createTime"
            sortable
            label="发文时间">
          </el-table-column>
<!--           <el-table-column
            sortable
            label="文件">
            <template slot-scope="scope" v-if="scope.row.fileList">
              <a :href="scope.row.fileList[0].url">{{scope.row.fileList[0].name}}</a>
            </template>
          </el-table-column> -->
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
        docName: null,
        docRef: null,
        creator: null,
        createTime: null,
        fileList: []
      },
      fileLists: [],
      utils: utils,
      provinces: provinces.provinces,
      dialogVisible: false,
      action: 'add',
      defaultYear: '2018'
    }
  },
  mounted () {
    this.getData();
    // console.log('provinces',provinces.provinces);
    // console.log('this', this)
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
        url: '/zyfwzhengce/get',
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
        docName: null,
        docRef: null,
        creator: null,
        createTime: null,
        fileList: []
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
          url: '/zyfwzhengce/delete',
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
        url: '/zyfwzhengce/add',
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
        url: '/zyfwzhengce/update',
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
<style lang="less" scoped>
  .dialog-footer {
    text-align:center;
  }
</style>