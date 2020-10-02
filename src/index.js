const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Customers = require('./api/models/Customers');
const customersData = new Customers();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/customers', async (request, response) => {
  let customers = await customersData.getCustomers();
  response.status(200).send(customers);
});

app.get('/api/add/customer', async (request, response) => {
  let newResponse = await customersData.addCustomer(request.query);
  response.status(200).send(request.query);
});

app.get('/api/update/customer', async (request, response) => {
  let newResponse = await customersData.updateCustomer(request.query);
  response.status(200).send(request.query);
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {})
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.listen(port, () => {
  console.log('Listening');
});
