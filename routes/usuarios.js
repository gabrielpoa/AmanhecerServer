module.exports = function(app) {
	var usuarios = app.controllers.usuarios;
	app.get('/usuarios', usuarios.index);
	app.get('/usuario/:id', usuarios.show);
	app.post('/usuario', usuarios.create);
	app.put('/usuario/:id', usuarios.update);
	app.delete('/usuario/:id', usuarios.destroy);
};