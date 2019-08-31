const db = require('../dbConfig');

const usersTbl = () => db('users');
const userGetSelector = () => usersTbl().select('id', 'username');

const getUsers = () => userGetSelector();

const getUserBy = filter => userGetSelector().where(filter);

const getUserById = id => getUserBy({ id }).first();

const addUser = user =>
  usersTbl()
    .insert(user)
    .then(([id]) => getUserById(id));

module.exports = {
  getUsers,
  getUserBy,
  addUser,
};
