var express = require('express');
var router = express.Router();
const db = require('../bd');

/**
 * Lista todos os Usuários
 */
router.get('/users', function(req, res, next) {
  const Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
  Customer.find({}).lean().exec((e,docs) => {
    res.json(docs);
    res.end();
  });
});
/**
 * Lista um Usuário expecifico
 * @param id
 */
router.get('/user/:id', (req, res, next) => {
  const Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
  Customer.find({_id:req.params.id}).lean().exec((e, docs) => {
    if(!docs){
      res.send({error: 'User not found'});
      res.end();
    }
    res.json(docs);
    res.end();
  });
});
/**
 * Adicionar um User devidamente preenchido
 * @param name
 * @param email
 */
router.post('/user', (req, res, next) =>{
  const  Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
  let newUser = new Customer({name:req.body.name, email:req.body.email});
  newUser.save((err) => {
    if(err){
      res.send({error: err.message});
      res.end();
      return;
    }
    res.json(newUser);
    res.end();
  });
});
/**
 * Altera um User
 * @param id
 */
router.put('/user/:id', (req, res, next) => {
  const Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
  Customer.findOneAndUpdate({_id: req.param.id }, req.body, (err, docs) => {
    if(err){
      res.send({error: 'Error delete User'}).json({error : err.message});
      res.end();
      return;
    }
    res.json(req.body);
    res.end();
  });
});
/**
 * Remove um User
 * @param id
 */
router.delete('/user/:id', (req, res, next) => {
  const Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
  Customer.find({_id: req.param.id}).findOneAndRemove(err => {
    if(err){
      res.send(500).json({error: err.message});
      res.end();
    }
    res.json({success : true});
    res.end();
  });
});
module.exports = router;
