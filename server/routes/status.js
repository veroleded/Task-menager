import i18next from 'i18next';
import { ValidationError } from 'objection';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();
      reply.render('status/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, async (req, reply) => {
      const status = new app.objection.models.status();
      reply.render('status/new', { status, errors: {} });
      return reply;
    })
    .post('/statuses', async (req, reply) => {
      const status = new app.objection.models.status();
      status.$set(req.body.data);

      try {
        // console.log(req.body.data);
        const validStatus = await app.objection.models.status.fromJson(req.body.data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.status.create.success'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      } catch (error) {
        if (error instanceof ValidationError) {
          req.flash('error', i18next.t('flash.status.create.error'));
          reply.render('status/new', { status, errors: error.data });
          return reply.code(422);
        }
        throw error;
      }
    })
    .delete('/statuses/:id', { name: 'deleteStatus' }, async (req, reply) => {
      const { id } = req.params;
      try {
        await app.objection.models.status.query().delete().where('id', '=', id);
        req.flash('info', i18next.t('flash.status.delete.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (err) {
        req.flash('error', i18next.t('flash.status.delete.error'));
        console.error(err);
      }
    })
    .get('/statuses/:id/edit', { name: 'statusEdit' }, async (req, reply) => {
      const { id } = req.params;
      const status = await app.objection.models.status.query().findById(id);
      reply.render('status/edit', { status });
      return reply;
    })
    .patch('/statuses/:id', { name: 'patchUpdateStatus' }, async (req, reply) => {
      try {
        const status = await app.objection.models.status.query().findById(req.params.id);
        await status.$query().patch(req.body.data);
        req.flash('success', i18next.t('flash.status.edit.success'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      } catch (error) {
        if (error instanceof ValidationError) {
          req.flash('error', i18next.t('flash.status.edit.error'));
          reply.render('status/edit', {
            status: { ...req.body.data, id: req.params.id },
            errors: error.data,
          });
          return reply.code(422);
        }
        throw error;
      }
    });
};
