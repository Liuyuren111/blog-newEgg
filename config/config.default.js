/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const CryptoJS = require('crypto-js');
const path = require('path');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660120444930_5567';

  // add your middleware config here
  // 中间件
  config.middleware = [ 'tokenHandler' ];
  // 配置tokenHandler
  config.tokenHandler = {
    // 需要权限控制的路由地址
    match(ctx) { // match：匹配的路由地址
      const url = ctx.request.url;
      if (
        url.startsWith('/') ||
        url.startsWith('/admin/v1/captcha') ||
        url.startsWith('/admin/v1/login') ||
        url.startsWith('/admin/v1/register')
      ) {
        return false;
      }
      return true;
    }, // match 匹配
    // ignore：忽略的路由地址
  };

  // 数据据配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'blog-home',
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: { // 但是egg-sequelize在读取时间时，还是会返回UTC格式，还需要改一下配置
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };
  config.cors = {
    origin: 'http://127.0.0.1:3000', // 允许跨域的 ip
    credentials: true, // credentials设置为true,和前端保持一致
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // 安全验证 enable关闭
  config.security = {
    csrf: {
      enable: false,
      // ignoreJSON: true,
    },
    // domainWhiteList: [ 'http://127.0.0.1' ],
  };

  // 密钥
  config.KEY = CryptoJS.enc.Utf8.parse('1dsajio123890sdasdfx'); // 20位
  config.IV = CryptoJS.enc.Utf8.parse('sadf098123jiosda');

  // token密钥
  config.jwt = {
    secret: '123456',
  };

  // swaggerdoc
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'blog',
      description: 'blog',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true,
  };

  // 静态文件
  config.static = {
    prefix: '/public',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件
    preload: false,
    maxAge: 30000000,
    buffer: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
