#!/bin/sh
RUNNING_PROCESS_APP=`ps aux | grep ../output/app | grep -v grep | wc -l`
RUNNING_PROCESS_COMMON=`ps aux | grep ../output/common | grep -v grep | wc -l`
#fisp 监听common模块
if [ $RUNNING_PROCESS_COMMON -eq 0 ]
then 
	cd common
	fisp release -pwd ../output/common &
	cd ..
fi
#fisp 监听app模块
if [ $RUNNING_PROCESS_APP -eq 0 ]
then 
	cd app
	fisp release -pwd ../output/app &
	cd ..
fi