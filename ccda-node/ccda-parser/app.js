const fs = require('fs');
const bb = require('@amida-tech/blue-button');

// Read the CCDA document from a file
const ccdaXml = fs.readFileSync('data/input/ccda_sample1.xml', 'utf-8');

// Parse the CCDA document
const parsedCcda = bb.parse(ccdaXml);

// Access patient information
const patient = parsedCcda.data.demographics;
// Access medication information
const medications = parsedCcda.data.medications;
// Access problem information
const problems = parsedCcda.data.problems;

console.log('Patient:', patient);
console.log('Medications:', medications);
console.log('Problems:', problems);
