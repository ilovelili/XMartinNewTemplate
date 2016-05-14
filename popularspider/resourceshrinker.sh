#!/bin/sh
# dump meta file

# dumper
echo "   shrinker: dumper starts"
nodejs ./metadumper.js
echo "   shrinker: dumper ends"

# extractor
echo "   extractor: invalid extraction starts"
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./weeklyinvalidmetaextractor.js
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./monthlyinvalidmetaextractor.js
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./fulltimeinvalidmetaextractor.js
echo "   extractor: invalid extraction ends"

#shrinker
echo "   extractor shrinker starts"
nodejs ./weeklyvideoshrinker.js
nodejs ./monthlyvideoshrinker.js
nodejs ./fulltimevideoshrinker.js
echo "   extractor shrinker ends"