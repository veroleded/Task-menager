import i18next from 'i18next';
import { ValidationError } from 'objection';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (req, reply) => {
      console.log(app.objection.models);
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel' }, (req, reply) => {
      const label = new app.objection.models.label();
      reply.render('labels/new', { label, error: {} });
      return reply;
    })
    .post('/labels', async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
        return reply;
      } catch (error) {
        if (error instanceof ValidationError) {
          req.flash('error', i18next.t('flash.labels.create.error'));
          reply.render('labels/new', { label, errors: error.data });
          return reply.code(422);
        }
        throw error;
      }
    })
    .delete('/labels/:id', { name: 'deleteLabel' }, async (req, reply) => {
      const { id } = req.params;
      try {
        await app.objection.models.label.query().delete().findById(id);
        req.flash('info', i18next.t('flash.labels.delete.success'));
        reply.redirect(app.reverse('labels'));
      } catch (err) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
        console.error(err);
      }
    })
    .get('/labels/:id/edit', { name: 'editLabel' }, async (req, reply) => {
      const { id } = req.params;
      const label = await app.objection.models.label.query().findById(id);
      reply.render('labels/edit', { label });
      return reply;
    })
    .patch('/labels/:id', { name: 'patchUpdateLabel' }, async (req, reply) => {
      try {
        const label = await app.objection.models.label.query().findById(req.params.id);
        await label.$query().patch(req.body.data);
        req.flash('success', i18next.t('flash.labels.edit.success'));
        reply.redirect(app.reverse('labels'));
        return reply;
      } catch (error) {
        if (error instanceof ValidationError) {
          req.flash('error', i18next.t('flash.labels.edit.error'));
          reply.render('labels/edit', {
            label: { ...req.body.data, id: req.params.id },
            errors: error.data,
          });
          return reply.code(422);
        }
        throw error;
      }
    });
};
