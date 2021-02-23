#!/bin/bash

rm -rf  ./app ./pages ./models ./components ./utils ./config 

cp -rf  ./src/app ./src/pages ./src/models ./src/components ./src/utils ./src/config .
cp -f ./src/index.html .
