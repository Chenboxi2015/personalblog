var express=require('express');
var articleModel=require('../mongodb/db').articleModel;
var auth=require('../middleware/auth');
var multer=require('multer');
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
var upload=multer({storage:storage});

var router=express.Router();
//增加文章
router.get('/add',auth.checkLogin,upload.single('poster'),function (req,res,next) {
   res.render('article/add',{title:'发表文章标题',content:'发表文章内容'});
});
router.post('/add',function (req,res,next) {
    var article=req.body;

    if(req.file){
       article.poster='/uploads/'+req.file.filename;
    }
    article.username=req.session.user._id;
    articleModel.create(article,function (err,doc) {
        if(!err){
            console.log(doc);
            req.flash('success','添加文章成功');
            res.redirect('/');
        }else{
            req.flash('error','添加文章失败');
            req.redirect('back');
        }
    })

});
module.exports=router;