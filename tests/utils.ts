/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import { resolve } from 'path';
import Knex from 'knex';
import { Model, transaction, Transaction } from 'objection';
import moment from 'moment';
import { v4 } from 'uuid';
import { connectKnex, UserModel } from '../lib/server';
import { chance } from '../setup-tests';
import { IUser, OptionalPromise, UserRole } from '../lib/types';

export function generateIUser(): IUser {
  const stateId = v4();
  return {
    email: chance.email(),
    firstName: chance.last(),
    id: v4(),
    lastName: chance.first(),
    password: chance.string({
      alpha: true,
      length: 10,
      numeric: true,
      symbols: true,
    }),
    role: UserRole.BASIC,
    address1: chance.address(),
    address2: `#${chance.integer({ max: 100, min: 0 })}`,
    city: chance.city(),
    createdAt: moment.utc().format('YYYY-MM-DD HH:MM:SS'),
    updatedAt: moment.utc().format('YYYY-MM-DD HH:MM:SS'),
    stateId,
    zip: chance.zip(),
    state: {
      id: stateId,
      abbreviation: chance.string({ length: 2 }),
      code: chance.string({ length: 4 }),
      name: chance.string(),
    },
  };
}

export async function insertTestUser(): OptionalPromise<UserModel> {
  const user = generateIUser();
  delete user.state;
  delete user.stateId;

  try {
    return await UserModel.query().insertAndFetch(user).execute();
  } catch (error) {
    return null;
  }
}

export function setupTransactionalDatabase(): void {
  let trx: Transaction;
  let knex: Knex;

  beforeAll(() => {
    knex = connectKnex({
      client: 'sqlite3',
      connection: {
        filename: resolve(__dirname, '../test.sqlite3'),
      },
      useNullAsDefault: true,
    });
  });

  afterAll(() => {
    knex.destroy();
  });

  beforeEach(async () => {
    trx = await transaction.start(knex);
    Model.knex(trx);
  });

  afterEach(async () => {
    await trx.rollback();
    Model.knex(knex);
  });
}
