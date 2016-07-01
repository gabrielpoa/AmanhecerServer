module.exports = function(app) {
	var Schema = require(process.env.PATH_MODULES + 'mongoose').Schema;

	var UsuarioSchema = Schema({
		nome: {type: String, required: true},
		email: {type: String, required: true, index: {unique: true}},
		senha: {type: String, required: true}
	});
	
	return db.model('Usuario', UsuarioSchema);
};