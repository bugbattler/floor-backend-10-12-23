const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    user: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    cName: {type: String, required: false}, // company name
    address: {type: String, required: true},
    nearByLocation: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    postalCode: {type: Number, required: true},
    mNo: {type: Number, required: true},
    email: {type: String, required: true},
  }, {timestamps: true});

module.exports = mongoose.model('userAddress',AddressSchema);