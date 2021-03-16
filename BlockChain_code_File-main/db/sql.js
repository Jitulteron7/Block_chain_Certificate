const sequelize = require('sequelize');

const db = new sequelize(
    "test_6",
    "admin",
    "admin1234",
  {
    dialect: 'mysql',
    host: "oyesters-db-1.clcmspyxrtn3.ap-south-1.rds.amazonaws.com",
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



module.exports = { db };
