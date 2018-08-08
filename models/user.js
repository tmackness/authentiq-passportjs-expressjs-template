'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  authentiqId: String,
  firstName: String,
  middleName: String,
  lastName: String,
  email: {
    address: String,
    verified: Boolean
  },
  phone: {
    number: String,
    phoneType: String,
    verified: Boolean
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
