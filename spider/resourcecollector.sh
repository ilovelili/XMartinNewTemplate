#!/bin/bash
# get resource
echo "   collector: scraping starts"
casperjs spider.js
echo "   collector: scraping ends"

# dump into mongo
echo "   collector: mongo dumping starts"
nodejs dumper.js
echo "   collector: mongo dumping ends"