<template>
  <div class="app-main">
    <div class="div_top" style="width:100%;margin-bottom:10px;">
      <el-date-picker
        style="width:50%;"
        v-model="daterange"
        type="daterange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        clearable
        :picker-options="pickerOptions2"
      >
      </el-date-picker>
      <el-button style="margin-left:10px;" size="mini" @click="checkData">查询</el-button>&nbsp;&nbsp;
      <el-button size="mini" @click="handleDownload">导出</el-button>
    </div>
    <div style="width: 100%">
      <el-table 
        :header-cell-style='tableStyle' 
        :data="tableData" 
        stripe
        style="width: 100%"
        :height="height"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        v-loading = loading
      >
        <el-table-column
          v-for="item in colunmList" 
          :key="item.name"
          :prop="item.value" 
          :label="item.name" 
          :width='item.name==="日期"? 180 : item.name==="地址" ? 300:item.name.length>4?150:100'
        >
        </el-table-column>
        <el-table-column min-width="10"></el-table-column>
      </el-table>
    </div>
    <el-pagination 
      class="elPaginationRight" 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"  
      :current-page="params.pageNum"
      :page-sizes="[10, 20, 30, 40]" 
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { tableStyle } from "@/utils/table";
import {E} from '@/utils/excel'
export default {
  name: "excel",
  data() {
    let tableData =  [
        {
            time: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            time: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            time: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            time: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 1516 弄'
          }
      ]
    
    return {
      tableStyle: tableStyle.color,
      height: document.body.clientHeight - parseInt(170),
      tableData,
      loading: false,
      total:tableData.length,
      params: {
        pageSize: 10,
        pageNum: 1,
        startTime: "",
        endTime: "",
      },
      daterange: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, start]);
            },
          },
          {
            text: "最近7天",
            onClick(picker) {
              const end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近30天",
            onClick(picker) {
              const end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
              const start = new Date();
              start.setTime(end.getTime() - 3600 * 1000 * 24 * 29);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
        disabledDate(time) {
          let curDate = new Date().getTime();
          let sitTime = 365 * 24 * 3600 * 1000;
          let sixMonths = curDate - sitTime;
          let todayDate = new Date() - 8.64e6 - 24 * 60 * 60 * 1000; //最多选择前一天
          return time.getTime() > todayDate || time.getTime() < sixMonths;
        },
      },
      colunmList: [
        { name: "日期", value: "time" },
        { name: "姓名", value: "name" },
        { name: "地址", value: "address" },
      ],
    };
  },
  mounted() {
  },
  methods: {
    // 查询数据
    checkData() {
      if (this.daterange) {
        let time = {
          startTime:this.daterange[0] + " 00:00:00",
          endTime: this.daterange[1] + " 23:59:59"
        }
        this.params = {...this.params,...time}
      }
      console.log(this.params)
    },
    //获取列表信息
    // 导出excel
    handleDownload() {
      // 请求所有数据
      let header = [],
          filter = [],
          that = this;
      let data = { ...that.params };
      // delete data["pageNum"];
      // delete data["pageSize"];
      this.colunmList.forEach(item=>{
          header.push(item.name);
          filter.push(item.value);
      });
      let params = {
        tHeader: header,
        filterVal: filter,
        filename: "统计",
        bookType: "xlsx",
      };
      params.filename = `统计_${data.startTime}_${data.endTime}`;
      //请求数据
      E.downExcel(params, that.tableData);
    },
    handleSizeChange(pageSize) {
      this.params.pageNum = 1;
      this.params.pageSize = pageSize;
    },
    handleCurrentChange(currentPage, pageSize) {
      this.params.pageNum = currentPage;
    },
    handleSelectionChange() {},
  },
};
</script>

<style lang="scss" scoped>

</style>