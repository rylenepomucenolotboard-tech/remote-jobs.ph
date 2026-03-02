const Jimp = require('jimp');

async function processImage(inputPath, outputPath, tolerance = 20) {
    try {
        const img = await Jimp.read(inputPath);
        img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // If the pixel is close to pure white, make it transparent
            if (red > (255 - tolerance) && green > (255 - tolerance) && blue > (255 - tolerance)) {
                this.bitmap.data[idx + 3] = 0; // Alpha channel to 0
            }
        });
        await img.writeAsync(outputPath);
        console.log(`Successfully processed ${inputPath} to ${outputPath}`);
    } catch (err) {
        console.error(`Error processing ${inputPath}:`, err);
        process.exit(1);
    }
}

const input = process.argv[2];
const output = process.argv[3];
if (!input || !output) {
    console.log("Usage: node remove_bg.js <input> <output>");
    process.exit(1);
}

processImage(input, output);
