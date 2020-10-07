/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Model, RelationMappings, JSONSchema } from 'objection';
import Constants from '../constants';

export class OrganizationModel extends Model {
  static tableName = Constants.ASSISTANTS_TABLE;

  static idColumn = 'id';

  static get jsonSchema(): JSONSchema {
    return {
      properties: {
        addresss1: { type: 'string' },
        addresss2: { type: ['string', 'null'] },
        city: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        phoneNumber: { type: 'string' },
        stateId: { type: 'string' },
        website: { type: 'string' },
        zip: { type: 'string' },
      },
      required: ['address1', 'city', 'email', 'name', 'phoneNumber', 'stateId', 'website', 'zip'],
      type: 'object',
    };
  }

  static get relationMappings(): RelationMappings {
    // ts-expect-error
    const { StateModel } = require('./state-model');

    return {
      state: {
        join: {
          from: `${OrganizationModel.tableName}.stateId`,
          to: `${StateModel.tableName}.${StateModel.idColumn}`,
        },
        modelClass: StateModel,
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}
