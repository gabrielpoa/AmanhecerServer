module.exports = function(app) {

	var crypto = require('crypto'),
    	algorithm = 'aes-256-ctr',
    	password = 'x83js7ks6';

	var LibutilController = {
			
		encrypt: function(text, crypted) {
			var cipher = crypto.createCipher(algorithm,password)
			crypted = cipher.update(text,'utf8','hex')
			crypted += cipher.final('hex');
			return crypted;
		},
			
		decrypt: function(text, decrypted) {
			var decipher = crypto.createDecipher(algorithm,password)
			decrypted = decipher.update(text,'hex','utf8')
			decrypted += decipher.final('utf8');
			return decrypted;
		},
	};
	
	return LibutilController;	
};