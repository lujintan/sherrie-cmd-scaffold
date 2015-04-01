var filefactory = require('filefactory');
var rl = require('readline');
var path = require('path');
var fs = require('fs');
var Q = require('q');

module.exports = function(PluginAPI){
    PluginAPI.register('install', 'install project files', [], function(){
        var r = rl.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //transfer the question funtion to a promised function
        var _question = function(text){
            var deferred = Q.defer();
            r.question(text, function(answer) {
                deferred.resolve(answer);
            });
            return deferred.promise;
        };
        var projectName;
        var author;
        var fid;
        var sampleRate;
        var _askProjectName = function(pn){
            projectName = pn;
            if (fs.existsSync(projectName)) {
                console.log(projectName + ' is exist!');
                return _question('project name: ').then(_askProjectName);
            } else {
                console.log("Project name OK!");
                return _question(
                    'Access http://solar.baidu.com/autopack to register a FID for using auto pack function ' +
                    'or press Enter key with nothing input. \nFID: ');
            }
        };

        _question('project name: ').then(_askProjectName).then(function(f){
            console.log("FID OK!");
            fid = f;
            if (fid) {
                return _question('sampleRate: ').then(function(sr){
                    console.log('SampleRate OK!');
                    sampleRate = sr || 1;
                    return _question('author: ');
                });
            } else {
                return _question('author: ');
            }
        }).then(function(a){
            r.close();
            console.log("Author OK!");

            author = a;
            //generate the base code
            filefactory.run({
                sample: path.join(__dirname, 'project_sample'),
                dest: projectName,
                filter: '(fis-conf\\.js|layout\\.tpl)$',
                data: {
                    projectName: projectName,
                    author: author,
                    fid: fid,
                    sampleRate: 1
                }
            });

            console.log('Project ' + pn + ' has been created!');
            console.log('Usage: she --help');
        });
    });

    //register the create command
    PluginAPI.register('create', 'create a module', [], function(){
        var r = rl.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //transfer the question funtion to a promised function
        var _question = function(text){
            var deferred = Q.defer();
            r.question(text, function(answer) {
                deferred.resolve(answer);
            });
            return deferred.promise;
        };

        var moduleName;
        var version;
        var desc;
        var author;
        var fid;
        var sampleRate;
        var _askModuleName = function(m){
            moduleName = m;
            if (fs.existsSync(moduleName)) {
                console.log(moduleName + ' is exist!');
                return _question('module name: ').then(_askModuleName);
            } else {
                console.log("Module name OK!");
                return _question('version: ');
            }
        };
        //start the command line guide
        _question('module name: ').then(_askModuleName).then(function(v){
            version = v;
            console.log("Version OK!");
            return _question('description: ');
        }).then(function(d){
            desc = d;
            console.log("Description OK!");
            return _question('Access http://solar.baidu.com/autopack to register a FID for using auto pack function ' +
                    'or press Enter key with nothing input. \nFID: ');
        }).then(function(f){
            fid = f;
            console.log("FID OK!");
            if (fid) {
                return _question('sampleRate: ').then(function(sr){
                    console.log('SampleRate OK!');
                    sampleRate = sr || 1;
                    return _question('author: ');
                });
            } else {
                return _question('author: ');
            }
        }).then(function(a){
            r.close();
            author = a;
            console.log('Author OK!');

            console.log('File generating... ');

            //generate the module base code
            filefactory.run({
                sample: path.join(__dirname, 'module_sample'),
                dest: moduleName,
                filter: '(fis-conf\\.js|layout\\.tpl)$',
                data: {
                    moduleName: moduleName,
                    version: version,
                    desc: desc,
                    author: author,
                    fid: fid,
                    sampleRate: sampleRate
                }
            });

            console.log('Module ' + moduleName + ' has been created!');
        });
    });
};