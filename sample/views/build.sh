#!/bin/bash

#build environment

which fis || npm install -g fis
which fis-plus || npm install -g fis-plus
npm -g ls | grep fis-parser-sass || npm install -g fis-parser-sass
which fsmonitor || npm install -g fsmonitor

#to stop the process background
kill -9 `ps -ef | grep -v grep | grep 'fsmonitor' | grep +app | awk '{print $2}'`
kill -9 `ps -ef | grep -v grep | grep 'fsmonitor' | grep +common | awk '{print $2}'`
kill -9 `ps -ef | grep -v grep | grep 'fis' | grep app | awk '{print $2}'`
kill -9 `ps -ef | grep -v grep | grep 'fis' | grep common | awk '{print $2}'`

if [ $# == 0 ] || [ $1 != "stop" ] 
then
	sh file-watch.sh &
	sh fis-start.sh 
else
	echo "shut down all process"
fi