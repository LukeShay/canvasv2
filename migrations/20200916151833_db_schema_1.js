const { Constants, addCommonColumns } = require('../utils');

exports.up = function (knex) {
  return knex.schema
    .createTable(Constants.STATES_TABLE, (table) => {
      addCommonColumns(knex, table);

      table.string('code').notNullable().unique();
      table.string('name').notNullable().unique();
      table.string('abbreviation').notNullable().unique();
    })
    .createTable(Constants.USERS_TABLE, (table) => {
      addCommonColumns(knex, table);

      table.string('email').unique().notNullable().index();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('password').notNullable();
      table.string('address1').nullable();
      table.string('address2').nullable();
      table.string('city').nullable();
      table.string('stateId').nullable().references('id').inTable(Constants.STATES_TABLE);
      table.string('zip').nullable();
      table.string('role').nullable().defaultTo('BASIC');
    })
    .createTable(Constants.CLASSES_TABLE, (table) => {
      addCommonColumns(knex, table);

      table.uuid('adminId').notNullable().references('id').inTable(Constants.USERS_TABLE).index();
      table.string('name').notNullable();
      table.string('code').notNullable();
      table.string('description').nullable();
      table.string('building').nullable();
      table.string('room').nullable();
    })
    .createTable(Constants.STUDENTS_TABLE, (table) => {
      addCommonColumns(knex, table);

      table
        .uuid('studentId')
        .notNullable()
        .references('id')
        .inTable(Constants.USERS_TABLE)
        .onDelete('CASCADE');
      table
        .uuid('classId')
        .notNullable()
        .references('id')
        .inTable(Constants.CLASSES_TABLE)
        .onDelete('CASCADE');
    })
    .createTable(Constants.ASSISTANTS_TABLE, (table) => {
      addCommonColumns(knex, table);

      table
        .uuid('assistantId')
        .notNullable()
        .references('id')
        .inTable(Constants.USERS_TABLE)
        .onDelete('CASCADE');
      table
        .uuid('classId')
        .notNullable()
        .references('id')
        .inTable(Constants.CLASSES_TABLE)
        .onDelete('CASCADE');
    })
    .createTable(Constants.SESSIONS_TABLE, (table) => {
      addCommonColumns(knex, table);

      table
        .uuid('userId')
        .notNullable()
        .references('id')
        .inTable(Constants.USERS_TABLE)
        .onDelete('CASCADE');
      table.string('device').notNullable();
      table.timestamp('expires').notNullable();
    })
    .createTable(Constants.ORGANIZATIONS_TABLE, (table) => {
      addCommonColumns(knex, table);

      table.string('address1').notNullable();
      table.string('address2').nullable();
      table.string('city').notNullable();
      table.string('stateId').notNullable().references('id').inTable(Constants.STATES_TABLE);
      table.string('zip').notNullable();
      table.string('name').notNullable();
      table.string('website').notNullable();
      table.string('phoneNumber').notNullable();
    })
    .createTable(Constants.ORGANIZATION_MEMBERS_TABLE, (table) => {
      addCommonColumns(knex, table);

      table
        .uuid('userId')
        .notNullable()
        .references('id')
        .inTable(Constants.USERS_TABLE)
        .onDelete('CASCADE');
      table
        .uuid('organizationId')
        .notNullable()
        .references('id')
        .inTable(Constants.ORGANIZATIONS_TABLE)
        .onDelete('CASCADE');
      table.string('role').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists(Constants.ASSISTANTS_TABLE)
    .dropTableIfExists(Constants.CLASSES_TABLE)
    .dropTableIfExists(Constants.ORGANIZATION_MEMBERS_TABLE)
    .dropTableIfExists(Constants.ORGANIZATIONS_TABLE)
    .dropTableIfExists(Constants.SESSIONS_TABLE)
    .dropTableIfExists(Constants.STATES_TABLE)
    .dropTableIfExists(Constants.STUDENTS_TABLE)
    .dropTableIfExists(Constants.USERS_TABLE);
};
