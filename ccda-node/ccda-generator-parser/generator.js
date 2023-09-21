var bluebutton = require('bluebutton');
var fs = require("fs");

var json = fs.readFileSync('data/output/CCD.json', 'utf-8');
var template = fs.readFileSync('data/template/ccda_template.ejs', 'utf-8');
var myRecord = bluebutton(json, {
    generatorType: 'ccda',
    template: template
});

fs.writeFileSync('data/generated/CCD.xml', myRecord.data);