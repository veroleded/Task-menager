// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (req, reply) => {
      console.log(await app.objection.models);
      const labels = await app.objection.models.label.query();
      reply.render('label/index', { labels });

      return reply;
    })

    .post('/labels', { preValidation: app.authenticate }, async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.label.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.label.create.error'));
        reply.render('label/new', { label, errors: data });
      }

      return reply;
    })

    .get('/labels/new', { preValidation: app.authenticate, name: 'newLabel' }, async (req, reply) => {
      const label = new app.objection.models.label();
      reply.render('label/new', { label });

      return reply;
    })

    .get('/labels/:id/edit', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      const label = await app.objection.models.label.query().findById(id);
      reply.render('label/edit', { label });
      return reply;
    })

    .patch('/labels/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      const label = new app.objection.models.label();
      label.$set(req.body.data);
      try {
        const validLabel = await app.objection.models.label.fromJson({ ...req.body.data });
        const Label = await app.objection.models.label.query().findById(id);
        await Label.$query().findById(id).patch(validLabel);
        req.flash('info', i18next.t('flash.label.edit.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        console.log(data);
        req.flash('error', i18next.t('flash.label.edit.error'));
        label.id = id;
        reply.render('label/edit', { label, errors: data });
      }

      return reply;
    })

    .delete('/labels/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const id = +req.params.id;
      try {
        await app.objection.models.label.query().findById(id).delete();
        req.flash('info', i18next.t('flash.label.delete.success'));
        reply.redirect(app.reverse('labels'));
      } catch (err) {
        console.log(err);
        req.flash('error', i18next.t('flash.label.delete.error'));
        reply.redirect(`/labels/${id}/edit`);
      }
    });
};
