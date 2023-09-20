const fs = require('fs');
var bbg = require("@amida-tech/blue-button-generate")
var doc = fs.readFileSync('./data/input/sample_ccda_input.json', 'utf-8');
const docObj = JSON.parse(doc);
var modifiedDataCCD = bbg.generateCCD(docObj);
fs.writeFileSync('./data/output/generated_ccda.xml', modifiedDataCCD);