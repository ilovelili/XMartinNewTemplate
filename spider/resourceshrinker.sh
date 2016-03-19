#!/bin/bash
# dump meta file

# dumper
echo "   shrinker: dumper starts"
nodejs /home/min/Projects/xmartin/spider/metadumper.js
echo "   shrinker: dumper ends"

# extractor
echo "   extractor: invalid extraction starts"
casperjs /home/min/Projects/xmartin/spider/invalidmetaextractor.js
echo "   extractor: invalid extraction ends"

#shrinker
echo "   extractor shrinker starts"
nodejs /home/min/Projects/xmartin/spider/videoshrinker.js
echo "   extractor shrinker ends"