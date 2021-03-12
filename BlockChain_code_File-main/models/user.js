const { DataTypes } = require('sequelize');
const {db}=require("../db/sql");
const moment =require("moment");
const Email = db.define('user_table', {
  id: {
    type: DataTypes.INTEGER(255),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },	
});

  db.sync()

module.exports = Email;