var crypto=require('crypto');
console.log(crypto.getHashes());

//[ 'DSA',
// 'DSA-SHA',
//     'DSA-SHA1',
//     'DSA-SHA1-old',
//     'RSA-MD4',
//     'RSA-MD5',
//     'RSA-MDC2',
//     'RSA-RIPEMD160',
//     'RSA-SHA',
//     'RSA-SHA1',
//     'RSA-SHA1-2',
//     'RSA-SHA224',
//     'RSA-SHA256',
//     'RSA-SHA384',
//     'RSA-SHA512',
//     'dsaEncryption',
//     'dsaWithSHA',
//     'dsaWithSHA1',
//     'dss1',
//     'ecdsa-with-SHA1',
//     'md4',
//     'md4WithRSAEncryption',
//     'md5',
//     'md5WithRSAEncryption',
//     'mdc2',
//     'mdc2WithRSA',
//     'ripemd',
//     'ripemd160',
//     'ripemd160WithRSA',
//     'rmd160',
//     'sha',
//     'sha1',
//     'sha1WithRSAEncryption',
//     'sha224',
//     'sha224WithRSAEncryption',
//     'sha256',
//     'sha256WithRSAEncryption',
//     'sha384',
//     'sha384WithRSAEncryption',
//     'sha512',
//     'sha512WithRSAEncryption',
//     'shaWithRSAEncryption',
//     'ssl2-md5',
//     'ssl3-md5',
//     'ssl3-sha1',
//     'whirlpool' ]

var md5=crypto.createHash('md5');
//向md5加密输入数据(字符串)
md5.update('12345');
console.log(md5.digest('hex'));

//var crypto=require('crypto');
//var md5=crypto.createHash('md5');
//md5.update('123456');
//var result=md5.digest('hex');

//connect-mongo

//connect-flash  npm install flash --save  警告框
//设置：req.flash(属性名,属性值)
//获取：req.flash()

//gravatar全球通用头像
///avatar/49845956@qq.com?s=48  像素  一个邮箱唯一定位一个头像

//










