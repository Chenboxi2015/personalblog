var mongoose=require('mongoose');
// mongoose.Promise=Promise;
mongoose.connect(require('../dbURL').dbURL);

var userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    avatar:String
});
var userModel=mongoose.model('user',userSchema);

var articleSchema=new mongoose.Schema({
    title:String,
    poster:String,
    content:String,
    createAt:{
        type:Date,
        default:Date.now()
    },
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});
var articleModel=mongoose.model('article',articleSchema);
module.exports.userModel=userModel;
module.exports.articleModel=articleModel;