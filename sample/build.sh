#!/bin/bash
# ODP runtime build

APP_NAME="hotspot"
/bin/rm -rf output
mkdir -p output/app/$APP_NAME
mkdir -p output/conf/app/$APP_NAME
mkdir -p output/webroot/$APP_NAME
mkdir -p output/static

# fis complie
sh fis.sh
mv -f template/static/mobile output/static/
mv -f template_builder/static/builder output/static/

cp -r actions controllers library models Bootstrap.php plugins views modules template template_builder output/app/$APP_NAME
cp -r conf/*  output/conf/app/$APP_NAME
cp -r index.php  output/webroot/$APP_NAME

cd output
# avoid warning
#find ./ -name .svn -exec rm -rf {} \;
find ./ -name .svn | xargs rm -rf
# zip files
tar zcvf app_$APP_NAME.tar.gz app conf webroot > /dev/null
tar zcvf static-$APP_NAME.tar.gz static > /dev/null

# rm files
/bin/rm -rf app conf webroot
/bin/rm -rf static webroot

cd -

echo '###########################################'
echo 'runtime app build success!'
echo '###########################################'
