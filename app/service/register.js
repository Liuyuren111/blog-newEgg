const { Service } = require('egg');

class RegisterService extends Service {
  async index(body) {
    const { ctx } = this;
    // 获取前端参数
    const { username, password, code } = body;
    const hasCode = await ctx.model.Code.findOne({
      where: {
        code,
        status: 0,
      },
    });
    // 如果为null 验证码无效 被使用过或不存在
    if (hasCode) {
      // 判断是否有同名用户 用户名是唯一的
      const data = await ctx.model.User.findOne({
        where: {
          username,
        },
      });
      if (data) throw new Error('当前用户已存在');
      if (!data) {
        // 注册逻辑
        // 将明文密码直接存入数据库不安全 需要使用对称加密
        const pwd = this.ctx.helper.encrypt(password);
        const { id } = await ctx.model.User.create({
          username,
          password: pwd,
          code,
        });
        console.log('测试一-----------------');
        // 自动注册userInfo
        console.log(id, 'id');
        console.log(username, 'username');
        // const result = await ctx.model.UserInfo.create({
        //   user_id: id,
        //   nick_name: username,
        // });
        console.log('测试一-----------------');
        // console.log(result, 'result');
        // 注册成功后 将邀请码设置为已使用
        const user = await ctx.model.Code.findByPk(hasCode.id);
        if (!user) {
          ctx.status = 404;
          return;
        }
        user.update({ status: 1 });
      }
      return '注册成功';
    }
    throw new Error('验证码无效');
  }
}

module.exports = RegisterService;
