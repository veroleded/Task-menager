// import i18next from 'i18next';
// import { ValidationError } from 'objection';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      console.log(await app.objection.models);
      const tasks = await app.objection.models.task.query();
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTasks' }, (req, reply) => {
      const tasks = new app.objection.models.task();
      console.log(tasks);
      // reply.render('task/new', { tasks, errors: {} });
      return reply;
    });
};
