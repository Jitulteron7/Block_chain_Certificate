
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
  let todayIs=moment().format("YYYY-MM-DD")
  const createDate= async()=>{
    
    console.log(todayIs);
    try{
        const date=await Email.findOne({
            where:{send_date:todayIs}
          })
          console.log("data email is what sdf ",date);
          if(date==null){
              const makeDate=await Email.create({
                  send_Date:todayIs
              })
              
          }else{
  
            console.log("Email not null");
         }     
    }
    catch(e){
        console.log(e);
    }
  
  }
  createDate()
module.exports = Email;
