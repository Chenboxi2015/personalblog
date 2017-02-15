//用户登录
function checkLogin(req,res,next) {
    if(req.session.user){
        next();
    }else{
        req.flash('error','该操作需要用户在登录的情况下才能进行，请先去登录');
        res.redirect('user/login');
    }
}

//检查用户未登录
function checkNotLogin(req,res,next) {
    if(req.session.user){
        req.flash('error','该操作需要用户未登录的情况下才能进行，请退出');
        res.redirect('back');
    }else{
        next();
    }
}

module.exports={
    checkLogin:checkLogin,
    checkNotLogin:checkNotLogin
};