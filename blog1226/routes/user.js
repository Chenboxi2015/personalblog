var express = require('express');
var router = express.Router();
var md5=require('../md5/md5');
var userModel=require('../mongodb/db').userModel;
var auth=require('../middleware/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//用户注册页面
router.get('/reg',auth.checkNotLogin,function (req,res,next) {
    res.render('user/reg',{title:'用户注册页',content:'用户注册内容'});
});
//用户注册页面表单提交
router.post('/reg',auth.checkNotLogin,function (req,res,next) {
    var user=req.body;
    user.password=md5(user.password);
    user.avatar='http://secure.gravatar.com/avatar/'+user.email+'?s=48';
    userModel.findOne(user,function (err,doc) {
        if(!err){
            if(doc){//用户已注册
                //设置flash的属性值
                req.flash('error','该用户已注册过，请重新输入');
                //console.log('该用户已注册过，请重新输入');
                res.redirect('back');
            }else{//用户未注册
                userModel.create(user,function (err,doc) {
                    if(!err){
                        req.flash('success','用户注册成功');
                        //console.log(doc);
                        res.redirect('/user/login');
                    }else{
                        req.flash('error','用户注册失败，请重新填写');
                        //console.log(err);
                        res.redirect('back');
                    }
                })
            }
        }else{
            req.flash('error','用户注册失败，请重新输入');
            //console.log(err);
            res.redirect('back');
        }
    })

});
//用户登录页面
router.get('/login',auth.checkNotLogin,function (req,res,next) {
    res.render('user/login',{title:'用户登录页',content:'用户登陆内容'});
});
//用户登录页面表单提交
router.post('/login',auth.checkNotLogin,function (req,res,next) {
    var user=req.body;
    user.password=md5(user.password);
    userModel.findOne(user,function (err,doc) {
        if(!err){//查找成功
            if(doc){//找到对应用户
               req.flash('success','用户登录成功');
               //console.log('登录成功');
                //登录成功后将用户信息存入session中
               req.session.user=doc;
               // console.log(req.session);
               res.redirect('/');
            }else{//不存在对应用户
                req.flash('error','该用户不存在请去注册');
                //console.log('此用户不存在，请注册');
                res.redirect('/user/reg');
            }
        }else{//查找失败
            req.flash('error','用户登录失败，请重新登录');
            res.render('back');
            //console.log(err);
        }
    });

});
router.get('/logout',auth.checkLogin,function (req,res,next) {
    req.flash('success','用户退出成功');
    //用户退出时将session置空
    req.session.user=null;
    res.redirect('/');
});

module.exports = router;
