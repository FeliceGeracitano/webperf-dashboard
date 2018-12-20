# WebPerformanceDashboard

### Run the project

```bash
$ docker-compose -f "docker-compose.yml" up -d --build
```

> this will run 4 services `influxdb`, `chronograf`, `grafana` & `felicegeracitano/webperf-dashboard-lighthouse`

### Develop `packages/lighthouse`

Comment out `felicegeracitano/webperf-dashboard-lighthouse` service in `docker-compose.yml`, then run to spin up dependecies:

```bash
$ docker-compose -f "docker-compose.yml" up -d --build
$ cd packages/lighthouse && npm start
```

### Test local container for `packages/lighthouse`

Repolace `felicegeracitano/webperf-dashboard-lighthouse` with
`webperf-dashboard-lighthouse` (or any other local name you prefer), then run:

```
$ cd packages/lighthouse && docker build -t webperf-dashboard-lighthouse .
$ cd ../.. && docker-compose up
```

### Deploy your container

```
$ cd packages/lighthouse
$ docker tag webperf-dashboard-lighthouse:latest felicegeracitano/webperf-dashboard-lighthouse:latest
$ docker push felicegeracitano/webperf-dashboard-lighthouse:latest
```

> Tip:  
> replace latest tag with fixed version etc 1.0, 2.0...

### Troubleshooting

- Kills all running containers with `docker kill $(docker ps -q)`
- Delete all stopped containers with `docker rm $(docker ps -a -q)`
- Delete all images with `docker rmi $(docker images -q)`

### Other Tips

- if you use VSCODE install docker extensions to manage, start & stop containers: https://marketplace.visualstudio.com/items?itemName=peterjausovec.vscode-docker
