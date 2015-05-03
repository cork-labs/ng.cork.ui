#!/bin/bash

# build tasks
npm install && bower update && grunt build && grunt docs
