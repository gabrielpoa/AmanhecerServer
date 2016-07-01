module.exports = function(app) {

	var crypto = require('crypto'),
    	algorithm = 'aes-256-ctr',
    	password = 'x83js7ks6';

	var UtilController = {
			
		encrypt: function(text, crypted) {
			var cipher = crypto.createCipher(algorithm,password)
			crypted = cipher.update(text,'utf8','hex')
			crypted += cipher.final('hex');
		},
			
		decrypt: function(text, decrypted) {
			var decipher = crypto.createCipher(algorithm,password)
			decrypted = decipher.update(text,'utf8','hex')
			decrypted += decipher.final('hex');
		}
			
	};
	
	return UtilController;	
};