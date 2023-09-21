var bluebutton = require('bluebutton');
var fs = require("fs");

var ccdaXml = fs.readFileSync('data/input/CCD.xml', 'utf-8');
var ccdaJson = bluebutton(ccdaXml, {generatorType: 'ccda'});
fs.writeFileSync('data/output/CCD.json', JSON.stringify(ccdaJson.data));