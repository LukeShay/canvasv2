import { resolve } from 'path';
import { Chance } from 'chance';
import { connectKnex } from '..';

const seed = new Chance().natural();

export const chance = new Chance(seed);

console.log(`Chance Seed: ${seed}`);

export const knex = connectKnex({
  client: 'sqlite3',
  connection: {
    filename: resolve(__dirname, '../../test.sqlite3'),
  },
  useNullAsDefault: true,
});
