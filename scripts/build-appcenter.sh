#!/usr/bin/env bash

set -uex

scripts/select-firebase-env.sh
scripts/create-env.sh

cd android && ./gradlew app:updateSchema && ./gradlew licenseReleaseReport || true
