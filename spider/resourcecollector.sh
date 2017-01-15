#!/bin/sh

# get resource
echo "   collector: scraping starts"
# casperjs --web-security=no --ssl-protocol=any --ignore-ssl-errors=yes spider.js
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs --web-security=no --ssl-protocol=any --ignore-ssl-errors=yes ./spider.js
echo "   collector: scraping ends"

# dump into mongo
echo "   collector: mongo dumping starts"
nodejs ./dumper.js
echo "   collector: mongo dumping ends"


# cron test
# PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./test/testcasper.js
# nodejs ./test/test.js