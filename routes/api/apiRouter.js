var express = require('express');
var apiRouter = express.Router();

var Email = require('../../models/email');

apiRouter.get('/', function(req, res){
  Email.find({}, function(err, databaseEmails){
    res.json( {emails: databaseEmails} );
  });

});

apiRouter.post('/', function(req, res){
  console.log('Email info', req.body);
  var newEmail = new Email( req.body.email );
  newEmail.save(function(err, dbEmail){
    res.json( dbEmail );
  });
});

module.exports = apiRouter;
