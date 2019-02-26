> refer to https://github.com/FeliceGeracitano/webperf-dashboard/tree/1.0.1 for the docker-compose deployment versions, I'm upgrading to use kubernetes and Web Page Test

# WebPerformanceDashboard

- [Introduction](#Introduction)
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Run The project](#Run-The-project)
- [Configuration](#Configuration)
- [Dashboards Built-in](#Dashboards-Built-in)
- [Develop `packages/lighthouse`](#develop-packageslighthouse)
- [Develop `packages/inspector-wpt`] TODO
- [Test local container for `packages/lighthouse`](#test-local-container-for-packageslighthouse)
- [Deploy your container](#Deploy-your-container)
- [GitHub BOT](#GitHub-BOT)
- [Troubleshooting](#Troubleshooting)
- [Other Tips](#Other-Tips)

### Introduction

Web performance dashboard powered by Lighthouse, forked from [https://github.com/boyney123/garie](https://github.com/boyney123/garie)
with addition of

- Typescript
- Monorepo approach
- GitHub BOT
- Removed Pagespeed Insights (now powered by lighthouse)
- Latest lighthouse
- Grafana dashboards with more details
- more to come.. (Performance delta on target Branch, more metrics, parallel page analysis)

### Requirements

- docker >= 18 and Node >= 8

### Installation

```bash
git clone https://github.com/FeliceGeracitano/webperf-dashboard.git
```

### Run the project

> TODO: document kubernetes approach

### Configuration

> TODO: document kubernetes cron job

### Dashboards Built-in

- Single Audit
  ![Image of Single Page Dashboard](https://raw.githubusercontent.com/FeliceGeracitano/webperf-dashboard/master/static/Single.png)

Inspired by the lighthouse report, analyze score trend over time, identify performance metric and their thresholds. Read suggestions directly from Latest Lighthouse report embedded in the dashboard

- Versus
  ![Image of Versus Dashboard](https://raw.githubusercontent.com/FeliceGeracitano/webperf-dashboard/master/static/Versus.png)

Pretty much a like Single Page Dashboard but oriented to `1vs1` or `all` comparision.

> TODO: document WPT Dashboard

### Develop `packages/lighthouse`

Comment out `felicegeracitano/webperf-dashboard-lighthouse` service in `docker-compose.yml`, then run to spin up dependecies:

```bash
$ docker-compose -f "docker-compose.yml" up -d --build
$ cd packages/lighthouse && npm start
```

### Test local container for `packages/lighthouse`

> TODO: document kuberentes

### Deploy your container

```
$ cd packages/lighthouse
$ docker tag webperf-dashboard-lighthouse:latest felicegeracitano/webperf-dashboard-lighthouse:latest
$ docker push felicegeracitano/webperf-dashboard-lighthouse:latest
```

> Tip:  
> replace latest tag with fixed version etc 1.1, 2.0...

### Troubleshooting

- Kills all running containers with `docker kill $(docker ps -q)`
- Delete all stopped containers with `docker rm $(docker ps -a -q)`
- Delete all images with `docker rmi $(docker images -q)`

### GitHub BOT

> revisit this

### Other Tips

if you use VSCODE install docker & kubernetes extensions:

- https://marketplace.visualstudio.com/items?itemName=peterjausovec.vscode-docker
- https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools
