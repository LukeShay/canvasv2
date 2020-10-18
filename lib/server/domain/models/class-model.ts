/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Model, RelationMappings, JSONSchema } from 'objection';
import Constants from '../constants';

export class ClassModel extends Model {
  static tableName = Constants.CLASSES_TABLE;

  static idColumn = 'id';

  static get jsonSchema(): JSONSchema {
    return {
      properties: {
        adminId: { type: 'string' },
        building: { type: ['string', 'null'] },
        code: { type: 'string' },
        description: { type: ['string', 'null'] },
        name: { type: 'string' },
        room: { type: ['string', 'null'] },
      },
      required: ['adminId', 'name', 'code'],
      type: 'object',
    };
  }

  static get relationMappings(): RelationMappings {
    const { UserModel } = require('./user-model');
    const { AssistantModel } = require('./assistant-model');
    const { StudentModel } = require('./student-model');

    return {
      admin: {
        join: {
          from: `${ClassModel.tableName}.adminId`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
        modelClass: UserModel,
        relation: Model.BelongsToOneRelation,
      },
      assistants: {
        join: {
          from: `${ClassModel.tableName}.${ClassModel.idColumn}`,
          through: {
            from: `${AssistantModel.tableName}.classId`,
            to: `${AssistantModel.tableName}.assistantId`,
          },
          to: `${UserModel.tableName}.${UserModel.tableName}`,
        },
        modelClass: UserModel,
        relation: Model.ManyToManyRelation,
      },
      students: {
        join: {
          from: `${ClassModel.tableName}.${ClassModel.idColumn}`,
          through: {
            from: `${StudentModel.tableName}.classId`,
            to: `${StudentModel.tableName}.studentId`,
          },
          to: `${UserModel.tableName}.${UserModel.tableName}`,
        },
        modelClass: UserModel,
        relation: Model.ManyToManyRelation,
      },
    };
  }
}
