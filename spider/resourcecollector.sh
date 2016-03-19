#!/bin/bash
# get resource
echo "   collector: scraping starts"
casperjs /home/min/Projects/xmartin/spider/spider.js
echo "   collector: scraping ends"

# dump into mongo
echo "   collector: mongo dumping starts"
nodejs /home/min/Projects/xmartin/spider/dumper.js
echo "   collector: mongo dumping ends"