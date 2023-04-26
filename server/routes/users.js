// @ts-check

import i18next from 'i18next';
import { ValidationError } from 'objection';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      // console.log(req);
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
        // console.log(req.body.data);
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
        return reply;
      } catch (error) {
        if (error instanceof ValidationError) {
          req.flash('error', i18next.t('flash.users.create.error'));
          reply.render('users/new', { user, errors: error.data });
          return reply.code(422);
        }
        throw error;
      }
    })
    .get('/users/:id/edit', { name: 'userEdit' }, async (req, reply) => {
      const { id } = req.params;
      if (req.user?.id !== parseInt(req.params.id, 10)) {
        req.flash('error', i18next.t('flash.users.authError'));
        reply.redirect('/users');
        reply.code(401);
      } else {
        const user = await app.objection.models.user.query().findById(id);
        // const user = new app.objection.models.user();
        // console.log(user);
        reply.render('users/edit', { user });
      }
      return reply;
    })
    .delete('/users/:id', { name: 'userDelete' }, async (req, reply) => {
      const { id } = req.params;
      if (req.user?.id !== parseInt(req.params.id, 10)) {
        req.flash('error', i18next.t('flash.users.authError'));
        reply.redirect('/users');
        reply.code(401);
      } else {
        try {
          await app.objection.models.user.query().delete().where('id', '=', id);
          req.flash('info', i18next.t('flash.users.delete.success'));
          reply.redirect(app.reverse('root'));
        } catch (err) {
          req.flash('error', i18next.t('flash.users.delete.error'));
          console.error(err);
        }
      }
    })
    .patch(
      '/users/:id',
      { name: 'patchUpdateUser' },
      async (req, reply) => {
        const { id } = req.params;
        try {
          const user = await app.objection.models.user.query().findById(id);
          await user.$query().patch(req.body.data);
          req.flash('info', i18next.t('flash.users.edit.success'));
          reply.redirect(app.reverse('users'));
          return reply;
        } catch (error) {
          if (error instanceof ValidationError) {
            req.flash('error', i18next.t('flash.users.edit.error'));
            const user = (new app.objection.models.user())
              .$set({ ...req.body.data, id: req.params.id });
            reply.render('users/edit', {
              user,
              errors: error.data,
            });
            return reply.code(422);
          }
          throw error;
        }
      },
    );
};
