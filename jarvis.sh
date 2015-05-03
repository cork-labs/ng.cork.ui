#!/bin/bash

# build tasks
npm install && bower --allow-root update && grunt build && grunt docs
