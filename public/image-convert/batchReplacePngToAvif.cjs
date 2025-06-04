const fs = require('fs').promises;
const path = require('path');

async function findHtmlFiles(startDir, fileList = []) {
    const entries = await fs.readdir(startDir, { withFileTypes: true });

    for (const entry of entries) {
        const entryPath = path.join(startDir, entry.name);

        if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== '.git' && !entry.name.startsWith('.')) {
                await findHtmlFiles(entryPath, fileList);
            }
        }
        else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.html') {
            fileList.push(entryPath);
        }
    }

    return fileList;
}

async function processHtmlFiles() {
    const projectRoot = '../..';
    const imagesDir = '../images';

    let avifBasenames = new Set();
    try {
        const avifFiles = await fs.readdir(imagesDir);
        avifFiles.forEach(file => {
            if (path.extname(file).toLowerCase() === '.avif') {
                avifBasenames.add(path.basename(file, '.avif'));
            }
        });
    } catch (err) {
        console.error('Error reading images directory:', err);
        return;
    }

    if (avifBasenames.size === 0) {
        console.log('No AVIF files found in the images directory to process.');
        return;
    }

    let htmlFilesToProcess = [];
    try {
        htmlFilesToProcess = await findHtmlFiles(projectRoot);
         if (htmlFilesToProcess.length === 0) {
              console.log('No HTML files found in the project.');
              return;
         }
    } catch (err) {
        console.error('Error finding HTML files:', err);
        return;
    }

    console.log(`Found ${htmlFilesToProcess.length} HTML files and ${avifBasenames.size} AVIF images. Starting replacement...`);

    for (const htmlFilePath of htmlFilesToProcess) {
        try {
            let data = await fs.readFile(htmlFilePath, 'utf8');
            let modifiedData = data;
            let changesMade = false;

            const urlPngRegex = /url\s*\(\s*['"]?([^)'"]+\.png)['"]?\s*\)/g;

            modifiedData = data.replace(urlPngRegex, (match, capturedPngPath) => {
                const pngFileName = path.basename(capturedPngPath);
                const pngBaseName = path.basename(pngFileName, '.png');

                if (avifBasenames.has(pngBaseName)) {
                    const fullAvifPathInHtml = capturedPngPath.replace(/\.png$/, '.avif');
                    changesMade = true;

                    if (match.includes("'")) {
                        return `url('${fullAvifPathInHtml}')`;
                    } else if (match.includes('"')) {
                        return `url("${fullAvifPathInHtml}")`;
                    } else {
                        return `url(${fullAvifPathInHtml})`;
                    }
                }
                return match;
            });


            if (changesMade) {
                 await fs.writeFile(htmlFilePath, modifiedData, 'utf8');
                 console.log(`HTML file updated successfully: ${htmlFilePath}`);
            } else {
                 console.log(`No PNG image links found to replace in ${htmlFilePath}.`);
            }

        } catch (err) {
            console.error(`Error processing HTML file ${htmlFilePath}:`, err);
        }
    }

    console.log('Finished processing all HTML files.');
}

processHtmlFiles().catch(console.error);
