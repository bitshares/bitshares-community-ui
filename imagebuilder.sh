#!/usr/bin/env bash
rm -rf dist && mkdir dist
docker run --rm -v $PWD/dist:/usr/src/app/dist testtrusty