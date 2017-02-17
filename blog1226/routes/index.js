var express = require('express');
var articleModel=require('../mongodb/db').articleModel;
var router = express.Router();
var markdown=require('markdown').markdown;
//markdown.toHTML()转化为支持markdown语法的代码
/* GET home page. */
//获取所有文章
router.get('/', function(req, res, next) {
    var keyword=req.query.keyword;//获取请求参数
    var queryObj={};//查找条件
    if(keyword){//提交了搜索请求
        req.session.keyword=keyword;//将keyword存到session中
        var reg=new RegExp(keyword,'i');
        queryObj={$or:[{title:reg},{content:reg}]};//查找条件为标题或文章中包括reg中的内容的
    }
    var pageNum=parseInt(req.query.pageNum)||1;//页码数
    var pageSize=parseInt(req.query.pageSize)||6;//每页文章数量
  // articleModel.find({},function (err,articles) {
  //    if(!err){
  //       req.flash('success','获取文章成功');
  //       res.render('index',{title:'首页',articles:articles});
  //       console.log(articles);
  //    } else{
  //        req.flash('error','获取文章失败');
  //        res.redirect('back');
  //    }
  // });
  articleModel.find(queryObj)
      .populate('username')
      .skip((pageNum-1)*pageSize)
      .limit(pageSize)
      .exec(function (err,articles) {
    if(!err){
        //console.log(articles);
        //将文章内容转化为支持markdown语法
        articles.forEach(function (article,index) {
            article.content=markdown.toHTML(article.content);
        });
        articleModel.count(queryObj,function (err,count) {
            if(!err){
                req.flash('success','获取所有文章成功');
                res.render('index', {
                    title: '首页',
                    articles:articles,
                    keyword:keyword,
                    pageNum:pageNum,
                    pageSize:pageSize,
                    totalPage:Math.ceil(count/pageSize)
                });
            }else{
                req.flash('error','获取所有文章失败');
                res.render('back');
            }
        });

    } else {
        req.flash('error','获取所有文章失败');
        res.render('back');
    }
  })

});

module.exports = router;
