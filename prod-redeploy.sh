set -ex
./prod-unzipfile.sh
docker-compose -f docker-compose-prod.yml up