var fs = require('fs')
var JaySchema = require('jayschema');
var js = new JaySchema();
var schema = require('./schema/app.json');

// synchronous…

getFiles('tpls').forEach(function (file) {
	var instance = require('./tpls/'+ file);
	console.log(file + ' result:', js.validate(instance, schema));
})

function getFiles(dir,files_){
    files_ = files_ || [];
    if (typeof files_ === 'undefined') files_=[];
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name,files_);
        } else {
            /\.json$/.test(name) && files_.push(files[i]);
        }
    }
    return files_;
}