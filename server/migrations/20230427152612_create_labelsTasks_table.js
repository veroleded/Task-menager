
export const up = (knex) => (
  knex.schema.createTable('tasksLabels', (table) => {
    table.increments('id').primary();
    table.integer('task_id').references('id').inTable('tasks').onDelete('CASCADE');
    table.integer('label_id').references('id').inTable('labels').onDelete('CASCADE');
  })
);

export const down = (knex) => knex.schema.dropTable('tasksLabels');