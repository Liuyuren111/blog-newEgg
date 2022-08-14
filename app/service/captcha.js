const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class CaptchaService extends Service {
  async index() {
    const { ctx } = this;
    // 这些参数可以根据前端传递参数改变
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      fontSize: 50, // 验证码文字大小
      ignoreChars: 'IiOo1', // 禁用
      // ignoreChars: '0oO1ilI', // 验证码字符中排除内容 0o1i
      width: 100, // 验证码图片宽度
      height: 40, // 验证码图片高度
      noise: 4, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#FFF', // 验证码图片背景颜色
    });
    // 将其存入session 用来验证
    ctx.session.code = captcha.text.toLowerCase();
    // 调试验证码
    console.log(ctx.session.code);
    // 设置时效
    ctx.session.maxAge = 1000 * 60 * 10;
    return captcha.data;
  }
}

module.exports = CaptchaService;
