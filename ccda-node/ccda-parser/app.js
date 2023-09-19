const fs = require('fs');
const bb = require('@amida-tech/blue-button');
const { Parser } = require('json2csv');

// Read the CCDA document from a file
const ccdaXml = fs.readFileSync('data/input/ccda_sample1.xml', 'utf-8');

// Parse the CCDA document
const parsedCcda = bb.parse(ccdaXml);

// Access patient information
const patient = parsedCcda.data.demographics;

const flattenedPatient = flattenObject(patient);
const fields = Object.keys(flattenedPatient);
const jsonParser = new Parser({ fields });
const csvData = jsonParser.parse([flattenedPatient]);

fs.writeFileSync('data/output/patient.csv', csvData);

// // Access medication information
// const medications = parsedCcda.data.medications;
// // Access problem information
// const problems = parsedCcda.data.problems;

// console.log('Patient:', patient.name.last);
// console.log('Medications:', medications);
// console.log('Problems:', problems);


function flattenObject(obj, parentKey = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object') {
            const flattened = flattenObject(obj[key], newKey);
            return { ...acc, ...flattened };
        }
        return { ...acc, [newKey]: obj[key] };
    }, {});
}