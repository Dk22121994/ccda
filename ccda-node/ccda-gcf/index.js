// const functions = require('@google-cloud/functions-framework');

// functions.http('helloHttp', (req, res) => {
//   res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
// });

const bluebutton = require('bluebutton');
const xml2js = require('xml2js');

exports.ccdaparser = async (req, res) => {
  if (!req.body) {
    res.status(400).send('Bad Request: Missing CCDA XML in the request body');
    return;
  }

  try {

    // const parser = new xml2js.Parser();
    // const xmlObject = await parser.parseStringPromise(req.body.ccdaXml);
    console.log(req.body);
    const ccdaJson = bluebutton(req.body, { generatorType: 'ccda' });
    console.log(ccdaJson);
    const jsonStr = JSON.stringify(ccdaJson.data);

    
    res.status(200).send(jsonStr);
  } catch (error) {
    console.error('Error processing CCDA XML:', error);
    res.status(500).send('Internal Server Error');
  }
};
