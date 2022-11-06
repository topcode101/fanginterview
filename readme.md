# Quick start for developer
1. First time run to install nvm
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`

```
nvm install 14.18.1
nvm alias default 14.18.1
```

Open a new terminal and run `node -v`, if cannot find the node, please manually add the below lines to the end of `~/.profile`:
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```


2. Make sure docker has been installed

3. Run docker containsers.  
We need to run local database container.
Open a new terminal and run the command below. Do not close the terminal. 

```
docker-compose -f docker-compose-dev.yml up
```

4. Start the server side process  
Open a new termial and run the commands below:
```
cd server
npm install
npm run build
npm start
```
If run successfully, should see:
```
Http Server is listing on port 10010 ...
```

5. Start the frondend process
First time run should install yarn:
```
npm install --global yarn 
```


Open a new terminal and run the commands

```
cd fanginterview-ui
yarn
yarn dev
```
Go to `http://localhost:3000`, should see the homepage of the website





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
