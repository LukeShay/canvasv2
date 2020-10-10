const { v4 } = require('uuid');
const { Constants } = require('../utils');

exports.seed = function (knex) {
  return knex(Constants.USERS_TABLE)
    .del()
    .then(function () {
      return knex(Constants.USERS_TABLE).insert([
        {
          id: v4(),
          email: process.env.ADMIN_EMAIL,
          firstName: 'Master',
          lastName: 'Admin',
          password: process.env.ADMIN_PASSWORD,
          role: 'ADMIN',
        },
      ]);
    });
};
