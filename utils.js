var path = require('path');
var fs = require('fs');
var ejs = require('ejs');

/**
 * 读取 sample/widget 目录下的文件内容，创建并复制到指定目录
 * @param widgetName
 */
exports.createWidget = function(widgetName){
    var widgetDir = 'widget';
    var destDir = path.join(widgetDir, widgetName);

    // check if 'widget' dir is exist
    if(!fs.existsSync(widgetDir)){
        console.log('没找到' + widgetDir + '目录，请在模块目录下执行该命令');
    }

    // find parent dir name for module prefix name
    var cwds = process.cwd().split(path.sep);
    var modName = cwds[cwds.length - 1];

    if(!modName){
        console.log('无法判断模块名，请确认是在模块目录(如app/common等)下执行的该命令');
    }

    // create destDir
    if(fs.existsSync(destDir)){
        //    console.log('同名 widget 已经存在');
    }else{
        fs.mkdirSync(destDir, 0755)
    }

    // copy file to destDir
    _copyWidgetFile(destDir, {widgetName: widgetName, moduleName: modName});


    console.log('widget create succeed:' + modName + '/' + destDir);
};

function _copyWidgetFile(dest, data){
    var jsContent = fs.readFileSync(path.resolve(__dirname,
        './sample/widget/widget_sample.js'), 'utf-8');

    var tplHtml = ejs.render(fs.readFileSync(path.resolve(__dirname,
        './sample/widget/widget_sample.tpl'), {encoding: 'utf8'}),
        data);

    fs.writeFileSync(path.resolve(dest, data.widgetName + '.js'), jsContent);
    fs.writeFileSync(path.resolve(dest, data.widgetName + '.css'), '');
    fs.writeFileSync(path.resolve(dest, data.widgetName + '.tpl'), tplHtml);
}

//var path = require('path');
//var ejs = require('ejs');
//var fs = require('fs');
//
///**
// * 遍历目录，执行回调方法
// * @param  {String}   src 目录地址
// * @param  {Function} cb  回调方法
// * @return {void}
// */
//var _readDir = function(src, cb){
//    var isPathExists = fs.existsSync(src);
//    if (isPathExists){
//        var realPath =fs.realpathSync(src);
//        var sta = fs.statSync(realPath);
//        if (sta.isFile()){
//            cb({
//                path: realPath,
//                type: 1
//            });
//        } else if (sta.isDirectory()){
//            cb({
//                path: realPath,
//                type: 0
//            });
//            var dirs = fs.readdirSync(src);
//            dirs.forEach(function(dirName, index){
//                _readDir(realPath + path.sep + dirName, cb);
//            });
//        }
//    }
//};
//
///**
// * 创建目录
// * @param  {String}   dirpath 目录路径
// * @param  {Number} mode  目录权限
// * @return {void}
// */
//var _mkdir = function(dirpath, mode){
//    if (!fs.existsSync(dirpath)) {
//        var pathtmp;
//        dirpath.split(path.sep).forEach(function(dirname) {
//            if (!dirname){
//                pathtmp = '/';
//            }
//            if (pathtmp) {
//                pathtmp = path.join(pathtmp, dirname);
//            }
//            else {
//                pathtmp = dirname;
//            }
//
//            if (!fs.existsSync(pathtmp)) {
//                if (!fs.mkdirSync(pathtmp, mode)) {
//                    return false;
//                }
//            }
//        });
//    }
//};
//
///**
// * 复制文件
// * @param  {String}   source 源文件
// * @param  {String}   target 复制到得文件
// * @param  {Function} cb     复制的回调
// * @return {void}
// */
//var _copyFile = function (source, target, cb) {
//    var cbCalled = false;
//
//    var rd = fs.createReadStream(source);
//    rd.on("error", done);
//
//    var wr = fs.createWriteStream(target);
//    wr.on("error", done);
//    wr.on("close", function(ex) {
//        done();
//    });
//    rd.pipe(wr);
//
//    function done(err) {
//        if (!cbCalled) {
//            cb(err);
//            cbCalled = true;
//        }
//    }
//};
//
//var _main = function(options){
//    var options = options || {};
//    var sample = options.sample;
//    var dest = options.dest || 'filefactory_dest';
//    var data = options.data || {};
//    var filter = options.filter || function(){return true;};
//
//    if (typeof filter === 'string'){
//        var reg = new RegExp(filter);
//        filter = function(path){
//            return reg.test(path);
//        };
//    }
//
//    if (options.delimiter){
//        ejs.delimiter = options.delimiter;
//    }
//
//    if (typeof sample === 'string' && fs.existsSync(sample)){
//        _readDir(sample, function(opt) {
//            var destPath = path.join(dest, path.relative(sample, opt.path));
//            if (opt.type === 1){
//                if (filter(opt.path)){  //如果命中filter设置，进行ejs编译
//                    var tplHtml = ejs.render(fs.readFileSync(opt.path, {
//                        encoding: 'utf8'
//                    }), data);
//                    fs.writeFileSync(destPath, tplHtml, {
//                        encoding: 'utf8'
//                    });
//                } else {  //如果不是文本类型，直接复制
//                    _copyFile(opt.path, destPath, function(err) {
//                        if (err){
//                            throw new Error('Error: copy file ' + opt.path + ' error');
//                        }
//                    });
//                }
//            } else if (opt.type === 0){
//                _mkdir(destPath);
//            }
//        });
//    } else {
//        throw new Error('Error: sample file is not exist');
//    }
//};