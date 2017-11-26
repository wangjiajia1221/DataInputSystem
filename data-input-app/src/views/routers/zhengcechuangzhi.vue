<template>
  <div>
    <el-button @click="handleAdd" type="primary" plain>添加</el-button>
    <el-dialog
      title="添加数据"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="省/直辖市" label-width="300px">
          <el-select placeholder="请选择省/直辖市">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件名" label-width="300px">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文号" label-width="300px">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
    :data="tableData"
    border
    show-summary
    style="width: 100%">
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
  </div>
</template>

<script>
import DataProvider from '@bbfe/data-provider';

let service = new DataProvider();
export default {
  data () {
    return {
      tableData: [],
      dialogVisible: false
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
    handleEdit (index, rowData) {
      console.log(index, rowData)
    },
    handleDelete (index, rowData) {
      console.log(index, rowData)
    },
    handleAdd () {
      this.dialogVisible = true;
    }
  }
}

</script>
<style>
</style>