/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import { resolve } from 'path';
import Knex from 'knex';
import { Model, transaction, Transaction } from 'objection';
import { v4 } from 'uuid';
import { connectKnex, UserModel } from '../lib/server';
import { chance } from '../setup-tests';
import { OptionalPromise } from '../lib/types';

export async function insertTestUser(): OptionalPromise<UserModel> {
  try {
    return await UserModel.query()
      .insertAndFetch({
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
      })
      .execute();
  } catch (error) {
    console.error(error);
    console.error(error.message);
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
