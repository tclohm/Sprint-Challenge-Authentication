const request = require('supertest');
const server = require('../api/server.js');
const db = request('../database/dbConfig.js');

describe('auth-router', function () {
	describe('test environment', function () {
		it('should be using test env', function () {
			expect(process.env.DB_ENV).toBe('testing');
		})
	})

	describe('registration', function () {
		it('should return 201 when posting', async function () {
			const user = { username: 'Shawn', password: 'fortnight'}
			return request(server).post('/api/auth/register').send(user)
				.then(res => {
					expect(res.status).toBe(201)
				})
		})
	})

	describe('registration', function () {
		it('should return user', async function () {
			const user = { username: 'Reggie', password: 'fortnight'}
			return request(server).post('/api/auth/register').send(user)
				.then(res => {
					expect(res.body.username).toBe('Reggie')
				})
		})
	})


	describe('login', function () {
		it('should return a token', function () {
			const user = { username: 'Shawn', password: 'fortnight'}
			return request(server).post('/api/auth/login').send(user)
				.then(res => {
					expect(res.body.token).toBe(`${res.body.token}`)
				})
		})
	})

	describe('login', function () {
		it('should return a 201', function () {
			const user = { username: 'Reggie', password: 'fortnight' }
			return request(server).post('/api/auth/login').send(user)
				.then(res => {
					expect(res.status).toBe(200)
				})
		})
	})
});