
/**
 * Module dependencies.
 */

var express = require('express')
  , load = require('express-load')
  , methodOverride = require('method-override')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('server_ip_address', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//express load
load('models')
.then('controllers')
.then('routes')
.into(app);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), app.get('server_ip_address'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
