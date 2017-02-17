//检查用户登录
function checkLogin(req,res,next) {
   if(req.session.user){//用户登录
       next();
   } else{//用户未登录
       req.flash('error','当前操作只有用户登录才能进行，请先登录');
       res.redirect('/user/login');
   }
}

//检查用户未登录
function checkNotLogin(req,res,next) {
    if(req.session.user){//用户登录
        req.flash('error','当前操作只有用户未登录才能进行，请先退出');
        res.redirect('/');
    } else{//用户未登录
        next();
    }
}
module.exports={
    checkLogin:checkLogin,
    checkNotLogin:checkNotLogin
};