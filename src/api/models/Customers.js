const mongoose = require('mongoose');
require('dotenv').config();

const customerSchema = new mongoose.Schema({
  firstName: String,
});

const customerModel = mongoose.model('customer', customerSchema, 'customers');

class Customers {
  constructor() {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('Connected');
      })
      .catch((err) => {
        console.log(`DB Connection Error: ${err.message}`);
      });

    let database = [];

    mongoose.connection.on('open', function (ref) {
      console.log('Connected to mongo server.');

      mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names);
      });

      customerModel.find({}, function (err, foundData) {
        if (err) {
          console.log(err);
        } else {
          console.log(foundData);
        }
      });
    });
  }
  async getCustomers() {
    let customers = await customerModel.find({}).exec();
    return customers;
  }
  async addCustomer(newCustomer) {
    let customer;
  }
  updateCustomer(customerId, customerData) {

  }
}

module.exports = Customers;
