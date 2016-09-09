'use strict';

module.exports = function(app) {
	var usuarios = require('./usuarios');
	var usr = new usuarios();
	
	var HomeController = {
		index: function(req, res) {
			usr.logged(req, 'home/index', function(page, status) {
				res.statusCode = status;
				res.render(page);
			});
		},
		logon: function(req, res) {
			res.render('home/logon');
		}		
	};
	
	return HomeController;
};