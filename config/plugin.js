'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  session: {
    enable: true,
    package: 'egg-session',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
