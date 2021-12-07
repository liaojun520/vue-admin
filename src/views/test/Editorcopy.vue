
<template>
  <div style="width:60%;min-height:100px;" id="wangeditor">
    <div ref="editorElem"></div>
    <div style="display:flex;width:100%;text-align:left;align-items:center;"><span style="width:100px;display:inline-block;">文档地址:</span><a href="https://www.kancloud.cn/wangfupeng/wangeditor3/460259" target="_blank">https://www.kancloud.cn/wangfupeng/wangeditor3/460259</a></div>
  </div>
</template>
<script>
import E from "wangeditor"; //必须4.0版本以上才能有BtnMenu
import Nickname from "./nikename"
export default {
  name: "Editor1",
  data() {
    return {
      editor: null,
      editorContent: "",
      emojiList: require("./emoji1.json"),
      popData: "",
    };
  },
  props: ["text"],
  watch:{
    text:{
      handler(){
         if(this.text){
          this.popData = this.text.replace(/\n/gi, "<br>");  //当父组件回传的时候将换行符转回br
          this.editor.txt.html(this.popData);
        }else{
          this.popData = ''
        }
        this.$nextTick(()=>{
          this.editor.txt.html(this.popData)
        })
      },
      immediate:true
    }
  },
  methods: {
   
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = (html) => {
      this.editorContent = html;
      // 处理内容里的标签内容
      this.editorContent = this.editorContent.replace(/<span style="font-size: 14px;">/gi, "");
      this.editorContent = this.editorContent.replace(/<span style="font-size: 16px;">/gi, "");
      this.editorContent = this.editorContent.replace(/<span style="font-size: 12px;">/gi, "");
      this.editorContent = this.editorContent.replace(/<span style="font-size: 18px;">/gi, "");
      this.editorContent = this.editorContent.replace(/<span style="font-size: 20px;">/gi, "");
      this.editorContent = this.editorContent.replace(/<\/span>/gi, "");
      this.editorContent = this.editorContent.replace(/<\/p><p>/gi, "<br>");
      this.editorContent = this.editorContent.replace(/<p>/gi, "");
      this.editorContent = this.editorContent.replace(/<\/div>/gi, "");
      this.editorContent = this.editorContent.replace(/<div>/gi, "");
      this.editorContent = this.editorContent.replace(/<a>/gi, "");
      this.editorContent = this.editorContent.replace(/<\/a>/gi, "");
      this.editorContent = this.editorContent.replace(/&nbsp;/gi, "");
      this.editorContent = this.editorContent.replace(/<br\/>/gi, "<br>");
      this.editorContent = this.editorContent.replace(/<\/p>/gi, "<br>");
      this.editorContent = this.editorContent.replace(/<br><br>/gi, "<br>");
      console.warn(this.editorContent);
      this.$emit("getText", this.editorContent);  //父组件接收的时候 记得 把<br> 转回\n
    };
    this.editor.config.menus = [
      "emoticon", // 表情
      "undo", // 撤销
    ];
    this.editor.config.emotions = [
      {
        title: "表情",
        type: "emoji",
        content: this.emojiList,
      },
    ];
    this.editor.menus.extend('nickname', Nickname)  // 配置扩展的菜单
    this.editor.config.menus = this.editor.config.menus.concat('nickname')
    this.editor.create(); // 创建富文本实例
    this.editor.txt.html(this.popData);
  },
};
</script>
<style lang='scss' scoped>
#wangeditor {
  position: relative;
  z-index: 1;
}
>>>.w-e-text-container{
  height:200px!important;
}
</style>