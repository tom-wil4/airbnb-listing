onst { extractAirbnbData } = require('./extractors/airbnb_parser');
const { saveData } = require('./outputs/data_exporter');
const sampleInputs = require('../data/sample_inputs.json');

async function main() {
const allData = [];
for (const url of sampleInputs.urls) {
try {
const data = await extractAirbnbData(url);
allData.push(data);
} catch (error) {
console.error(`Error extracting data for ${url}:`, error);
}
}
saveData(allData, '../data/sample_output.json');
}

main();