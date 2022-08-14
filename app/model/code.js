'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Code = app.model.define('code', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    code: STRING(8), // 邀请码
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Code;
};

// username 回去表中找 _username
// 如果是 userName 回去表中找 user_name
