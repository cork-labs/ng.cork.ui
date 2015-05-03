#!/bin/bash

# build tasks
export HOME="/tmp" && npm install && bower --allow-root update && grunt build && grunt docs
