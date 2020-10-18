import { Model } from 'objection';
import Knex from 'knex';

export function connectKnex(config: string | Knex.Config): Knex {
  const knex = Knex(config);
  Model.knex(knex);
  return knex;
}

export async function destroyKnex(knex: Knex): Promise<void> {
  await knex.destroy();
}

export * as Constants from './constants';
export * from './models/assistant-model';
export * from './models/class-model';
export * from './models/organization-member-model';
export * from './models/organization-model';
export * from './models/session-model';
export * from './models/state-model';
export * from './models/student-model';
export * from './models/user-model';

export * from './classes/user';
