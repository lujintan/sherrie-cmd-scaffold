var filefactory = require('filefactory');
var rl = require('readline');
var path = require('path');
var Q = require('q');

module.exports = function(PluginAPI){
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

        //start the command line guide
        _question('module name: ').then(function(m) {
            moduleName = m;
            console.log("Module name OK!");
            return _question('version: ');
        }).then(function(v){
            version = v;
            console.log("Version OK!");
            return _question('description: ');
        }).then(function(d){
            desc = d;
            console.log("Description OK!");

            console.log('File generating... ');

            //generate the base code
            filefactory.run({
                sample: path.join(__dirname, 'sample'),
                dest: moduleName,
                filter: '(fis-conf\\.js|coffee|ts|css|less|sass|stylus|tpl|html|dust|ejs|jade|json|markdown|md)$',
                data: {
                    moduleName: moduleName,
                    version: version,
                    desc: desc
                }
            });

            console.log('Module ' + moduleName + ' has been created!');
            
            r.close();
        });
    });
};