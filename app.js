
/**
 * Module dependencies.
 */

var express = require('express')
  , load = require('express-load')
  , methodOverride = require('method-override')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

// all environments
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('server_ip_address', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//swig configuration
//cons.swig.setDefaults({ varControls: ['{{', '}}'] });

//mongodb configuration
var connection_string = 'AdminAmanhecer:abcd1234@127.0.0.1:27017/amanhecerdb';

//mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
	
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	  process.env.OPENSHIFT_APP_NAME;
	}	

global.db = mongoose.connect('mongodb://'+connection_string);

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
