#!/bin/bash

set -e

if [ $# -lt 2 ]
  then
    echo "Usage: $0 name version" && exit
fi

# Build image
echo "Building $1/web:$2..."
docker build -t $1/web . # Build image and tag as latest
docker tag $1/web:latest $1/web:${1} # Tag image version

# Send image to deployment server
echo "Sending image to deployment server..."
docker save $1/web:$2 | pv -cN gzip -s 500m | gzip | pv -cN xfer | ssh $1 "gunzip | docker load"

# Tag as latest
ssh $1 "docker tag -f $1/web:$2 $1/web:latest"

# Bring up new image
echo "Launching new image..."
ssh $1 "sink $1_web && docker run --name $1_web -d -p 127.0.0.1:8081:80 $1/web:latest"
