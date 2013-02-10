#!/bin/bash

BASE_DIR=`dirname $0`

node --debug $BASE_DIR/../server/start.js $*
