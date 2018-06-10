<template lang="html">
  <div class="easy-pagination">
    <slot :data="currentItems">
    </slot>
    <el-pagination
      layout="prev, pager, next"
      :page-count="pageCount"
      :current-page="currentPage"
      @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
import Vue from 'vue';

// TODO: 修改页码时没锁定，异步请求，可能数据与当前页码不一致不一致

export default Vue.component('easy-pagination', {
  props: ['data'],
  mounted () {
  },
  data () {
    return {
      items: [],
      currentItems: [],
      offset: 0, //传递给父组件，用于计算当前页及之前所有页的数据总量
      limit: 10, //等同pageSize,用户传递给父组件
      total: 0,
      currentPage: 1,
      pageSize: 10 //每页数量
    };
  },
  methods: {
    getCurrentPageTableData () {
      console.log('getCurrentPageTableData', this.pageRangeMin);
      let start = Math.abs(this.currentPage - this.pageRangeMin) * this.pageSize;
      let end = start + this.pageSize;

      if (Array.isArray(this.items)) {
        return this.items.slice(start, end);
      }
    },
    currentChange (currentPage) {
      this.currentPage = currentPage;
      if (((currentPage < this.pageRangeMin) && (currentPage >= 1)) || ((currentPage > this.pageRangeMax) && (currentPage <= this.pageCount))) {
        this.offset = (currentPage - 1) * this.pageSize;
        this.$emit('get-data', {offset: this.offset, limit: this.limit});
      }
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.total / this.pageSize);
    }
  },
  watch: {
    currentPage (val, oldVal) {
      this.currentItems = this.getCurrentPageTableData();
    },
    data (val, oldVal) {
      this.items = val;
      this.total = val.length;
      this.pageRangeMax = Math.floor((this.offset + this.limit) / this.pageSize);
      this.pageRangeMin = Math.ceil(this.offset / this.pageSize) + 1;
      this.currentItems = this.getCurrentPageTableData();
    },
    currentItems (val, oldVal) {
      console.log(val);
    }
  }
});
</script>

<style lang="less">
</style>
