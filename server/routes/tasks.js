// @ts-check

import i18next from 'i18next';
import { raw } from 'objection';
import Task from '../models/Task.cjs';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasksModels = await app.objection.models.task
        .query()
        .withGraphJoined('[creator, executor, status]')
        .modify();
      const tasks = await Promise.all(tasksModels.map(async (task) => {
        const creator = `${task.creator.firstName} ${task.creator.lastName}`;
        const executor = `${task.executor?.firstName ?? '??'} ${task.executor?.lastName ?? '??'}`;
        const status = task.status.name;
        return {
          ...task,
          creator,
          executor,
          status,
        };
      }));

      console.log(tasks);
      reply.render('task/index', { tasks });

      return reply;
    })

    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const usersFull = await app.objection.models.user.query().select('id', 'firstName', 'lastName');
      const users = usersFull.map((user) => ({ id: user.id, name: `${user.firstName} ${user.lastName}` }));
      const labels = await app.objection.models.label.query();
      const statuses = await app.objection.models.statuses.query();
      reply.render('task/new', {
        task,
        users,
        labels,
        statuses,
      });
      return reply;
    })

    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const creatorId = req.user.id;

      // eslint-disable-next-line object-curly-newline
      const { labels, name, description, statusId, executorId } = req.body.data;
      const labelsIds = labels.map((idStr) => +idStr);

      const taskValues = new app.objection.models.task();

      taskValues.$set({
        name,
        description,
        statusId: +statusId === 0 ? undefined : +statusId,
        executorId: +executorId === 0 ? creatorId : +executorId,
        creatorId: +creatorId,
      });

      try {
        const validTask = await app.objection.models.task.fromJson(taskValues);
        // await transaction(Task, async (Task) => {
        const task = await Task.query().insertAndFetch(validTask);
        console.log(task);
        labelsIds.forEach(async (id) => {
          await task.$relatedQuery('tasksLabels').relate(id);
          // });
        });

        req.flash('info', i18next.t('flash.task.create.success'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      } catch (err) {
        console.log(err);
        const [usersFull, statuses, labelList] = await Promise.all([
          app.objection.models.user.query().select('id', 'firstName', 'lastName'),
          app.objection.models.statuses.query(),
          app.objection.models.label.query(),
        ]);
        const users = usersFull.map((user) => ({ id: user.id, name: `${user.firstName} ${user.lastName}` }));

        req.flash('error', i18next.t('flash.task.create.error'));
        reply.render('task/new', {
          task: taskValues,
          users,
          labels: labelList,
          statuses,
          errors: err.data,
        });
      }

      return reply;
    });
};
