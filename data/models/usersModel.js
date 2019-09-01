const db = require('../dbConfig');

const usersTbl = () => db('users');

const getUsers = () => usersTbl().select('id', 'username');

const getUserBy = filter => usersTbl().where(filter);

const getUserById = id =>
  getUserBy({ id })
    .select('id', 'username')
    .first();

const addUser = user =>
  usersTbl()
    .insert(user)
    .then(([id]) => getUserById(id));

module.exports = {
  getUsers,
  getUserBy,
  addUser,
};
