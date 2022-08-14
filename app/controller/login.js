'use strict';

const Controller = require('egg').Controller;
const loginRule = {
  username: {
    type: 'string',
    required: true,
    allowEmpty: false,
    message: '用户名长度3-10位，以字母、数字或下划线组成，不能以数字开头',
    format: /^[A-Za-z_][A-Za-z_0-9]{2,9}$/,
  },
  password: {
    type: 'string',
    required: true,
    allowEmpty: false,
    message: '密码长度为6-16位，以字母、数字组成',
    format: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
  },
  captcha: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};

/**
 * @Controller Login
 */
class LoginController extends Controller {
  /**
   * @description 登陆
   * @Router post /admin/v1/login
   * @Request body loginRequest
   */
  async index() {
    const { ctx } = this;
    try {
      ctx.validate(loginRule, ctx.request.body);
      await ctx.service.login.index(ctx.request.body);
      // 成功状态生成token
      const { username, password } = ctx.request.body;
      const body = {
        username,
        token: ctx.helper.setToken({ username, password }),
      };
      ctx.success(body);
    } catch (e) {
      if (e.errors) {
        // 参数校验
        ctx.error(e.errors);
      } else {
        // service层 抛出异常
        ctx.error(e.message);
      }
    }
  }
}

module.exports = LoginController;
