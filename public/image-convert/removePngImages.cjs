const fs = require('fs');
const path = require('path');

const imagesDir = '../images'; 

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.png') {
      const filePath = path.join(imagesDir, file);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${file}:`, err);
        } else {
          console.log(`Deleted file ${file}`);
        }
      });
    }
  });
});