module.exports = function(app) {
	
	var Usuario = require('mongoose').model("Usuario")
	var libutil = require('./libutil');
	
	var UsuarioController = {

		create: function(req, res) {
			var usuarioModel = new Usuario(req.body);
			usuarioModel.save(function(err, usuario) {
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Erro ocorrido: " + err
		            })
		        } else {
		        	res.status(201);
		            res.json({
		                "usuario": usuario
		            })
		        }
		    })
		},			
		
		index: function(req, res) {
			Usuario.find({},{nome:1},function(err,usuarios){
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Erro ocorrido: " + err
		            })
		        } else {
		            res.json({
		                "usuarios": usuarios
		            })
		        }				
		    });
	
		},

		show: function(req, res) {
			Usuario.findById(req.params.id,function(err,usuario){
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Erro ocorrido: " + err
		            })
		        } else {
		            res.json({
		                "usuario": usuario
		            })
		        }				
		    });
		},	
		
		logon: function(req, res) {
			Usuario.findOne({email: req.body.email, senha: req.body.senha},{nome:1},function(err,usuario){
				console.log("entrei");
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Erro ocorrido: " + err
		            })
		        } else {
		        	if(usuario) {
			            res.json({
			            	"usuario": usuario
			            })		        		
		        	} else {
		        		res.status(204);
			            res.json({
			                type: false
			            })			                
		        	}
		        }				
		    });
		},			
		
		update: function(req, res) {
			var usuario = req.body.usuario
			, usuario = req.session.usuario;
			usuario.contatos.push(usuario);
			res.redirect('/usuarios');
		},	
		

		
		destroy: function(req, res) {
			var usuario = req.body.usuario
			, usuario = req.session.usuario;
			usuario.contatos.push(usuario);
			res.redirect('/usuarios');
		},	
		
		logged: function(req, res, page) {
			
			 if (req.path == '/logon') {
				 return true;
			 } else {
			   var lbUtil = new libutil();		 
			   var authOk = false;
			   var auth = req.headers['authorization'];
			   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			   console.log(">>> Header: " + auth);
			   console.log(">>> IP: " + ip);
			   
			   if (auth) {
				     var b64 = new Buffer(auth.substring(6), 'base64');
				     var sobj = b64.toString();
				     var objJson = lbUtil.decrypt(sobj);
				     var objeto = JSON.parse(objJson);         
				     console.log(">>> Conteudo: " + JSON.stringify(objeto));
				     
				     Usuario.findOne({id: objeto.id, email: objeto.email},{email:1},function(err,usuario){
				        if (err) {
				            console.log(">>> erro" + err);				        	
			        		return "home/logon";

				        } else {
				        	if(usuario && ip == objeto.ip) {
				        		console.log(">>> OK");
				        		return page;	        		
				        	} else {
				        		console.log(">>> usuario inexiste ou ip diferente");
				        		return "home/logon";		                
				        	}
				        }				
					 });	     
				}
			   return "home/logon";
			 }
		}		
	
	}

	return UsuarioController;	
	
}