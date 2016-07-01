module.exports = function(app) {
	var usuarios = app.controllers.usuarios;
	app.post('/usuarios/logon', usuarios.logon);
	app.get('/usuarios', usuarios.index);
	app.get('/usuarios/:id', usuarios.show);
	app.post('/usuarios', usuarios.create);
	app.put('/usuarios/:id', usuarios.update);
	app.delete('/usuarios/:id', usuarios.destroy);
};