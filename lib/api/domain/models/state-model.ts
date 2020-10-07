/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Model, JSONSchema } from 'objection';
import { IState } from '../../../types/state';
import Constants from '../constants';

export class StateModel extends Model implements IState {
  id: string;
  abbreviation: string;
  name: string;
  code: string;
  
  static tableName = Constants.STATES_TABLE;

  static idColumn = 'id';

  static get jsonSchema(): JSONSchema {
    return {
      properties: {
        abbreviation: { type: 'string' },
        code: { type: 'string' },
        name: { type: 'string' },
      },
      required: ['name', 'code', 'abbreviation'],
      type: 'object',
    };
  }
}
