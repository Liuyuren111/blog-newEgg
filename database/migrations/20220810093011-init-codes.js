'use strict';

// 注册不对外开放
// 添加一个邀请码字段
module.exports = {
  // 在执行数据库升级时调用的函数，创建 codes 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('codes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      code: STRING(8), // 邀请码
      status: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 codes 表
  down: async queryInterface => {
    await queryInterface.dropTable('codes');
  },
};
