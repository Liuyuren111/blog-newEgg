'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 加密后 6hv5ENZC/sjZyRIolbq77w==
    // ctx.helper.success(ctx.helper.encrypt(123));
    // 解密
    // ctx.helper.success(ctx.helper.decrypt('6hv5ENZC/sjZyRIolbq77w=='));
    // 测试token
    // const a = ctx.helper.setToken({ a: 1 });
    // ctx.helper.success(a);
    // 测试解密token
    const b = this.app.jwt.verify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoxLCJpYXQiOjE2NjAxMzcxMjgsImV4cCI6MTY2MDc0MTkyOH0._SmsOBsUa9urPwVuUHqYQIzsAsMnG4si3GrszdGucGQ',
      this.app.config.jwt.secret
    );
    ctx.helper.success(b);
  }
}

module.exports = HomeController;
