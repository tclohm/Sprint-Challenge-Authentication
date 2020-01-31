const request = require('supertest');
const server = require('../api/server.js');


let token;

beforeAll((done) => {
	const user = { username: 'Reggie', password: 'fortnight' };
	request(server)
		.post('/api/auth/login')
		.send(user)
		.end((err, res) => {
			token = res.body.token;
			done();
		})
})

describe('jokes-router', function () {
	describe('test environment', function () {
		it('should be using test env', function () {
			expect(process.env.DB_ENV).toBe('testing');
		})
	})

	describe('move through restricted and get jokes', function () {
		it('should fail and get a you message', function () {
			return request(server).get('/api/jokes/')
				.then(res => {
					expect(res.body.you).toBe('shall not pass!');
				})
		})
	})

	describe('get jokes', function () {
		// it('register', function () {
		// 	const user = { username: 'Reggie', password: 'fortnight' }
		// 	return request(server)
		// 		.post('/api/auth/register')
		// 		.send(user)
		// 		.then(res => {
		// 			expect(res.status).toBe(201)
		// 		})
		// })

		// it('login', function () {
		// 	const user = { username: 'Reggie', password: 'fortnight' }
		// 	return request(server)
		// 		.post('/api/auth/login')
		// 		.send(user)
		// 		.then(res => {
		// 			token = res.body.token;
		// 			expect(res.body.token)
		// 		})
		// })

		it('200 on jokes', function () {
			return request(server)
				.get('/api/jokes')
				.set('authorization', token)
				.then(res => {
					expect(res.status).toBe(200)
				})
		})
	})
});