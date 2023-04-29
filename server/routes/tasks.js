import i18next from 'i18next';
import { ValidationError } from 'objection';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      // const tasks = await app.objection.models.task.query();
      const notFullTasks = await app.objection.models.task
        .query()
        .joinRelated('[creator, executor, status]')
        .select(
          'tasks.*',
          'creator.firstName as creator_firstName',
          'creator.lastName as creator_lastName',
          'executor.firstName as executor_firstName',
          'executor.lastName as executor_lastName',
          'status.name as status',
        );
      const tasks = notFullTasks.map((task) => {
        const creator = `${task.creatorFirstName} ${task.creatorLastName}`;
        const executor = `${task.executorFirstName} ${task.executorLastName}`;
        return { ...task, creator, executor };
      });

      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get(
      '/tasks/new',
      { name: 'newTasks', preValidation: app.authenticate },
      async (req, reply) => {
        const tasks = new app.objection.models.task();
        const statuses = await app.objection.models.status.query();
        const users = await app.objection.models.user.query();
        const labels = await app.objection.models.label.query();
        console.log(tasks);
        reply.render('tasks/new', {
          tasks,
          errors: {},
          statuses,
          users,
          labels,
        });
        return reply;
      },
    )
    .get(
      '/tasks/:id',
      { name: 'taskInfo', preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;
        const task = await app.objection.models.task
          .query()
          .findById(Number(id))
          .joinRelated('[creator, executor, status]')
          .select(
            'tasks.*',
            'creator.firstName as creator_firstName',
            'creator.lastName as creator_lastName',
            'executor.firstName as executor_firstName',
            'executor.lastName as executor_lastName',
            'status.name as status',
          );
        const labels = await app.objection.models.label.query()
          .joinRelated('tasks')
          .where('tasks.id', '=', task.id);

        task.creator = `${task.creatorFirstName} ${task.creatorLastName}`;
        task.executor = `${task.executorFirstName} ${task.executorLastName}`;
        task.labels = labels.map((label) => label.name);

        reply.render('tasks/info', { task });
        return reply;
      },
    )
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const {
        name,
        description,
        statusId,
        executorId,
        labels,
      } = req.body.data;
      const creatorId = req.user.id;

      try {
        const validTask = await app.objection.models.task.fromJson({
          name,
          description,
          statusId: parseInt(statusId, 10),
          creatorId,
          executorId: parseInt(executorId, 10),
        });
        const task = await app.objection.models.task.query().insertAndFetch(validTask);

        if (labels) {
          const labelIds = [labels].flat().map((id) => parseInt(id, 10));

          labelIds.forEach(async (labelId) => {
            await app.objection.models.task.relatedQuery('labels')
              .for(task)
              .relate(labelId);
          });
        }

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));

        return reply;
      } catch (error) {
        if (error instanceof ValidationError) {
          req.flash('error', i18next.t('flash.tasks.create.error'));
          const task = new app.objection.models.task().$set(req.body.data);
          const [users, statuses, labelList] = await Promise.all([
            app.objection.models.user.query(),
            app.objection.models.status.query(),
            app.objection.models.label.query(),
          ]);
          reply.render('/tasks/new', {
            task,
            users,
            statuses,
            labels: labelList,
            errors: error.data,
          });
          return reply.code(422);
        }
        throw error;
      }
    });
};
