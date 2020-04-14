const express = require('express');
const estimate = require('./estimator');

const app = express();

app.use(express.json());

app.route('/api/v1/on-covid-19')
  .post((req, res) => {
    const results = estimate(req.body);
    console.log(req.body);
    res.send({
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
    })
  });

app.route('/api/v1/on-covid-19/json')
  .post((req, res) => {

  });

app.route('/api/v1/on-covid-19/xml')
  .post((req, res) => {

  })

app.route('/api/v1/on-covid-19/logs')
  .get((req, res) => {

  })


const port = process.env.PORT || 3000;
app.listen(port);
