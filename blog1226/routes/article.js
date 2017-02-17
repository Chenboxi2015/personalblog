var express=require('express');
var auth=require('../middleware/auth');
var articleModel=require('../mongodb/db').articleModel;
//文件上传
var multer=require('multer');
//设置图片上传的属性
var storage=multer.diskStorage({
    //上传的图片保存到哪个路径下
    destination:function (req,file,cb) {
        cb(null,'../public/uploads');
    },
    //设置上传后图片的名字
    filename:function (req,file,cb) {
        cb(null,file.originalname);
    }
});
//upload是一个中间件处理函数
var upload=multer({storage:storage});

var router=express.Router();
router.get('/add',auth.checkLogin,function (req,res,next) {
    res.render('article/add',{title:'文章添加页',content:'文章添加内容'});
});
//增加文章表单提交
router.post('/add',auth.checkLogin,upload.single('poster'),function (req,res,next) {
    var article=req.body;
    //保存图片上传的信息
    //console.log(req.file);
    if(req.file){//上传了图片
        article.poster='/uploads/'+req.file.filename;
    }
    article.username=req.session.user._id;
    articleModel.create(article,function (err,doc) {
        if(!err){
            req.flash('success','添加文章成功');
            res.redirect('/');
        }else{
            req.flash('error','添加文章失败');
            res.redirect('back');
        }
    })
});
//进入详情页
router.get('/detail/:_id',auth.checkLogin,function (req,res,next) {
    var _id=req.params._id;//获取文章_id
    var id=req.session.user._id;
    articleModel.findById(_id,function (err,doc) {
        if(!err){//找到文章

           if(id==doc.username){
               req.flash('success','获取文章详情成功');
               res.render('article/detail',{title:'文章详情页',article:doc});
           }else{
               req.flash('error','您不能修改别人的文章');
               res.redirect('back');
           }


        }else{//未找到文章
           req.flash('error','获取文章详情失败');
           res.redirect('back');
        }
    })
});
//进入文章修改页
router.get('/edit/:_id',auth.checkLogin,function (req,res,next) {
    var _id=req.params._id;
    articleModel.findById(_id,function (err,doc) {
        if(!err){//找到文章
            req.flash('success','获取文章内容成功');
            res.render('article/edit',{title:'文章修改页',article:doc});
        }else{//未找到文章
            req.flash('error','获取文章内容失败');
            res.redirect('back');
        }
    })
});
//更新文章post表单提交
router.post('/edit/:_id',auth.checkLogin,upload.single('poster'),function (req,res,next) {
    var article=req.body;
    var _id=req.params._id;

    if(req.file){//判断是否更新了图片
        article.poster='/uploads/'+req.file.filename;
    }
    articleModel.update({_id:_id},{$set:article},function (err,doc) {
        if(!err){//更新成功
            req.flash('success','更新文章成功');
            res.redirect('/');
        }else{
            req.flash('error','更新文章失败');
            res.redirect('back');
        }
    })

});
//删除文章
router.get('/delete/:_id',auth.checkLogin,function (req,res,next) {
   var _id=req.params._id;
   articleModel.remove({_id:_id},function (err,doc) {
       if(!err){//删除成功
           req.flash('success','删除文章成功');
           res.redirect('/');

       }else{
           req.flash('error','删除文章失败');
           res.redirect('back');
       }
   })
});
module.exports=router;