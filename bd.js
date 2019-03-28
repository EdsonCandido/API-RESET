const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/api_rest', {useNewUrlParser: true});

const customerSchema = new mongoose.Schema({
    name: String,
    email: String
}, {collation: 'customers'});

module.exports = {Mongoose: mongoose, CustomerSchema: customerSchema };