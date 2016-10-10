#!/bin/sh
# dump meta file

# dumper
echo "   shrinker: dumper starts"
nodejs ./metadumper.js
echo "   shrinker: dumper ends"

# extractor
echo "   extractor: invalid extraction starts"
# PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./invalidmetaextractor.js
./InvalidExtractor
echo "   extractor: invalid extraction ends"

#shrinker
echo "   extractor shrinker starts"
nodejs ./videoshrinker.js
echo "   extractor shrinker ends"