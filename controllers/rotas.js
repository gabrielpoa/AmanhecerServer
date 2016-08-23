	var utilitario = app.controllers.utl;
	var Usuario = require('mongoose').model("Usuario")

	function verificarAutenticacao(req, res, next) {
	 // Paths que precisam de autorizacao:
	 if (req.path == '/logon') {
		 return next();
	 } else {
	   		 
	   var authOk = false;
	   var auth = req.headers['authorization'];
	   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	   console.log(">>> Header: " + auth);
	   console.log(">>> IP: " + ip);
	   if (auth) {
	     // Pula o "BASIC ";
	     var b64 = new Buffer(auth.substring(6), 'base64');
	     var sobj = b64.toString();
	     var objJson = utilitario.decrypt(sobj);
	     var objeto = JSON.parse(objJson);         
	     console.log(">>> Conteudo: " + JSON.stringify(objeto));
	     
	     Usuario.findOne({id: objeto.id, email: objeto.email},{email:1},function(err,usuario){
	        if (err) {
        		authOk = false;
	            console.log(">>> erro" + err);
	        } else {
	        	if(usuario && ip == objeto.ip) {
	        		console.log(">>> OK");
	        		authOk = true;	        		
	        	} else {
	        		console.log(">>> usuario inexiste ou ip diferente");
	        		authOk = false;		                
	        	}
	        }				
		 });	     
	   }
	   if (!authOk) {
	     console.log(">>> Falha!");
	     res.json(401,"erro");
	   }
	   else {
	     return next();
	   }
	 }
	}	

	
