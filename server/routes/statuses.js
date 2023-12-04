// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      const statuses = await app.objection.models.statuses.query();
      reply.render('statuses/index', { statuses });

      return reply;
    })

    .post('/statuses', { preValidation: app.authenticate }, async (req, reply) => {
      const status = new app.objection.models.statuses();
      status.$set(req.body.data);

      try {
        const validStatus = await app.objection.models.statuses.fromJson(req.body.data);
        await app.objection.models.statuses.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status, errors: data });
      }

      return reply;
    })

    .get('/statuses/new', { preValidation: app.authenticate, name: 'newStatus' }, async (req, reply) => {
      const status = new app.objection.models.statuses();
      reply.render('statuses/new', { status });

      return reply;
    })

    .get('/statuses/:id/edit', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      const status = await app.objection.models.statuses.query().findById(id);
      reply.render('statuses/edit', { status });
      return reply;
    })

    .patch('/statuses/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      const status = new app.objection.models.statuses();
      status.$set(req.body.data);
      try {
        const validStatus = await app.objection.models.statuses.fromJson({ ...req.body.data });
        const Status = await app.objection.models.statuses.query().findById(id);
        await Status.$query().findById(id).patch(validStatus);
        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        console.log(data);
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        status.id = id;
        reply.render('statuses/edit', { status, errors: data });
      }

      return reply;
    })

    .delete('/statuses/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      try {
        await app.objection.models.statuses.query().findById(id).delete();
        req.flash('info', i18next.t('flash.statuses.delete.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (err) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.redirect(`/statuses/${id}/edit`);
      }
    });
};
