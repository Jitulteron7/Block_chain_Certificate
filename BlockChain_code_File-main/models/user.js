const { DataTypes } = require('sequelize');
const {db}=require("../db/sql");
const moment =require("moment");
const User = db.define('user_table', {
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
  user_type:{
    type: DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
  }	
},{
  timestamps: false,
});

  db.sync()

module.exports = User;