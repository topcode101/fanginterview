# fanginterview website

## Env
Node ver: 12.4.0

## How to build&start product
1. `./build.sh` or `clean-build.sh` is to build the server/client  
2. `./dev-copy-build-to-app-folder.sh` is to copy the dist folder into `app` and do npm install production in app.
3. `docker-compose -f docker-compose-prod.yml up` will start the product. 
check link: http://localhost:20093/

## (todo) copy the product to remote server
`dev-tarbal-copy-build-to-remote.sh`

## (todo) restart the product on remote server
1. ssh remote server
2. `prod-untarbal-dist.sh`
3. `docker-compose -f docker-compose-prod.yml up` will start the product. 


# post convention
filename: amazon_20200709.md  (the date should be Monday for each week)

content header:
```
---
layout: post
title: Lorem Ipsum
description: Lorem Ipsum is simply dummy text
summary: Lorem Ipsum is simply dummy text.
tags: [amazon]
---
```

# link
1point3acres latest:
https://www.1point3acres.com/bbs/forum.php?mod=forumdisplay&fid=145&filter=sortid&sortid=311&orderby=dateline