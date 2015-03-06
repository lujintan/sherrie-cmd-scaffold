#!/bin/bash

DIR=`dirname $0`
cd $DIR

rm ~/orp/data/smarty/compile/* -rf
rm -f ../app
ln -s $1 ../app
exit 0
