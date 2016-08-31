'use strict';

module.exports = function(app) {
	var usuarios = require('./usuarios');
	var usr = new usuarios();
	
	var HomeController = {
		index: function(req, res) {
			var xxxx = usr.logged(req, res, 'home/index');
			console.log(xxxx);
			res.render(xxxx);
		},
		logon: function(req, res) {
			res.render('home/logon');
		}		
	};
	
	return HomeController;
};