#!/bin/bash
# dump meta file

# dumper
echo "   shrinker: dumper starts"
nodejs metadumper.js
echo "   shrinker: dumper ends"

# extractor
echo "   extractor: invalid extraction starts"
casperjs invalidmetaextractor.js
echo "   extractor: invalid extraction ends"

#shrinker
echo "   extractor shrinker starts"
nodejs videoshrinker.js
echo "   extractor shrinker ends"