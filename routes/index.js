const router = require('express').Router();

const authRoutes = require('./auth/auth');
const userRoutes = require('./users/users');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
