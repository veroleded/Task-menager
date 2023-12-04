import i18next from 'i18next';

const accessRightsCheck = (req, reply, next) => {
  const id = +req.params.id;
  const userId = req.user?.id;
  if (id !== userId) {
    req.flash('error', i18next.t('flash.accessRightErr'));
    reply.redirect('/users');
  } else {
    next();
  }
};

export default accessRightsCheck;
