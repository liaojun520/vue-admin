import E from 'wangeditor' // npm 安装 4.0版本以上
const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E

//封装wangeditor自定义组件 可以以vue的this作为参数实现vue组件的功能
var hudong1 //= require("@/assets/img/hudong1.png")
var link1 //= require("@/assets/img/link.png")
var user1 //= require("@/assets/img/user1.png")

var _this = null
export  default class Nickname extends BtnMenu {
  constructor(editor) {
    _this = editor
    const $elem = E.$(
      `<div class="w-e-menu w-e-menu1" data-title="用户昵称">
      <img class="imm" src=${user1} alt="" />
      <span>用户昵称</span>
      </div>`
    );
    super($elem, editor);
  }
  // 菜单点击事件
  clickHandler() {
    _this.cmd.do("insertHTML", "${nickname}");
  }
  // 菜单激活状态
  tryChangeActive() {
    this.active(); // 菜单激活
    // this.unActive() // 菜单不激活
  }
}

export const showLinks = (vue)=>{
  var _this = null 
  return class showLink extends BtnMenu {
    constructor(editor) {
      _this = editor
      const $elem = E.$(
        `<div class="w-e-menu"  data-title="链接">
          <img class="immm" src=${link1} alt="" />
        </div>`
      );
      super($elem, editor);
    }
    // 菜单点击事件
    clickHandler() {
      vue.chain = false
      vue.showLink = true
    }
    // 菜单激活状态
    tryChangeActive() {
      this.active(); // 菜单激活
      // this.unActive() // 菜单不激活
    }
  }

}

export const hudongs = (vue)=>{
  var _this = null 
  return class hudong extends BtnMenu {
    constructor(editor) {
      _this = editor
      const $elem = E.$(
        `<div class="w-e-menu w-e-menu1" data-title="互动链">
          <img class="imm" src=${hudong1} alt="" />
          <span>互动链</span>
        </div>`
      );
      super($elem, editor);
    }
    // 菜单点击事件
    clickHandler() {
      vue.showLink = false
      vue.chain = true
    }
    // 菜单激活状态
    tryChangeActive() {
      this.active(); // 菜单激活
      // this.unActive() // 菜单不激活
    }
  }

}
