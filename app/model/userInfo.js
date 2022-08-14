'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const UserInfo = app.model.define('userinfo', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: INTEGER, // 对应users表的ID
    nick_name: STRING(30), // 用户昵称
    mobile: STRING,
    avatar: STRING, // 用户头像
    province_id: INTEGER, // 省ID
    city_id: INTEGER, // 市ID
    area_id: INTEGER, // 区ID
    role_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return UserInfo;
};

// username 回去表中找 _username
// 如果是 userName 回去表中找 user_name
