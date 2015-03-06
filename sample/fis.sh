#!/bin/bash
dir=`dirname $0`
cd $dir
WD=`pwd`

output=$WD/template
/bin/rm -rf $output && mkdir -p $output/


FIS_OPT='Domp'
fis --version

# fis for builder
output=$WD/template_builder

fis release -$FIS_OPT -d $output -r modules/Builder/views
FIS_MAP_JSON=`node fis.js builder`
FIS_MAP_JSON="${FIS_MAP_JSON//\//\\/}"
sed -i "s/'FIS_MAP_JSON'/$FIS_MAP_JSON/" template_builder/tpls/manage.tpl

# fis for mobile
output=$WD/template
fis release -$FIS_OPT -d $output -r views
FIS_MAP_JSON=`node fis.js`
FIS_MAP_JSON="${FIS_MAP_JSON//\//\\/}"
sed -i "s/'FIS_MAP_JSON'/$FIS_MAP_JSON/" template/page/common/base.tpl


