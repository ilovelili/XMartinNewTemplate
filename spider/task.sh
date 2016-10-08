#!/bin/sh

echo "resourcecollector starts"
/bin/sh ./resourcecollector.sh
echo "resourcecollector ends"

# echo "resourceshrinker starts"
# /bin/sh ./resourceshrinker.sh
# echo "resourceshrinker ends"

echo "rss starts"
/bin/sh ./rss.sh
echo "rss ends"