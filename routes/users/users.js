const router = require('express').Router();

const auth = require('../../middleware/auth-middleware');
const { getUsers } = require('../../data/models/usersModel');

router.get('/', auth, async (req, res) => {
  res.status(200).json(await getUsers());
});

module.exports = router;
