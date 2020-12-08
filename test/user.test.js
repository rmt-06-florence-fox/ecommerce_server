const { beforeAll, describe, test, expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { hashPassword } = require('../helpers/bcrypt');

const email = 'test@mail.com';
const password = '123456';

beforeAll((done) => {
	queryInterface
		.bulkInsert(
			'Users',
			[
				{
					email: email,
					password: hashPassword(password),
					role: 'admin',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{ returning: true }
		)
		.then((user) => {
			// console.log(user)
			done();
		})
		.catch((err) => {
			done(err);
		});
});

afterAll((done) => {
	queryInterface
		.bulkDelete('Users')
		.then((response) => {
			done();
		})
		.catch((err) => {
			done(err);
		});
});

// --- USER TEST ---

describe('Register User POST /register', () => {
	describe('Success Register', () => {
		test('Success response with Status 201 - returning email', (done) => {
			request(app)
				.post('/register')
				.send({ email: 'customer@email.com', password: '123456' })
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(201);
					expect(body).toHaveProperty('email', 'customer@email.com');
					done();
				});
		});
	});
	describe('Error Register', () => {
		test('Error Register with Status 400 - Cant create User because unique validation', (done) => {
			request(app)
				.post('/register')
				.send({ email: email, password: password })
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty(
						'message',
						'This Email has been Taken, try another one'
					);
					done();
				});
		});
		test('Error Register with Status 400 - Email and Password Cannot be Null', (done) => {
			request(app)
				.post('/register')
				.send({ email: '', password: '' })
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						'Email Cannot be Empty',
						'Password Cannot be Empty',
					]);
					done();
				});
		});
		test('Error Register with Status 400 - Email Cannot be Null', (done) => {
			request(app)
				.post('/register')
				.send({ email: '', password: '123456' })
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', ['Email Cannot be Empty']);
					done();
				});
		});
		test('Error Register with Status 400 - Password Cannot be Null', (done) => {
			request(app)
				.post('/register')
				.send({ email: 'customer@emailcom', password: '' })
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', ['Password Cannot be Empty']);
					done();
				});
		});
	});
});

describe('Login User POST /login', () => {
	describe('Success Login', () => {
		test('Success response with Status 200 - returning Access Token', (done) => {
			request(app)
				.post('/login')
				.send({ email: email, password: password })
				.end((err, res) => {
					const { status, body } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(200);
					expect(body).toHaveProperty('access_token');
					done();
				});
		});
	});
	describe('Error Login', () => {
		test('Error Login Response with Status 400 - Invalid Account or Password', (done) => {
			request(app)
				.post('/login')
				.send({ email: email, password: 'some wrong password' })
				.end((err, res) => {
					const { status, body } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', 'Invalid Account Or Password');
					done();
				});
		});
		test('Error Login Response with Status 400 - Error Email or Password Cannot Be Null', (done) => {
			request(app)
				.post('/login')
				.send({ email: '', password: '' })
				.end((err, res) => {
					const { status, body } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty(
						'message',
						'Email or Password Cannot be Empty'
					);
					done();
				});
		});
	});
});
