/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Model, RelationMappings, JSONSchema } from 'objection';
import Constants from '../constants';

export class StudentModel extends Model {
  static tableName = Constants.STUDENTS_TABLE;

  static idColumn = 'id';

  static get jsonSchema(): JSONSchema {
    return {
      properties: {
        classId: { type: 'string' },
        studentId: { type: ['string'] },
      },
      required: ['studentId', 'classId'],
      type: 'object',
    };
  }

  static get relationMappings(): RelationMappings {
    // ts-expect-error
    const { UserModel } = require('./user-model');
    // ts-expect-error
    const { ClassModel } = require('./class-model');

    return {
      class: {
        join: {
          from: `${StudentModel.tableName}.classId`,
          to: `${ClassModel.tableName}.${ClassModel.idColumn}`,
        },
        modelClass: ClassModel,
        relation: Model.BelongsToOneRelation,
      },
      student: {
        join: {
          from: `${StudentModel.tableName}.studentId`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
        modelClass: UserModel,
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}
