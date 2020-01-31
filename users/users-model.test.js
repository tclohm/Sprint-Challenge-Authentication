const Users = require('./users-model.js');
const db = require('../database/dbConfig.js');

describe('users model', function () {

	describe('test env', function () {
		it('should use test env', function () {
			expect(process.env.DB_ENV).toBe('testing');
		})
	})

	describe('insert', function () {
		beforeEach(async () => {
			await db('users').truncate();
		})

		it('add user to db', async function () {
			await Users.add({ username: 'Shavi Visram', password: 'f381nfanmendo2-dlswD' });
			const users = await db('users');
			expect(users).toHaveLength(1);
		})

		it('remove user from db', async function () {
			await Users.add({ username: 'Bikhram', password: 'blhablahblahslbhasd' });
			await Users.removeById(1);
			const users = await db('users');
			expect(users).toHaveLength(0);
		})

	})
})