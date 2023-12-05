// @ts-check

import i18next from 'i18next';
import { raw } from 'objection';
import Task from '../models/Task.cjs';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const { query } = req;

      const tasksQuery = app.objection.models.task
        .query()
        .withGraphJoined('[creator, executor, status, tasksLabels]');

      if (query.executor && query.executor !== '') {
        tasksQuery.modify('filterExecutor', Number(query.executor));
      }

      if (query.status && query.status !== '') {
        tasksQuery.modify('filterStatus', Number(query.status));
      }

      if (query.isCreatorUser) {
        tasksQuery.modify('filterCreator', req.user.id);
      }

      const [tasksNotNorm, executors, statuses, labels] = await Promise.all([
        tasksQuery,
        await app.objection.models.user
          .query()
          .select(raw('id, "first_name" || \' \' || "last_name" as name')),
        await app.objection.models.statuses.query(),
        await app.objection.models.label.query(),
      ]);
      const noFilterTasks = await Promise.all(
        tasksNotNorm.map(async (task) => {
          const creator = `${task.creator.firstName} ${task.creator.lastName}`;
          const executor = `${task.executor.firstName} ${task.executor.lastName}`;
          const status = task.status.name;
          const label = task.tasksLabels;
          return {
            ...task,
            creator,
            executor,
            status,
            label,
          };
        }),
      );
      let tasks = noFilterTasks;
      if (query.label && query.label !== '') {
        tasks = noFilterTasks
          .filter(({ tasksLabels }) => tasksLabels.some((tl) => tl.id === Number(query.label)));
      }
      reply.render('task/index', { tasks, executors, statuses, labels });

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
      const labelsIds = [labels].flat().map((idStr) => +idStr);

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
    })

    .get('/tasks/:id/edit', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      const task = await app.objection.models.task
        .query()
        .findById(id)
        .withGraphJoined('[creator, status, executor]');
      const selectedLabels = task.$relatedQuery('tasksLabels');
      const usersFull = await app.objection.models.user.query().select('id', 'firstName', 'lastName');
      const users = usersFull.map((user) => ({ id: user.id, name: `${user.firstName} ${user.lastName}` }));
      const labels = await app.objection.models.label.query();
      const statuses = await app.objection.models.statuses.query();
      reply.render('task/edit', {
        task,
        users,
        labels,
        statuses,
        selectedLabels,
      });
      return reply;
    })

    .patch('/tasks/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      const task = await app.objection.models.task.query().findById(id);
      const { labels, name, description, statusId, executorId } = req.body.data;
      const labelsIds = [labels].flat().map((idStr) => +idStr);

      const taskValues = new app.objection.models.task();

      taskValues.$set({
        name,
        description,
        statusId: +statusId === 0 ? undefined : +statusId,
        executorId: +executorId === 0 ? undefined : +executorId,
        creatorId: task.creatorId,
      });

      try {
        const validTask = await app.objection.models.task.fromJson(taskValues);
        // await transaction(Task, async (Task) => {
        await task.$query().updateAndFetch(validTask);
        await task.$relatedQuery('tasksLabels').unrelate().where('taskId', '=', task.id);
        labelsIds.forEach(async (labelId) => {
          await task.$relatedQuery('tasksLabels').relate(labelId);
          // });
        });
        console.log(task);
        req.flash('info', i18next.t('flash.task.edit.success'));
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

        req.flash('error', i18next.t('flash.task.edit.error'));
        reply.render('task/edit', {
          task: { ...taskValues, id },
          users,
          labels: labelList,
          statuses,
          errors: err.data,
        });
      }

      return reply;
    })

    .delete('/tasks/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      try {
        const task = await app.objection.models.task.query().findById(id);
        await task.$relatedQuery('tasksLabels').unrelate().where('taskId', '=', task.id);
        await task.$query().delete();
        req.flash('info', i18next.t('flash.task.delete.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (err) {
        console.log(err);
        req.flash('error', i18next.t('flash.task.delete.error'));
        reply.redirect(`/task/${id}/edit`);
      }
    });
};
