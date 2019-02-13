#!/bin/bash
set -x
docker pull webpagetest/agent
docker pull webpagetest/server
cd "$(dirname "$0")"/../packages/local-wptagent
docker build -t local-wptagent .
cd ../local-wptserver
docker build -t local-wptserver .
cd ../../deployment/gcp
kubectl create ns webperf
pwd
kubectl apply -f influxdb.yaml
kubectl apply -f chronograf.yaml
kubectl apply -f grafana.yaml
kubectl apply -f lighthouse.yaml
# kubectl apply -f cronjob.yaml
kubectl apply -f wpt-server.yaml
kubectl apply -f wpt-agent.yaml