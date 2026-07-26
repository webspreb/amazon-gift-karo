const fs = require('fs');
const path = require('path');

try {
  const giftsDir = path.join(__dirname, '..', 'content', 'gifts');
  const outputDir = path.join(__dirname, '..', 'src', 'lib');
  const outputFile = path.join(outputDir, 'gifts-data.json');

  let gifts = [];
  if (fs.existsSync(giftsDir)) {
    const files = fs.readdirSync(giftsDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const content = fs.readFileSync(path.join(giftsDir, file), 'utf8');
      gifts.push(JSON.parse(content));
    });
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(gifts, null, 2), 'utf8');
  console.log(`Successfully compiled ${gifts.length} gifts into src/lib/gifts-data.json`);
} catch (error) {
  console.error("Failed to compile local gifts database:", error);
  process.exit(1);
}
