var express     = require('express');
var app         = express();
var ejs         = require('ejs');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('dotenv').load();

app.set('view engine', 'ejs');

app.use( express.static('./public') );

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/scraps-nyc-01');

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var apiRouter = require('./routes/api/apiRouter');
app.use('/api/emails', apiRouter);

var port = 8000;
app.listen(port, function(){
  console.log("...listening on " + port);
});
