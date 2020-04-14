const express = require('express');
const morgan = require('morgan');
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');
const estimate = require('./estimator');

const app = express();

app.use(express.json());

const logStream = fs.createWriteStream(path.join(__dirname, './covidLogs.log'), { flags: 'a' });

app.use(morgan(':method :url :status :response-time ms', { stream: logStream }));

app.route('/api/v1/on-covid-19')
  .post((req, res) => {
    const results = estimate(req.body);
    res.send({
      data: req.body,
      impact: {
        currentlyInfected: results.impact.currentlyInfected,
        infectionsByRequestedTime: results.impact.infectionsByRequestedTime,
        severeCasesByRequestedTime: results.impact.severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: results.impact.hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: results.impact.casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: results.impact.casesForVentilatorsByRequestedTime,
        dollarsInFlight: results.impact.dollarsInFlight
      },
      severeImpact: {
        currentlyInfected: results.severeImpact.currentlyInfected,
        infectionsByRequestedTime: results.severeImpact.infectionsByRequestedTime,
        severeCasesByRequestedTime: results.severeImpact.severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: results.severeImpact.hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: results.severeImpact.casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: results.severeImpact.casesForVentilatorsByRequestedTime,
        dollarsInFlight: results.severeImpact.dollarsInFlight
      }
    });
  });

app.route('/api/v1/on-covid-19/json')
  .post((req, res) => {
    const results = estimate(req.body);
    res.send({
      data: req.body,
      impact: {
        currentlyInfected: results.impact.currentlyInfected,
        infectionsByRequestedTime: results.impact.infectionsByRequestedTime,
        severeCasesByRequestedTime: results.impact.severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: results.impact.hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: results.impact.casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: results.impact.casesForVentilatorsByRequestedTime,
        dollarsInFlight: results.impact.dollarsInFlight
      },
      severeImpact: {
        currentlyInfected: results.severeImpact.currentlyInfected,
        infectionsByRequestedTime: results.severeImpact.infectionsByRequestedTime,
        severeCasesByRequestedTime: results.severeImpact.severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: results.severeImpact.hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: results.severeImpact.casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: results.severeImpact.casesForVentilatorsByRequestedTime,
        dollarsInFlight: results.severeImpact.dollarsInFlight
      }
    });
  });

app.route('/api/v1/on-covid-19/xml')
  .post((req, res) => {
    const results = estimate(req.body);
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const jsRes = {
      data: req.body,
      impact: {
        currentlyInfected: results.impact.currentlyInfected,
        infectionsByRequestedTime: results.impact.infectionsByRequestedTime,
        severeCasesByRequestedTime: results.impact.severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: results.impact.hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: results.impact.casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: results.impact.casesForVentilatorsByRequestedTime,
        dollarsInFlight: results.impact.dollarsInFlight
      },
      severeImpact: {
        currentlyInfected: results.severeImpact.currentlyInfected,
        infectionsByRequestedTime: results.severeImpact.infectionsByRequestedTime,
        severeCasesByRequestedTime: results.severeImpact.severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: results.severeImpact.hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: results.severeImpact.casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: results.severeImpact.casesForVentilatorsByRequestedTime,
        dollarsInFlight: results.severeImpact.dollarsInFlight
      }
    };
    res.send(convert.json2xml(jsRes, options));
  });

app.route('/api/v1/on-covid-19/logs')
  .get((req, res) => {
    fs.readFile(path.join(__dirname, 'covidLogs.log'), (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  });


const port = process.env.PORT || 3000;
app.listen(port);
