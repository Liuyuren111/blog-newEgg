'use strict';

module.exports = {
  // 处理200
  success(data, status = 200, msg = '成功') {
    this.status = status; // RESTful API的响应状态
    this.body = {
      data,
      code: status,
      msg,
    };
  },
  // 处理错误
  error(data, status = 500, msg = '失败') {
    this.status = status; // RESTful API的响应状态
    this.body = {
      data,
      code: status,
      msg,
    };
  },
};
