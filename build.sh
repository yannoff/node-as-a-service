#!/bin/bash

image=yannoff/node-api

build_and_push(){
    local version=$1 tag=$2
    [ -z ${tag} ] && tag=${version}
    docker pull node:${version}-alpine
    docker build -t ${image}:${tag} --build-arg VERSION=${version} docker/ && \
    docker push ${image}:${tag} && \
    docker rmi ${image}:${tag} node:${version}-alpine
    printf "Building image \033[01m%s:%s\033[00m ...\033[01;32mOK\033[00m\n" "${image}" "$tag"
}

if [ $# -eq 0 ]
then
    # If no version specified, build and push all versions
    set -- 10 11 12 13 14 15 16
fi

for v in "$@"
do
    printf "\033[01mBuilding image %s version %s...\033[00m\n" "${image}" "${v}"
    build_and_push ${v}
done
