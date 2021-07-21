const express = require('express');
const router = new express.Router();
const Login = require('../model/login');
let {checkFun} = require('../utils/index')
//登录
router.post('/user/login',async (req,res)=>{
  let value = req.body;
  //账号密码校验
  if(checkFun(value)){
     //先判断账号是否存在 查询数据库
     let result = await Login.findOne({username:value.username});
     if(result){  //账号存在
       if(result.password==value.password){ //密码匹配
        res.json({
            code:0,
            message:result.username+'登陆',
            data:result._id
        })
       }else{
        res.json({
          code:-9,
          message:'密码不正确',
          data:null
        })
       }
     }else{ //账号不存在
        // await new Login({username:value.username}).save(); 存数据库
        res.json({
            code:-2,
            message:'账号不存在',
            data:null
        })
     }
  }else{
    res.json({
        code:-1,
        message:'密码不符合规则',
        data:null
    })
  }
})

//登陆失效测试  特定code 返回1010   （比如说请求任何接口，返回1010就说明登陆失效了）
router.get('/user/check_login',(req,res)=>{
  res.json({
    code:1010,
    message: '登录失效,请重新登录',
    data: null
  })
})

//获取账号
router.get('/user/info',async (req,res)=>{
  let value = req.query;
  //账号密码校验
  if(value.token){
     //先判断账号是否存在 查询数据库
     let result = await Login.findOne({_id:value.token});
     if(result){
      res.json({
        code:0,
        message: '账号：'+result.username,
        data: result.username
      })
     }else{
      res.json({
        code:1010,
        message: '当前账号不存在',
        data: null
      })
     }
  }else{  //无token
    res.json({
      code:1010,
      message: '登录失效,请重新登录',
      data: null
    })
  }
})

//修改密码  model.updateOne({name: 'zhangsan'}, {age:0}).then((data)=>{console.log(data)}).catch()
router.post('/user/change_password',async (req,res)=>{
  let value = req.body;
  if(value.token){
     //先判断账号是否存在 查询数据库
     let result = await Login.findOne({_id:value.token});
     if(result){  
       //判断旧密码正不正确
       if(result.password==value.oldpassword){ //密码匹配
        Login.updateOne({_id:value.token}, {password:value.newpassword}).then(_=>{
          res.json({
            code:0,
            message:'密码修改成功',
            data:null
          })
        }).catch(_=>{
          res.json({
            code:-1,
            message:'密码修改失败',
            data:null
          })
        }) 
       }else{
        res.json({
          code:-4,
          message:'老密码错误',
          data:null
       })
       }
     }else{ //账号不存在
        res.json({
            code:-2,
            message:'账号不存在',
            data:null
        })
     }
  }else{
    res.json({
        code:1010,
        message:'登陆失效',
        data:null
    })
  }
})

//账号密码查询接口
router.get('/user/list',async (req,res)=>{
  Login.find({}).then(
    response =>{
      res.json({
        code:0,
        message:'',
        data:response
     })
    }
  ).catch(_=>{
    res.json({
      code:-1,
      message:'',
   })
  })
})

router.post('/user/router_menu',async (req,res)=>{
  let value = req.body;
  if(value.token){
    let result = await Login.findOne({_id:value.token});
    if(result){
      let type = result.username
      let list = [
        {
          path: '/router1',
          component: 'Layout',
          name: 'router1',
          meta: {
            title: 'admin权限路由',
            icon: 'smile',
            roles: ['admin']
          },
          children: [
            {
              path: 'index',
              hidden: false,
              // component: () => import('@/views/routers/a.vue'),   调用格式前端自己拼接
              component:'routers/a',
              name: 'router1_index',
              meta: { title: 'admin测试路由1'},
            },
          ]
        },
        {
          path: '/router2',
          component: 'Layout',
          name: 'router2',
          meta: {
            title: 'user权限路由',
            icon: 'smile',
            roles: ['user']
          },
          children: [
            {
              path: 'index',
              hidden: false,
              component:'routers/b',
              name: 'router2_index',
              meta: { title: 'user测试路由1'},
            },
          ]
        },
      ];
      let newList = [];
       //只是简单的过滤第一层
          newList = list.filter((item)=>{
            if(item.meta){
              if(item.meta.roles){
                return item.meta.roles.includes(type)
              }
            }
            return item  
        })
        res.json({
          code:0,
          message:'动态路由信息',
          data:[...newList]
      })
    }else{
      res.json({
        code:-2,
        message:'token不匹配',
        data:[]
      })
    }
  }else{
    res.json({
      code:-1,
      message:'未传token',
      data:[]
    })
  }
})







module.exports = router;