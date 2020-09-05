#!/usr/bin/env bash

set -e

node test.mjs 30 100
node test.mjs 60 200
node test.mjs 900 10000
node test.mjs 1 120
