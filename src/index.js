const express = require('express');
const app = express();
const Customers = require('./api/models/Customers');
const customersData = new Customers();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
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

app.listen(port, () => {
  console.log('Listening');
});
