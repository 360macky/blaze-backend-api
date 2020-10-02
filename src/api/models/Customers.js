const mongoose = require('mongoose');
require('dotenv').config();

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
});

const customerModel = mongoose.model('customer', customerSchema, 'customers');

class Customers {
  constructor() {
    mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
  async getCustomers() {
    let customers = await customerModel.find({}).exec();
    return customers;
  }
  async addCustomer(newCustomer) {
    let customer = customerModel(newCustomer);
    customer.save();
  }
  updateCustomer(customerData) {
    customerModel.findOneAndUpdate(
      {
        _id: customerData._id,
      },
      {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phoneNumber: customerData.phoneNumber,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  }
}

module.exports = Customers;
