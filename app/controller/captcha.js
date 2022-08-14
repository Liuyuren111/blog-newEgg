const Controller = require('egg').Controller;

/**
 * @Controller Captcha
 */
class CaptchaController extends Controller {
  /**
   * @description 验证码
   * @Router get /admin/v1/captcha
   */
  async index() {
    const { ctx } = this;
    const captcha = await ctx.service.captcha.index();
    ctx.response.type = 'image/svg+xml';
    ctx.success(captcha);
  }
}

module.exports = CaptchaController;
