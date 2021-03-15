
const { DataTypes } = require('sequelize');
const {db}=require("../db/sql");
const moment =require("moment")
const Email = db.define('email_table', {
  send_id: {
    type: DataTypes.INTEGER(255),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  send_count: {
    type: DataTypes.INTEGER(255),
    allowNull:false,
    defaultValue:0
  },
  verify_count: {
    type: DataTypes.INTEGER(255),
    allowNull:false,
    defaultValue:0
  },
  view_count: {
    type: DataTypes.INTEGER(255),
    allowNull:false,
    defaultValue:0
  },
  send_date: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue:moment().format('YYYY-MM-DD')
  },
});


  db.sync()
 
module.exports = Email;
