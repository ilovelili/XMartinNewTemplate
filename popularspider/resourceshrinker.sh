#!/bin/sh
# dump meta file

# dumper
echo "   shrinker: dumper starts"
nodejs ./metadumper.js
echo "   shrinker: dumper ends"

# extractor
echo "   extractor: invalid extraction starts"
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs --web-security=no --ssl-protocol=any --ignore-ssl-errors=yes ./weeklyinvalidmetaextractor.js
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs --web-security=no --ssl-protocol=any --ignore-ssl-errors=yes ./monthlyinvalidmetaextractor.js
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs --web-security=no --ssl-protocol=any --ignore-ssl-errors=yes ./fulltimeinvalidmetaextractor.js
echo "   extractor: invalid extraction ends"

#shrinker
echo "   extractor shrinker starts"
nodejs ./weeklyvideoshrinker.js
nodejs ./monthlyvideoshrinker.js
nodejs ./fulltimevideoshrinker.js
echo "   extractor shrinker ends"