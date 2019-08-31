const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Users Router working' });
});

module.exports = router;
