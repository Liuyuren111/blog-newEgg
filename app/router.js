'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/admin/v1/register', controller.register.index);
  router.post('/admin/v1/login', controller.login.index);
  router.get('/admin/v1/captcha', controller.captcha.index);
  router.post('/admin/upload/img', controller.upload.uploadImg);

  router.resources('user', '/admin/user', controller.user);
};
