#!/bin/bash
# dump meta file

# dumper
echo "dumper start"

nodejs /home/min/Projects/xmartin/spider/metadumper.js

echo "dumper done"

# extractor
echo "invalid extraction start"

casperjs /home/min/Projects/xmartin/spider/invalidmetaextractor.js

echo "invalid extraction done"


#shrinker
echo "shrinker start"

nodejs /home/min/Projects/xmartin/spider/videoshrinker.js

echo "shrinker done"