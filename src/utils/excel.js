export const E = {
  formatJson: function (filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]));
  },
  downExcel: function (options, list) {
    let changeList
    if(list && list instanceof Array){
      changeList = list.map(o => ({ ...o }));//深拷贝=>不改原数组
    }else{
      changeList = []
    }
    import("@/vendor/Export2Excel").then(excel => {
      const data = this.formatJson(options.filterVal, changeList);
      excel.export_json_to_excel({
        header: options.tHeader,
        data,
        filename: options.filename,
        bookType: options.bookType
      });
    }).catch(error=>{
      console.warn(error)
    })
  },
}