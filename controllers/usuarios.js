module.exports = function(app) {
	
	var Usuario = require('mongoose').model("Usuario")
	
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
		}			
	
	}

	return UsuarioController;	
	
}