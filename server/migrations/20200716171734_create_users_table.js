// @ts-check

// import { first } from "lodash";

export const up = (knex) => (
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.string('password_digest');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
);

export const down = (knex) => knex.schema.dropTable('users');
