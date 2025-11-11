onst fs = require('fs');

function saveData(data, outputPath) {
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
}

module.exports = { saveData };