const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require("cors");
const server = express()


//处理跨域
server.use(cors())    


//已弃用
server.use(bodyParser());

//server.use(require('body-parser').urlencoded({extended: true}))

//方法2
// server.use(bodyParser.urlencoded());
// server.use(bodyParser.json());



// 创建保存session的仓库
var store = new MongoDBStore({
  uri: 'mongodb://localhost/userInfo',
  collection: 'session'
});
 
// Catch errors
store.on('error', function(error) {
  console.log(error);
});
 

//处理静态资源
server.use('/static', express.static('./static'));




// 处理请求的session
server.use(require('express-session')({
    secret: 'hello world',
    name: 'SESSION_ID',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
   



server.use('/api/user', require('./routers/userRouter'));
server.use('/api/main', require('./routers/mainRouter'));
server.use('/api/menu', require('./routers/menuRouter'));
server.use('/', require('./routers/loginRouter'));  //处理以/开头的请求



// 连接数据库
mongoose.connect('mongodb://localhost/db',  (error)=>{
    if(error){
        console.log('连接数据库失败');
    }else{
        console.log('连接数据库成功');
        // 启动服务器
        server.listen(3000, (error)=>{
            if(error)
                console.log('启动失败');
            else
                console.log('启动成功');
        })
    }
})


 