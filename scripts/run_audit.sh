#!/bin/bash
set -x

# Run app to be audited (using CRA for test)
npx create-react-app packages/test-web-app
cd test-web-app && npm install && npm run build
npx serve -s build &

# Run Lighthouse
docker run --rm -d -p 3000:3000/tcp felicegeracitano/webperf-dashboard-lighthouse:1.1.1

# -- PARAMS --
## GitHub
OWNER=$(echo "${TRAVIS_PULL_REQUEST_SLUG//\// }" | awk '{print $1}')
REPO=$(echo "${TRAVIS_PULL_REQUEST_SLUG//\// }" | awk '{print $2}')
NUMBER=$TRAVIS_PULL_REQUEST
## Lighthouse IP
DOCKER_IP=$(ifconfig docker0 | grep 'inet addr:' | awk '{print $2}' | sed 's/addr:*//')
LIGHTHOUSE_URL="http://$DOCKER_IP:3000/hook"
## App IP
URL=$(ifconfig eth0 | grep 'inet addr:' | awk '{print $2}' | sed 's/addr:*//')
DATA="{\"url\":\"http://$URL:5000\",\"owner\":\"$OWNER\",\"repo\":\"$REPO\",\"number\":\"$NUMBER\",\"token\":\"$GITHUB_TOKEN\"}"

echo "Waiting Lighthouse to be ready on port 3000..."
while ! nc -z $DOCKER_IP 3000; do   
  sleep 0.1
done

# Audit app & Post Comment
curl -v -d $DATA -H 'Content-Type: application/json' $LIGHTHOUSE_URL