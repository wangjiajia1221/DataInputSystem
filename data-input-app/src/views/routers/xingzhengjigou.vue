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
                <el-option label="上海市" value="上海市"></el-option>
                <el-option label="北京市" value="北京市"></el-option>
                <el-option label="河北省" value="河北省"></el-option>
                <el-option label="内蒙古自治区" value="内蒙古自治区"></el-option>
                <el-option label="辽宁省" value="辽宁省"></el-option>
                <el-option label="陕西省" value="陕西省"></el-option>
                <el-option label="黑龙江省" value="黑龙江省"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="级别:" label-width="100px">
              <el-select placeholder="请选择级别" v-model="formData.level">
                <el-option label="地市级" value="地市级"></el-option>
                <el-option label="县级" value="县级"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="独立设立的市(区县):" label-width="100px">
              <el-input auto-complete="off" v-model="formData.independent"></el-input>
            </el-form-item>
            <el-form-item label="相关加挂的市(区县):" label-width="100px">
              <el-input auto-complete="off" v-model="formData.relate"></el-input>
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
            prop="level"
            sortable
            label="级别">
          </el-table-column>
          <el-table-column
            prop="independent"
            sortable
            label="设立相对独立的社会工作处室（科、股）的市（区、县）">
          </el-table-column>
          <el-table-column
            prop="relate"
            sortable
            label="在相关处室加挂社会工作处室（科、股）牌子的市（区、县）">
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

let service = new DataProvider();
export default {
  data () {
    return {
      tableData: [],
      formData: {
        id: null,
        province: null,
        level: null,
        independent: null,
        relate: null
      },
      dialogVisible: false,
      action: 'add',
      defaultYear: '2017'
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      let params = {a:1,b:'get'};
      let config = {
        // api请求的baseURL, 用于DataSourceGateWay
        baseURL: '/api/v1',
        // 请求参数以jquery.param方式进行序列化
        paramSerializerJQLikeEnabled: true,
        url: '/xingzhengjigou/get/zhengcechuangzhi/get',
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
          url: '/xingzhengjigou/delete',
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