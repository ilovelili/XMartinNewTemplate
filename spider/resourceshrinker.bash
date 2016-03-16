#!/bin/bash
# dump meta file
nodejs /home/min/Projects/xmartin/spider/metadumper.js

# validate
casperjs /home/min/Projects/xmartin/spider/invalidmetaextractor.js

# update
nodejs /home/min/Projects/xmartin/spider/videoshrinker.js