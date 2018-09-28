const fs = require('fs');

exports.write = function (array, fileName) {
  const path = `./output/${fileName}`;
  fs.writeFile(path, array, 'utf8', (err) => {
    if (err) throw err;
  });
};