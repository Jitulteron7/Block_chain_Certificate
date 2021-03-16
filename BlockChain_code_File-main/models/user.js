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
    type: DataTypes.INTEGER(255),
    allowNull:false,
    defaultValue:0
  }	
},{
  timestamps: false,
});

  db.sync().then(async (result)=>{
        if(result){
          const user=await User.findOne({
            where:{
              name:'Abul Shah'
            }
          });
          console.log(user,"empty");
      
        if(user==null){
          console.log("empty",user);
          const userIs =await User.create({
            name:'Abul Shah',
            phonenumber:"0505177469",
            email:"abulshah@gmail.com",
            password:"Welcome@1234",
            user_type:1
          })
          if(userIs){
            console.log('database connected successfully');    
            console.log("created",userIs);
          }
        }
          
    }
  })
  .catch((err)=>{
    console.log(err);
  })

module.exports = User;