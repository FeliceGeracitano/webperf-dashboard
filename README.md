# WebPerformanceDashboard

- [Motivations](#Motivations)
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Run The project](#Run-The-project)
- [Configuration](#Configuration)
- [Develop `packages/lighthouse`](#develop-`packages/lighthouse`)
- [Test local container for `packages/lighthouse`](#Test-local-container-for-`packages/lighthouse`)
- [Deploy your container](#Deploy-your-container)
- [Troubleshooting](#Troubleshooting)
- [Other Tips](#Other-Tips)

### Introduction

Web performance powered by Lighthouse, forked from by `https://github.com/boyney123/garie` with addition of

- Typescript
- Monorepo approach
- Removed Pagespeed Insights since now is powered by lighthouse
- Latest lighthouse
- Grafana dashboards with more details
- more to come.. (CI hook for Github PR)

### Requirements

- docker >= 18 and Node >= 8

### Installation

```bash
git clone https://github.com/FeliceGeracitano/webperf-dashboard.git
```

### Run the project

```bash
$ docker-compose -f "docker-compose.yml" up -d --build
```

open dashboard at `localhost`, user: `admin` pass: `secret`

> this will run 4 services `influxdb`, `chronograf`, `grafana` & `felicegeracitano/webperf-dashboard-lighthouse`

### Configuration

In the root of the application there is a `config.json` file, which is propagated to `packages/lighthouse` during docker build step.

example,

```js
{
  "cron": "0 */10 * * * *",
  "urls": [
    { "url": "https://reactjs.org", "options": { "report": true } },
    { "url": "https://vuejs.org", "options": { "report": true } },
    { "url": "https://angular.io", "options": { "report": true } }
  ]
}
```

> more info about the cron pattern at https://www.npmjs.com/package/cron

### Dashboards Built-in

![Image of Single Page Dashboard](https://via.placeholder.com/150)

Inspired by the lighthouse report, analyze score trend over time, identify performance metric and their thresholds. Read suggestions directly from Latest Lighthouse report embedded in the dashboard

![Image of Versus Dashboard](https://via.placeholder.com/150)

Pretty much a like Single Page Dashboard but oriented to `1vs1` or `all` comparision.

### Develop `packages/lighthouse`

Comment out `felicegeracitano/webperf-dashboard-lighthouse` service in `docker-compose.yml`, then run to spin up dependecies:

```bash
$ docker-compose -f "docker-compose.yml" up -d --build
$ cd packages/lighthouse && npm start
```

### Test local container for `packages/lighthouse`

In `docker-compose.yml` replace `felicegeracitano/webperf-dashboard-lighthouse` with
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
> replace latest tag with fixed version etc 1.1, 2.0...

### Troubleshooting

- Kills all running containers with `docker kill $(docker ps -q)`
- Delete all stopped containers with `docker rm $(docker ps -a -q)`
- Delete all images with `docker rmi $(docker images -q)`

### Other Tips

- if you use VSCODE install docker extensions to manage, start & stop containers: https://marketplace.visualstudio.com/items?itemName=peterjausovec.vscode-docker
