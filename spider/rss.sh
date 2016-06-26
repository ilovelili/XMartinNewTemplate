# rss generate
echo "   collector: rss generating starts"
# rss 2.0
nodejs ./rss.js
# rss 1.0
nodejs ./rdf.js
echo "   collector: rss generating ends"