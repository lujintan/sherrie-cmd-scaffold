var arguments = process.argv.slice(2);
var name = arguments[0];
var map = {};
var data = require('./template'+(name ? ('_'+name) : '')+'/map.json');
for (var key in data.res) {
    var value = data.res[key];
    if (/\.js$/.test(key)) {
        var newKey = key.replace(/^.*?\/js\/(.*)\.js$/, '$1');
        var newValue = value.uri; //.replace(/^.*?\/js\/(.*)\.js$/, '$1');
        map[newKey] = newValue;
    }
}
console.log(JSON.stringify(map));