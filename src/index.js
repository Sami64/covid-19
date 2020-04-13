const express = require('express');
const api = require('./routes/api');

const app = express();

app.use(express.json());
app.use('/api/v1/on-covid-19', api);

const port = process.env.PORT || 3000;
app.listen(port);
