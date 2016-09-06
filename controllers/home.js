'use strict';

module.exports = function(app) {
	var usuarios = require('./usuarios');
	var usr = new usuarios();
	
	var HomeController = {
		index: function(req, res) {
			var retorno = usr.logged(req, 'home/index');
			res.render(retorno);
		},
		logon: function(req, res) {
			res.render('home/logon');
		}		
	};
	
	return HomeController;
};