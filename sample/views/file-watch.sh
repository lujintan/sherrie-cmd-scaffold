#!/bin/sh
mkdir output && mkdir output/config
if [ $# == 0 ] || [ $1 == "start" ] 
then
	RUNNING_PROCESS_WATCHER=`ps aux | grep fsmonitor | grep -v grep | wc -l`
	if [ $RUNNING_PROCESS_WATCHER -eq 0 ]
	then 
		fsmonitor -q '+app-map.json' cp output/app/config/app-map.json output/config/ &
		fsmonitor -q '+common-map.json' cp output/common/config/common-map.json output/config/ &
	fi
fi