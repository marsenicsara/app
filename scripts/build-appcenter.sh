#!/usr/bin/env bash

set -uex

scripts/select-firebase-env.sh
scripts/create-env.sh

npm install -g apollo || true
./android/gradlew owldroid:updateSchema  || true
./android/gradlew licenseReleaseReport || true
