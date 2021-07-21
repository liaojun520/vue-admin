
<template>
  <div style="width:50%;margin:0 auto;" id="wangeditor">
    <div ref="editorElem"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      editorContent: "",
      emojiList: require("./emoji.json"),
      popData: "",
      pop:'测试'
      // img: require("@/assets/img/hudong.png"),
    };
  },
  // props: ["pop", "isShow"], // 接收父组件的方法
  methods: {
   
    filterFUN(url, alt) {
      //需要处理的   条件   替换的
      this.emojiList.forEach((element) => {
        let url =
          '<img src="' +
          element.src +
          '" alt="' +
          element.alt +
          '" data-w-e="1">';
        let url2 = '<img src="' + element.src + '" data-w-e="1">';
        if (this.editorContent.indexOf(url) !== -1) {
          this.editorContent = this.editorContent.replace(url, element.alt);
          this.filterFUN();
        }
        if (this.editorContent.indexOf(url2) !== -1) {
          this.editorContent = this.editorContent.replace(url2, element.alt);
          this.filterFUN();
        }
      });
    },
    filterFUNX() {
      this.emojiList.forEach((element) => {
        let url = '<img src="' + element.src + '" data-w-e="1">';
        if (this.popData.indexOf(element.alt) !== -1) {
          this.popData = this.popData.replace(element.alt, url);
          this.filterFUNX();
        }
      });
    },
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    console.error(this.editor)
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = (html) => {
      console.log("执行了", html);
      this.editorContent = html;
      // 处理内容里的标签内容
      this.editorContent = this.editorContent.replace(/<\/p><p>/gi, "<br>");
      this.editorContent = this.editorContent.replace(/<\/p><a/gi, "<br>");
      this.editorContent = this.editorContent.replace(/<div><a/gi, "<br><a");
      this.editorContent = this.editorContent.replace(/<p>/gi, "");
      this.editorContent = this.editorContent.replace(/<\/p>/gi, "");
      this.editorContent = this.editorContent.replace(/ &nbsp;/gi, " ");
      this.editorContent = this.editorContent.replace(/&nbsp;/gi, " ");
      this.editorContent = this.editorContent.replace(/<div>/gi, "");
      this.editorContent = this.editorContent.replace(/<\/div>/gi, "");
      this.editorContent = this.editorContent.replace(/<span>/gi, "");
      this.editorContent = this.editorContent.replace(/<\/span>/gi, "");
      this.editorContent = this.editorContent.replace(/target="_blank"/gi, "");
      this.editorContent = this.editorContent.replace(/&amp;/gi, "&");
      this.editorContent = this.editorContent.replace(/&gt;/gi, ">");
      this.editorContent = this.editorContent.replace(/&lt;/gi, "<");
      this.filterFUN();
      console.warn(this.editorContent);
      // this.$emit("catchData", this.editorContent);
    };
    this.editor.config.menus = [
      // 菜单配置
      //   'head', // 标题
      //   'bold', // 粗体
      //   'fontSize', // 字号
      //   'fontName', // 字体
      //   'italic', // 斜体
      //   'underline', // 下划线
      //   'strikeThrough', // 删除线
      //   'foreColor', // 文字颜色
      //   'backColor', // 背景颜色
      "link", // 插入链接
      //   'list', // 列表
      //   'justify', // 对齐方式
      //   'quote', // 引用
      "emoticon", // 表情
      //   'image', // 插入图片
      //   'table', // 表格
      //   'code', // 插入代码
      "undo", // 撤销
      //   'redo' // 重复
    ];
    this.editor.config.emotions = [
      {
        // tab 的标题
        title: "表情",
        // type -> 'emoji' / 'image'
        type: "image",
        // content -> 数组
        // content: [':1:',':2:']
        content: this.emojiList,
      },
    ];
    this.editor.create(); // 创建富文本实例
    if (this.pop) {
      this.popData = this.pop;
      this.filterFUNX();
      this.editor.txt.html(this.popData);
    }
  },
};
</script>
<style lang='scss' scoped>
#wangeditor {
  position: relative;
  z-index: 100000;
}
</style>