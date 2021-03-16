
const { DataTypes } = require('sequelize');
const {db}=require("../db/sql");

const Certificates = db.define('certificate', {
  certificate_id: {
    type: DataTypes.INTEGER(255),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  //
  batch_code: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  staff_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
,
  staff_email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  //
  batch_trainer: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  //

  batch_duration: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  //
  training_title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  //
  certificate_location: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  certificate_hash:{
    type:DataTypes.STRING(255),
    
    allowNull:true,
  },

  certificate_link:{
    type:DataTypes.STRING(255),
    allowNull:true
  },
  //
  transaction_hash:{
    type:DataTypes.STRING(255),
  
    allowNull:false,
  },
});

  db.sync()

module.exports = Certificates;



// certificate_id(primary key-int255)

// batch_code(int-255, Null-NO)*

// staff_name(varchar-255, Null-NO)*

// staff_email(varchar-255, Null-NO)*

// tarining_title(varchar-255, Null-NO)*

// batch_trainer(varchar-255, Null-NO)*

// batch_duration(varchar-255, Null-NO)*

// certificate_location(varchar-255, Null-NO)
// certificate_hash(varchar-255, Null-NO)
// transaction_hash(varchar-255, Null-NO)
