#!/bin/bash
set -x
cd "$(dirname "$0")"/../deployment/local
kubectl create ns webperf
kubectl apply -f influxdb.yaml
kubectl apply -f chronograf.yaml
kubectl apply -f grafana.yaml
kubectl apply -f lighthouse.yaml
# kubectl apply -f cronjob.yaml
kubectl apply -f wpt-server.yaml
kubectl apply -f wpt-agent.yaml