module.exports = function(app) {
	var usuarios = require('./usuarios');
	var usr = new usuarios();
	
	var HomeController = {
		index: function(req, res) {
			res.render(usr.logged(req, res, 'home/index'));
		},
		logon: function(req, res) {
			res.render('home/logon');
		}		
	};
	
	return HomeController;
};