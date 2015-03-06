#!/usr/bin/env bash
#
# 配置切换脚本
# @author liukui
# @date 2014-11-05

ORP_PATH="/home/work/orp"

usage()
{
    echo "-h: show help information"
    echo "-r: use RD conf to replace. eg: sh env.sh -r {APP_NAME}"
    echo "-q: use QA conf to replace. eg: sh env.sh -q {APP_NAME}"
    echo "-o: use ONLINE conf to replace. eg: sh env.sh -o {APP_NAME}"
}

ralfs(){
    prevMachine="db-orp-app0035.db01.baidu.com"
    matrixpath="/home/matrix/containers/1.tc_lightapp-prev_496/"
    ralpath="/home/work/orp/conf/ral/services/"
    if [ ! -e "$ralpath/runtime_inner.conf" ]; then
        echo "download ral serivce file from orp prev"
        `wget -q ftp://$prevMachine:$matrixpath$ralpath/runtime_*.conf -P $ralpath > /dev/null`
    fi
}

function deploy() {
    cp -rf $conf_env/ral/* $ORP_PATH/conf/ral/services/
    cp -rf $conf_env/app/* $ORP_PATH/conf/app/hotspot/
}

while getopts r:q:o:h OPTSSTR
do
    case $OPTSSTR in
    r)  myApp=$OPTARG
        conf_env=rd
        deploy
        exit 0
        ;;
    q)  myApp=$OPTARG
        conf_env=qa
        deploy
        exit 0
        ;;
    o)  myApp=$OPTARG
        conf_env=online
        deploy
        exit 0
        ;;
    h)
        usage
        exit 0
        ;;
    \?)
        echo "not a valide option"
        usage
        exit 0
        ;;
    esac
done

echo "not a valid option"
usage
