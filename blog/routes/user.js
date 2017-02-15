var express = require('express');
var userModel=require('../mongodb/db').userModel;
var router = express.Router();
var auth=require('../middleware/auth');
var md5=require('../md5/md5');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//用户注册
router.get('/reg',auth.checkNotLogin,function (req,res,next) {
    res.render('user/reg',{title:'用户注册标题',content:'用户注册内容'});
});
//用户注册表单提交
router.post('/reg',auth.checkNotLogin,function (req,res,next) {
   var user=req.body;
   user.password=md5(user.password);
   user.avatar='http://secure.gravatar.com/avatar/'+user.email+'?s=48';
   userModel.findOne(user,function (err,doc) {
       if(!err){
           if(doc){//已存在此用户
               req.flash('error','该用户已注册，请重新输入');
               res.redirect('back');
           }else{//不存在此用户
               userModel.create(user,function (err,doc) {
                   if(!err){
                       req.flash('success','用户注册成功');
                       res.redirect('/user/login');
                   }else {
                       req.flash('error','用户注册失败，请重新输入');
                       res.redirect('back');
                   }
               })
           }
       }else{
           req.flash('error','用户注册失败，请重新输入');
           res.redirect('back');
       }
   })
});
//用户登录
router.get('/login',auth.checkNotLogin,function (req,res,next) {
    res.render('user/login',{title:'用户登录标题',content:'用户登录内容'});
});
//用户登录表单提交
router.post('/login',function (req,res,next) {
   var user=req.body;
   user.password=md5(user.password);
   userModel.findOne(user,function(err,doc) {
       if(!err){
          if(doc){//找到用户
              req.session.user=doc;
              req.flash('success','用户登录成功');
              res.redirect('/');
          } else{//未找到用户
              req.flash('error','该用户不存在，请先去注册');
              res.redirect('/user/reg');
          }
       }else{
          req.flash('error','用户登录失败,请重新登录');
          res.redirect('back');
       }
   })
});
//用户退出
router.get('/logout',auth.checkLogin,function (req,res,next) {
    req.flash('success','用户退出成功');
    req.session.user=null;
    res.redirect('/');
});
module.exports = router;
