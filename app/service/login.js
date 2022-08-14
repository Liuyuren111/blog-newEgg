const Service = require('egg').Service;

class LoginService extends Service {
  async index(body) {
    // 解构参数
    const { username, password, captcha } = body;
    console.log(username, password, captcha, '-------------------');
    // 从session中取出验证码
    console.log(this.ctx.session, 'this.ctx.session');
    const { code } = this.ctx.session;
    console.log(code, 'code');
    const data = {};
    if (code === captcha) {
      // 验证账号密码是否匹配
      const pwd = this.ctx.helper.encrypt(password);
      console.log(pwd, '解密密码');
      const user = await this.ctx.model.User.findOne({
        where: {
          username,
          password: pwd,
        },
      });
      if (!user) throw new Error('用户名或密码错误');
      // 判断用户的禁用状态
      if (user.status === 0) throw new Error('用户已被禁用，请联系管理员');
      return data;
    }
    throw new Error('验证码错误');
  }
}

module.exports = LoginService;
