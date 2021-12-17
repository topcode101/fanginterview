# We need to add a script to auto process posts
# And use a static site genenrator to create a website..

# build client
cd fanginterview-ui
rm -rf node_modules
yarn install
yarn build
cd ..

# build server
cd server
rm -rf node_modules
npm i
npm run build
cd ..