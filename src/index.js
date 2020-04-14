const express = require('express');
const estimate = require('./estimator');

const app = express();

app.use(express.json());

const { input } = estimate.prototype.data;


app.route('/api/v1/on-covid-19')
  .get((req, res) => {
    res.send(estimate(input).impact);
  });


const port = process.env.PORT || 3000;
app.listen(port);
