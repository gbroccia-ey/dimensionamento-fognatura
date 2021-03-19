#!/bin/bash

rm -rf  ./app ./pages ./models ./components ./utils ./config 

cp -rf  ./src/app ./src/pages ./src/assets ./src/models ./src/components ./src/utils ./src/config .
cp -rf  ./src/assets ./www
cp -f ./src/index.html .
