#!/usr/bin/env bash

set -uex

scripts/select-firebase-env.sh
scripts/create-env.sh

npm install -g apollo && cd android && ./gradlew owldroid:updateSchema && ./gradlew licenseReleaseReport || true
