var express = require('express');
var path = require('path');
var session=require('express-session');
var mongoStore=require('connect-mongo')(session);
var flash=require('connect-flash');//警告框提示，依赖session
//处理ICO图片  网站的图标
var favicon = require('serve-favicon');
//输出日志
var logger = require('morgan');
//处理cookie req.cookies res.cookie
var cookieParser = require('cookie-parser');
//获取post请求体信息  req.body
var bodyParser = require('body-parser');


var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//模板引擎文件类型
app.set('view engine', 'html');
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//使用日志模块
app.use(logger('dev'));
//使用body-parser模块  请求体是json类型{}
app.use(bodyParser.json());
//处理表单请求 用不用querystring模块
app.use(bodyParser.urlencoded({ extended: false }));
//使用cookie-parser模块
app.use(cookieParser());
//静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'chenboxi',
  resave:true,
  saveUninitialized: true,
  //将session存储到数据库中
  store:new mongoStore({
    url:require('./dbURL').dbURL
  })
}));
app.use(flash());

//将公共信息存入中间件中
app.use(function (req,res,next) {
  //将session中的信息渲染到模板引擎文件中
    res.locals.user=req.session.user;
    //获取页面提示信息
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    //保存搜索的关键字
    res.locals.keyword=req.session.keyword;
    next();
});
//路由容器
app.use('/', index);
app.use('/user', user);
app.use('/article',article);

//上面路由不匹配执行下面的中间件
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//错误处理中间件
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //可以给模板引擎文件传递数据 render
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
