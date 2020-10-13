/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Model, JSONSchema, RelationMappings } from 'objection';
import Constants from '../constants';

export class OrganizationMemberModel extends Model {
  static tableName = Constants.ASSISTANTS_TABLE;

  static idColumn = 'id';

  static get jsonSchema(): JSONSchema {
    return {
      properties: {
        organizationId: { type: 'string' },
        role: { type: 'string' },
        userId: { type: 'string' },
      },
      required: ['organizationId', 'role', 'userId'],
      type: 'object',
    };
  }

  static get relationMappings(): RelationMappings {
    // ts-expect-error
    const { UserModel } = require('./user-model');
    // ts-expect-error
    const { OrganizationModel } = require('./organization-model');

    return {
      organization: {
        join: {
          from: `${OrganizationMemberModel.tableName}.organizationId`,
          to: `${OrganizationModel.tableName}.${OrganizationModel.idColumn}`,
        },
        modelClass: OrganizationModel,
        relation: Model.BelongsToOneRelation,
      },
      user: {
        join: {
          from: `${OrganizationMemberModel.tableName}.userId`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
        modelClass: UserModel,
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}
