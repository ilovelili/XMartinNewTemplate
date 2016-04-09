#!/bin/bash

echo "resourcecollector starts"
bash resourcecollector.sh
echo "resourcecollector ends"

echo "resourceshrinker starts"
bash resourceshrinker.sh
echo "resourceshrinker ends"
