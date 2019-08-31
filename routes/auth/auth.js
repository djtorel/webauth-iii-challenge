const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { getUserBy, addUser } = require('../../data/models/usersModel');

router.post('/register', async (req, res) => {
  try {
    const userData = {
      ...req.body,
      password: await bcrypt.hashSync(req.body.password, 10),
    };
    res.status(201).json(await addUser(userData));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to create new user' });
  }
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Auth Router working' });
});

module.exports = router;
