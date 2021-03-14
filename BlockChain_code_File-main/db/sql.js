const sequelize = require('sequelize');

const db = new sequelize(
    process.env.db_schema,
    process.env.db_admin,
    process.env.db_pass,
  {
    dialect: 'mysql',
    host: process.env.db_host,
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 1000000,
    },
    dialectOptions: {
      // useUTC: true, //for reading from database
      connectTimeout: 60000,
      dateStrings: true,
      typeCast: true,
      timezone: '+05:30',
      multipleStatements: true,
    },
   
    timezone: '+05:30', //for writing to database
    operatorsAliases: false,
  }
);

db.authenticate()
  .then(() => {
    console.log('database connected successfully');
  })
  .catch((e) => {
    console.log('ERROR DATABASE NOT CONNECTED',e);
  });

module.exports = { db };
