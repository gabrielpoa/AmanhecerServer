module.exports = function(app) {
	
	var Usuario = require('mongoose').model("Usuario")
	var Libutil = require('./libutil');
	
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
			Usuario.findOne({email: req.body.email, senha: req.body.senha},{nome:1, email:2},function(err,usuario){
		        if (err) {
		            res.status(500);
		            res.json({
		                type: false,
		                data: "Erro ocorrido: " + err
		            })
		        } else {
		        	if(usuario) {
		        		var lbUtil = new Libutil();
		        		var usr = JSON.stringify(usuario)
		        		console.log("json: " + usr);
		        		console.log("encrypt: " + lbUtil.encrypt(usr));
			            res.json({
			            	"token": lbUtil.encrypt(usr)
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
		
		logged: function(req, page, callback) {
			 
			 var logonPage = "home/logon";
			 var status = 200;
			
			 if (req.path == '/logon') {
				 page = logonPage;
			 } else {
			   var lbUtil = new Libutil();		 
			   var auth = req.headers['authorization'];
			   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			   console.log(">>> Header: " + auth);
			   console.log(">>> IP: " + ip);
			   
			   if (auth && auth.substring(6).trim() != "undefined") {
				     //var b64 = new Buffer(auth.substring(6), 'base64');
				     //var sobj = b64.toString();
				     var objJson = lbUtil.decrypt(auth.substring(6));
				     var objeto = JSON.parse(objJson);         
				     console.log(">>> _id: " + objeto._id);
				     Usuario.findById(objeto._id,function(err,usuario){
				        if (err) {
				            console.log(">>> erro" + err);	
				            page = logonPage;
				            status = 500;
				            //page = "home/logon";

				        } else {
				        	if(usuario) {
				        		console.log(">>> OK");
				        		console.log(page);
				        		page = page;
      		
				        	} else {
				        		console.log(">>> Token inválido");
				        		//page = "home/logon";		      
				        		page = logonPage;
				        		status = 401;
				        	}
				        }				
					 });	     
				} else {
					page = logonPage;
				}
			 }
				
			 callback(page, status);
		}	

	
	}

	return UsuarioController;	
	
}