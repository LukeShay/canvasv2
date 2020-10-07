/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Model, RelationMappings, JSONSchema } from 'objection';
import Constants from '../constants';

export class AssistantModel extends Model {
  static tableName = Constants.ASSISTANTS_TABLE;

  static idColumn = 'id';

  static get jsonSchema(): JSONSchema {
    return {
      properties: {
        assistantId: { type: 'string' },
        classId: { type: 'string' },
      },
      required: ['assistantId', 'classId'],
      type: 'object',
    };
  }

  static get relationMappings(): RelationMappings {
    // ts-expect-error
    const { UserModel } = require('./user-model');
    // ts-expect-error
    const { ClassModel } = require('./class-model');

    return {
      assistant: {
        join: {
          from: `${AssistantModel.tableName}.assistantId`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
        modelClass: UserModel,
        relation: Model.BelongsToOneRelation,
      },
      class: {
        join: {
          from: `${AssistantModel.tableName}.classId`,
          to: `${ClassModel.tableName}.${ClassModel.idColumn}`,
        },
        modelClass: ClassModel,
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}
