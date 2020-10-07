/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Model, JSONSchema, RelationMappings } from 'objection';
import Constants from '../constants';

export class SessionModel extends Model {
  static tableName = Constants.SESSIONS_TABLE;

  static idColumn = 'id';

  static get jsonSchema(): JSONSchema {
    return {
      properties: {
        device: { type: 'string' },
        expires: { type: 'date' },
        userId: { type: 'string' },
      },
      required: ['device', 'userId', 'expires'],
      type: 'object',
    };
  }

  static get relationMappings(): RelationMappings {
    // ts-expect-error
    const { UserModel } = require('./user-model');

    return {
      user: {
        join: {
          from: `${SessionModel.tableName}.userId`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
        modelClass: UserModel,
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}
