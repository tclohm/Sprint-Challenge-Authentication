const db = require('../database/dbConfig.js');

module.exports = {
	findBy,
	findById,
	add
};

function findBy(filter) {
	return db('users')
		.where(filter);
}

function findById(id) {
	return db('users').where('id', id).first();
}

async function add(user) {
	const [id] =  db('users').insert(user);
	return findById(id);
}