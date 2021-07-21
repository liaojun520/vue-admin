
    import Vue from 'vue'
    /**
     * 自定义指令
     * bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

      update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

      componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

      unbind：只调用一次，指令与元素解绑时调用。
     */
    
    /**权限指令**/
    Vue.directive('has', {
      inserted: function (el, binding, vnode) {    //bind 获取不到 el.parentNode
          // console.log(binding)
            // 获取页面按钮权限
            let btnPermissionsArr = [];
            if(binding.value){
                // 如果指令传值，获取指令参数
                btnPermissionsArr = Array.of(binding.value);
            }else{
                // 否则获取路由中的参数
                btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
            }
            if (!Vue.prototype.$_has(btnPermissionsArr)) { //根据指令参数和当前登录人按钮权限做比较。
              // console.log(el.parentElement)
                el.parentNode.removeChild(el); //移除当前元素
            }
        }
    });
    // 权限检查方法
    Vue.prototype.$_has = function (value) {
        let isExist = false;
        // 获取用户按钮权限   ==》》》》》》》这里我们假设默认权限用户类型为 admin
        let btnPermissionsStr = sessionStorage.getItem("btnPermissions") || 'admin';
        if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
            return false;
        }
        if (value.indexOf(btnPermissionsStr) > -1) {
            isExist = true;
        }
        return isExist;
    };




    //在vue全局使用 声明全局自定义指令   ==》局部使用的得写进组件内部