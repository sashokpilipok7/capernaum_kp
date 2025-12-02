const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

// 2. Read all files in the directory
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory ' + err);
  }

  console.log('starting build');

  files.forEach(function (file) {
    if (path.extname(file) === '.ejs') {
      // Define paths
      const ejsFilePath = path.join(directoryPath, file);
      const htmlFileName = path.basename(file, '.ejs') + '.html';
      const htmlOutputPath = path.join(directoryPath, htmlFileName);

      // 4. Render the EJS file to HTML
      ejs.renderFile(ejsFilePath, { root: __dirname }, {}, function (err, str) {
        if (err) {
          console.error(`Error rendering ${file}`, err);
          return;
        }

        // 5. Write the HTML file
        fs.writeFileSync(htmlOutputPath, str);
        console.log(`Compiled ${file} -> ${htmlFileName}`);
      });
    }
  });
});
