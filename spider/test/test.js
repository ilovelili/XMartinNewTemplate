var fs = require('fs');

fs.writeFile('/tmp/output.txt', 'hit by nodejs', (err) => {
  if (err) throw err;
  console.log('saved!');
});