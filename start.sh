#!/bin/bash

DOCKER_PATH=$(which docker)
CURRENT_UID=$(id -u):$(id -g)
docker-compose up