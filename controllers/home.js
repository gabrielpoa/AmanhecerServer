module.exports = function(app) {
	var HomeController = {
		index: function(req, res) {
			res.render('home/index');
		},
		logon: function(req, res) {
			res.render('home/logon');
		}		
	};
	
	return HomeController;
};