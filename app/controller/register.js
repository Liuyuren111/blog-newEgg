'use strict';

const Controller = require('egg').Controller;
const registerRule = {
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
  code: {
    type: 'string',
    required: true,
    allowEmpty: false,
    message: '邀请码长度为8位',
    format: /^[0-9]{1,8}$/,
  },
};

/**
 * @Controller Register
 */
class RegisterController extends Controller {
  /**
   * @description 注册
   * @Router post /admin/v1/register
   * @Request body registerRequest
   */
  async index() {
    const { ctx } = this;
    try {
      // 参数校验
      ctx.validate(registerRule, ctx.request.body);
      // service处理数据，连接Mysql
      const result = await ctx.service.register.index(ctx.request.body);
      ctx.success(result);
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

module.exports = RegisterController;
