const sharp = require('sharp');
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
            const inputPath = path.join(imagesDir, file);
            const outputPath = path.join(imagesDir, path.basename(file, '.png') + '.avif');

            sharp(inputPath)
                .avif({ quality: 50 }) 
                .toFile(outputPath)
                .then(() => {
                    console.log(`Converted ${file} to ${path.basename(file, '.png')}.avif`);
                })
                .catch(err => {
                    console.error(`Error converting ${file}:`, err);
                });
        }
    });
});
