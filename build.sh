# We need to add a script to auto process posts
# And use a static site genenrator to create a website..

# build client
cd fanginterview-ui
yarn build
cd ..
# build server
cd server
npm run build
cd ..