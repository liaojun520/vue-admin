<template>
  <div class="app-main">
    <div>
      <el-button type="primary" @click="downLoad">下载1</el-button>&nbsp;&nbsp;
      <el-button type="primary" @click="downLoad">下载2</el-button>
    </div>
  </div>
</template>

<script>
const a = require("./resJson.json")
console.log(a)
export default {
  name: "downLoad",
  data() {
    return {
      resObj:{}
    };
  },
  methods: {
    downLoad() {
     try { //进制流
        if (this.resObj["attachment-name"].indexOf("xlsx") > -1) {
        const link = document.createElement("a");
        let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.download = "测试"; //下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const link = document.createElement("a");
        let blob = new Blob([res.data], { type: "application/zip" });
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.download = "测试"; //下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
     } catch (error) {
       
     }
    },
  },
};
</script>

<style>
</style>