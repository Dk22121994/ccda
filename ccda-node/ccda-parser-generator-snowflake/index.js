const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const mustache = require('mustache');

const snowflakeHelper = require('./snowflakeHelper');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/paraseccda', async (req, res) => {
    try {
        const patientId = req.query.id;

        //   // Connect to Snowflake
        //   await snowflakeHelper.connectToSnowflake();

        //   // Get Health Concern Data
        //   const healthConcernData = await snowflakeHelper.callStoredProcedure('usp_get_health_concern_data', patientId);
        //   // Get Medication Data
        //   const medicationData = await snowflakeHelper.callStoredProcedure('usp_get_medication_data', patientId);
        //   // Get Medication Data
        //   const measureData = await snowflakeHelper.callStoredProcedure('usp_get_measure_data', patientId);

        //   // Disconnect from Snowflake
        //   await snowflakeHelper.disconnectFromSnowflake();

        // Has to be commented
        const healthConcernData = {
            healthConcernEntries: [{
                "id": "Concern1",
                "value": "This is for testing, the value of the id concer1 is concern1value"
            }, {
                "id": "Concern2",
                "value": "This is for testing, the value of the id concer1 is concern2value"
            }]
        };

        const healthConcernTemplateFile = fs.readFileSync('template/healthConcern.xml.mustache', 'utf8');
        const healthConcernRenderedTemplate = mustache.render(healthConcernTemplateFile, healthConcernData);
        const healthConcernXml = await generateXml(healthConcernRenderedTemplate);

        const medicationData = {
            medicationEntries: [{
                "medicationId": "1",
                "medicationNameId": "MedName_1",
                "medicationName": "Drug1",
                "medicationSigId": "MedSig_1",
                "medicationInstruction": "Post Lunch",
                "medicationDosage": "1",
                "medicationUnits": "mg",
                "medicationEffectiveFrom": "20230901",
                "medicationEffectiveTo": "20231231",
                "medicationStatus": "Active"
            },
            {
                "medicationId": "2",
                "medicationNameId": "MedName_2",
                "medicationName": "Drug2",
                "medicationSigId": "MedSig_2",
                "medicationInstruction": "Pre Lunch",
                "medicationDosage": "0.5",
                "medicationUnits": "mg",
                "medicationEffectiveFrom": "20230901",
                "medicationEffectiveTo": "20231231",
                "medicationStatus": "Active"
            }]
        };
        const medicationTemplateFile = fs.readFileSync('template/medication.xml.mustache', 'utf8');
        const medicationRenderedTemplate = mustache.render(medicationTemplateFile, medicationData);
        const medicationXml = await generateXml(medicationRenderedTemplate);

        const qualityData = {
            qualityEntries: [{
                "measure": "Diabetes Hemoglobin A1c Poor Control (CMS 122v5)",
                "complainceStart": "20170101",
                "complainceEnd": "20171231",
                "denominator": "yes",
                "numerator": "no",
                "exclusion": "no",
                "outcome": "Compliant",
                "denoNegationInd": "false",
                "numeNegationInd": "true",
                "entryId":"6990b186-b821-4207-9a8c-4d348f3ac4f6"
            },
            {
                "measure": "Colorectal Cancer Screening (CMS 130v5)",
                "complainceStart": "20170101",
                "complainceEnd": "20171231",
                "denominator": "yes",
                "numerator": "no",
                "exclusion": "no",
                "outcome": "Non-Compliant",
                "denoNegationInd": "false",
                "numeNegationInd": "true",
                "entryId":"9c7eab68-1fe9-4612-823e-c56da8517aeb",
                "denex": {
                    "denexNegationInd": "true"
                }
            },
            {
                "measure": "Pneumococcal Vaccination Status for Older Adults (CMS 127v5)",
                "complainceStart": "20170101",
                "complainceEnd": "20171231",
                "denominator": "no",
                "numerator": "no",
                "exclusion": "no",
                "outcome": "Not Eligible",
                "denoNegationInd": "true",
                "numeNegationInd": "true",
                "entryId":"fc5e2960-e2d1-406e-b7e4-fa5873334076"
            },
            {
                "measure": "Controlling High Blood Pressure (CMS 165v5)",
                "complainceStart": "20170101",
                "complainceEnd": "20171231",
                "denominator": "yes",
                "numerator": "excl",
                "exclusion": "yes",
                "outcome": "Excluded",
                "denoNegationInd": "false",
                "numeNegationInd": "true",
                "entryId":"ac81bb4a-6204-4bc5-9e7b-d870afcb3912",
                "denex": {
                    "denexNegationInd": "false"
                }
            }]
        };
        const qualityTemplateFile = fs.readFileSync('template/quality.xml.mustache', 'utf8');
        const qualityRenderedTemplate = mustache.render(qualityTemplateFile, qualityData);
        const qualityXml = await generateXml(qualityRenderedTemplate);


        const headerData = {
            "patientID": "1",
            "patientSocialSecurity": "123-456-789",
            "patientPrimaryHomeStreet": "17 Daws Rd.",
            "patientPrimaryHomeCity": "Blue Bell",
            "patientPrimaryHomeState": "MA",
            "patientPrimaryPostalCd": "02368",
            "patientPrimaryCountry": "US",
            "patientPrimaryPhone": "(781)555-1212",
            "patientLegalPrefix": "Mr.",
            "patientLegalGivenName": "Adam",
            "patientLegalCallMeName": "Frankie",
            "patientLegalFamilyName": "Everyman",
            "patientGenderCode": "M",
            "patientGender": "Male",
            "patientDOB": "19541125",
            "patientMaritalStatus": "Married",
            "patientMaritalStatusCode": "M",
            "patientReligionCode": "1013",
            "patientReligion": "Christian (non-Catholic, non-specific)",
            "patientRaceCode": "2106-3",
            "patientRace": "White",
            "patientEthinicCode": "2186-5",
            "patientEthinic": "Not Hispanic or Latino",
            "gurdianRelationShipCode": "GRFTH",
            "gurdianRelationShip": "Grandfather",
            "gurdianHomeStreet": "17 Daws Rd.",
            "gurdianHomeCity": "Blue Bell",
            "gurdianHomeState": "MA",
            "gurdianHomePostalCode": "02368",
            "gurdianHomeCountry": "US",
            "gurdianHomeTelephone": "(781)555-1212",
            "gurdianGivenName": "Ralph",
            "gurdianFamilyName": "Relative",
            "patientBirthState": "MA",
            "patientBirthPostalCode": "02368",
            "patientBirthCountry": "USA",
            "languageCode": "fr-CN",
            "languageModeCode": "RWR",
            "languageMode": "Recieve Written",
            "ccdaGeneratedTime": "20050329224411+0500",
            "patientInformantRelation": "SPOUSE",
            "patientInformantRelationCode": "SPS",
            "patientInformantGivenName": "Ross",
            "patientInformantFamilyName": "Everyman",
            "providerName": "Good Health Clinic",
            "providerWorkPhone": "(555)555-1212",
            "providerWorkStreet": "17 Daws Rd.",
            "providerWorkCity": "Blue Bell",
            "providerWorkState": "MA",
            "providerWorkPostalCode": "02368",
            "providerWorkCountry": "USA"
        };
        const headerTemplateFile = fs.readFileSync('template/header.xml.mustache', 'utf8');
        const headerRenderedTemplate = mustache.render(headerTemplateFile, headerData);
        const headerXml = await generateXml(headerRenderedTemplate);

        let finalXml = `
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <?xml-stylesheet type="text/xsl" href="CDA.xsl"?>
        <ClinicalDocument
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="urn:hl7-org:v3"
        xmlns:mif="urn:hl7-org:v3/mif">
        ${headerXml}
        <component>
		<structuredBody>
        ${healthConcernXml}
        ${medicationXml}
        ${qualityXml}
		</structuredBody>
        </component>
        </ClinicalDocument>
        `
        finalXml = finalXml.replace('<data>','');
        finalXml = finalXml.replace('</data>','');
        res.send(finalXml);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

async function generateXml(renderedTemplate) {
    return new Promise((resolve, reject) => {
      const parser = new xml2js.Parser({ explicitArray: false, rootName: 'component' });
      xml2js.parseString(renderedTemplate, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          reject(err);
        } else {
          const builder = new xml2js.Builder({ headless: true });
          const xml = builder.buildObject(result);
          resolve(xml);
        }
      });
    });
  }

  /* TODO
  1) If condition to in mustache template to add Null in High value of Effective time
  2) To add new Effective Time based on the Drug (HS, before bed) 
  */