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
  var newEmail = new Email( req.body.Email );
  newEmail.save(function(err, dbEmail){
    res.json( dbEmail );
  });
});

apiRouter.delete('/:id', function(req, res){
  Email.findByIdAndRemove(req.params.id, function(err){
    if (err) { res.status(500).end(); }
    res.status(204).end();
  });
});

module.exports = apiRouter;
