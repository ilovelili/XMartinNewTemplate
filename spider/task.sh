#!/bin/bash

echo "resourcecollector starts"
/home/min/Projects/xmartin/spider/resourcecollector.sh
echo "resourcecollector ends"

echo "resourceshrinker starts"
/home/min/Projects/xmartin/spider/resourceshrinker.sh
echo "resourceshrinker ends"