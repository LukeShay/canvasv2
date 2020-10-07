const Constants = {
  ASSISTANTS_TABLE: 'Assistants',
  CLASSES_TABLE: 'Classes',
  ORGANIZATION_MEMBERS_TABLE: 'OrganizationMembers',
  ORGANIZATIONS_TABLE: 'Organizations',
  SESSIONS_TABLE: 'Sessions',
  STATES_TABLE: 'States',
  STUDENTS_TABLE: 'Students',
  USERS_TABLE: 'Users',
};

function addCommonColumns(knex, table) {
  table.uuid('id').primary().index();
  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updatedAt').nullable().defaultTo(knex.fn.now());
}

module.exports = { Constants, addCommonColumns };
