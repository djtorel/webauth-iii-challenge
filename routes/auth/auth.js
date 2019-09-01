const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { getUserBy, addUser } = require('../../data/models/usersModel');
const { jwtSecret } = require('../../config/secrets');

router.post('/register', async (req, res) => {
  try {
    const userData = {
      ...req.body,
      password: await bcrypt.hashSync(req.body.password, 10),
    };
    res.status(201).json(await addUser(userData));
  } catch (err) {
    res.status(500).json({ message: 'Unable to create new user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await getUserBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user);

      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Unable to login' });
  }
});

const genToken = ({ username }) => {
  const payload = {
    subject: 'user',
    username,
  };
  const secret = jwtSecret;
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;
