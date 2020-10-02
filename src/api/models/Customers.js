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
    let customer = customerModel(newCustomer);
    console.log(customer);
    customer
      .save()
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  updateCustomer(customerData) {
    console.log(customerData);
    customerModel
      .findOneAndUpdate(
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
      )
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = Customers;
