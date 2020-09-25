rm -rf ./app
mkdir app
cd app
mkdir -p client/dist
cd ..

## copy server
cp -R server/dist app/server
cp server/package.json app/server/.
cd app/server && npm install --only=prod
cd ../..

## copy client
cp -R client/public app/client
mv app/client/public app/client/dist