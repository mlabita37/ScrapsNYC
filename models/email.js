var mongoose = require('mongoose');

var emailSchema = mongoose.Schema({
  firstname: {type: String, require: true},
  lastname: {type: String, require: true},
  email: {type: String, require: true}
}, {timestamps: true}
);

module.exports = mongoose.model('Email', emailSchema);
