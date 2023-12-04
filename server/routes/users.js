// @ts-check

import i18next from 'i18next';
import accessRightsCheck from '../middlewares/accessRightsCheck.js';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })

    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })

    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })

    .get(
      '/users/:id/edit',
      { preValidate: app.authenticate, preHandler: accessRightsCheck },
      async (req, reply) => {
        const id = +req.params.id;
        const user = await app.objection.models.user.query().findById(id);
        reply.render('users/edit', { user });
        return reply;
      },
    )

    .patch(
      '/users/:id',
      { preValidate: app.authenticate, preHandler: accessRightsCheck },
      async (req, reply) => {
        const id = +req.params.id;
        const user = new app.objection.models.user();
        user.$set(req.body.data);
        try {
          const validUser = await app.objection.models.user.fromJson({ ...req.body.data });
          const User = await app.objection.models.user.query().findById(id);
          await User.$query().findById(id).patch(validUser);
          req.flash('info', i18next.t('flash.users.edit.success'));
          reply.redirect(app.reverse('users'));
        } catch ({ data }) {
          console.log(data);
          req.flash('error', i18next.t('flash.users.edit.error'));
          user.id = id;
          reply.render('users/edit', { user, errors: data });
        }

        return reply;
      },
    )

    .delete(
      '/users/:id',
      { preValidate: app.authenticate, preHandler: accessRightsCheck },
      async (req, reply) => {
        const id = +req.params.id;
        try {
          await app.objection.models.user.query().findById(id).delete();
          req.flash('info', i18next.t('flash.users.delete.success'));
          req.logout();
          reply.redirect(app.reverse('users'));
        } catch (err) {
          req.flash('error', i18next.t('flash.users.delete.error'));
          reply.redirect(`/users/${id}/edit`);
        }
      },
    );
};
