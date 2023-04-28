// import i18next from 'i18next';
// import { ValidationError } from 'objection';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const tasks = await app.objection.models.task.query();
      console.log(req);
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTasks', preValidation: app.authenticate }, (req, reply) => {
      const tasks = new app.objection.models.task();
      console.log(tasks);
      // reply.render('task/new', { tasks, errors: {} });
      return reply;
    });
};
