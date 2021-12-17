rm -rf ./app
mkdir app
cd app
mkdir -p server/dist
cd ..

## copy server
cp -R server/dist app/server
cp server/package.json app/server/.
cd app/server && npm install --only=prod
cd ../..

## copy client
mkdir -p app/client
cp -R fanginterview-ui/.next app/client/.next

# todo: cannot copy node_modules because the macos m1 env is not compatible with 
# remote
# cp -R fanginterview-ui/node_modules app/client/node_modules 

cp fanginterview-ui/package.json app/client/package.json

## copy scripts
cp app_scripts/* app/.