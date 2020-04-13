const express = require('express');
const estimator = require('../estimator');

const router = express.Router();
const estimates = estimator.default();

router.get('/', (req, res) => {
  res.send(estimates);
});

module.exports = router;
