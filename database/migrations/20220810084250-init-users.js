'use strict';

// 注册不对外开放
// 添加一个邀请码字段
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: {
        type: STRING(30),
        unique: true, // 唯一的
      }, // 用户名
      password: STRING(30), // 密码
      status: { // 启用状态
        type: INTEGER,
        defaultValue: 1, // 默认值是1。1-启用、2-禁用
      },
      code: STRING(8), // 邀请码
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
