var express = require('express');
var articleModel=require('../mongodb/db').articleModel;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  articleModel.find({}).populate('username').exec(function (err,articles) {
      if(!err){
        req.flash('success','获取全部文章成功');
        res.render('index', { title: '首页标题',articles:articles});
      }else{
        req.flash('error','获取全部文章失败');
        res.redirect('back');
      }
  });

});

module.exports = router;
