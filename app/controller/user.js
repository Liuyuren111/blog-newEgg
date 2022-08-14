'use strict';

const Controller = require('egg').Controller;
const indexRule = {
  pageSize: 'string',
  pageNum: 'string',
  // 模糊查询
  key: {
    type: 'enum',
    values: [ 'username', 'code', 'status' ],
    required: false,
  },
  keywords: {
    type: 'string',
    required: false,
  },
};
const createRule = {
  username: 'string',
  password: 'string',
};
const updateRule = {
  password: {
    type: 'string',
    required: false,
  },
  status: {
    type: 'number',
    required: false,
  },
};
/**
 * @Controller User
 */
// 用户的增删改查
class UserController extends Controller {
  async index() {
    const { ctx } = this;
    try {
      ctx.validate(indexRule, ctx.request.query);
      const data = await ctx.service.user.index(ctx.request.query);
      ctx.success(data);
    } catch (e) {
      ctx.error(e);
    }
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const body = await ctx.service.user.show(id);
      ctx.success(body.data);
    } catch (e) {
      ctx.error(e);
    }
  }

  async create() {
    const { ctx } = this;
    try {
      ctx.validate(createRule, ctx.request.body);
      const status = await ctx.service.user.create(ctx.request.body);
      ctx.success(status);
    } catch (e) {
      ctx.error(e);
    }
  }

  async update() {
    const { ctx } = this;
    try {
      const { id } = ctx.params;
      ctx.validate(updateRule, ctx.request.body);
      const status = await ctx.service.user.update(id, ctx.request.body);
      ctx.helper.success(status);
    } catch (e) {
      ctx.error(e);
    }
  }

  async destroy() {
    const { ctx } = this;
    try {
      const { id } = ctx.params;
      const status = await ctx.service.user.destroy(id);
      ctx.success(status);
    } catch (e) {
      ctx.error(e);
    }
  }
}

module.exports = UserController;
