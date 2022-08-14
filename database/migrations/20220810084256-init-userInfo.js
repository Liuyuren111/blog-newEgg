'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 userinfo 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('userinfo', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER, // 对应users表的ID
      nick_name: STRING(30), // 用户昵称
      mobile: {
        type: STRING,
        unique: true, // 唯一的
      },
      avatar: STRING, // 用户头像
      province_id: INTEGER, // 省ID
      city_id: INTEGER, // 市ID
      area_id: INTEGER, // 区ID
      role_id: {
        type: INTEGER,
        defaultValue: 2, // 默认值是2，关联后面的权限表
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 userinfo 表
  down: async queryInterface => {
    await queryInterface.dropTable('userinfo');
  },
};
