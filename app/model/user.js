'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30), // 用户名
    password: STRING(30), // 密码
    status: INTEGER,
    code: STRING(8), // 邀请码
    created_at: DATE,
    updated_at: DATE,
  });

  // 表关联
  // users表中的 userId 对应 userInfo 表中的 id
  User.associate = () => {
    app.model.User.belongsTo(app.model.UserInfo, {
      targetKey: 'user_id',
      foreignKey: 'id',
    });
  };

  return User;
};

// username 回去表中找 _username
// 如果是 userName 回去表中找 user_name
