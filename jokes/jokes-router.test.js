const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');


describe('jokes-router', function () {

	beforeEach(async function () {
			await db('users').truncate();
	})

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

		it('200 on jokes', async function () {
			const user = { username: 'Bill', password: 'fortnight' }
			await request(server) // post new user, post login, .then , async await(user )
				.post('/api/auth/register').send(user)
				.then(async () => {
					await request(server).post('/api/auth/login').send(user)
						.then(async (res) => {
							token = res.body.token
							await request(server).get('/api/jokes')
							.set('authorization', token)
							.then(res => {
								expect(res.status).toBe(200);
							})
						})
				})
		})
	})
});