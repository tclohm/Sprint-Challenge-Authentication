const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-models.js');

const { jwtSecret } = require('../config/secrets.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  bcrypt.genSalt(10, function(err, salt) {
  	bcrypt.hash(user.password, salt, function(err, hash) {
  		if (err) {
  			res.status(500).json({ message: 'error with hashing' })
  		} else {
  			user.password = hash;
  			Users.add(user)
  				.then(user => {
  					res.status(201).json(user);
  				})
  				.catch(err => {
  					res.status(500).json(err);
  				});
  		}
  	});
  });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findBy({ username })
  	.first()
  	.then(user => {
  		if (user) {
  			bcrypt.compare(password, user.password).then(match => {
  				if (match) {
  					const token = signToken(user);
  					res.status(200).json({ token: token })
  				} else {
  					res.status(401).json({ message: 'Invalid Cred' });
  				}
  			})
  			.catch(err => {
  				res.status(500).json({ message: `${err}`});
  			})
  		} else {
  			res.status(400).json({ message: 'Could not find user' });
  		}
  	})
  	.catch(err => {
  		res.status(500).json({ message: 'Invalid Cred' });
  	})
});

function signToken(user) {
	const payload = {
		id: user.id
	};

	const options = {
		expiresIn: '4h'
	};

	return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;