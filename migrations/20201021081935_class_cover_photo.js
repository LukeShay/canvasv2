const { Constants } = require('../utils');

exports.up = function (knex) {
  return knex.schema.table(Constants.CLASSES_TABLE, (table) => {
    table.string('coverPhoto').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table(Constants.CLASSES_TABLE, (table) => {
    table.dropColumn('coverPhoto');
  });
};
