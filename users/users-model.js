const db = require('../database/dbConfig.js');

module.exports = {
	findBy,
	findById,
	add,
	removeById
};

function findBy(filter) {
	return db('users')
		.where(filter);
}

function findById(id) {
	return db('users').where('id', id).first();
}

// async and then await super important!
async function add(user) {
	const [id] =  await db('users').insert(user);
	return findById(id);
}

function removeById(id) {
	return db('users').del(id);
}