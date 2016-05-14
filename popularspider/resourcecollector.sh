#!/bin/sh

# get resource
echo "   collector: scraping starts"
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./weeklyspider.js
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./monthlyspider.js
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./fulltimespider.js
echo "   collector: scraping ends"

# dump into mongo
echo "   collector: mongo dumping starts"
nodejs ./weeklydumper.js
nodejs ./monthlydumper.js
nodejs ./fulltimedumper.js
echo "   collector: mongo dumping ends"

# cron test
# PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs ./test/testcasper.js
# nodejs ./test/test.js