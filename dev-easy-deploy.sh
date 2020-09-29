set -ex
./build.sh
./dev-copy-build-to-app-folder.sh
./dev-tarbal-copy-build-to-remote.sh 