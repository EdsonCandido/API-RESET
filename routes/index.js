var express = require('express');
var router = express.Router();
const db = require('../bd');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
  Customer.find({}).lean().exec((e,docs) => {
    res.json(docs);
    res.end();
  });
});

module.exports = router;
