const router=require("express").Router();
const XLSX =require("xlsx");
const {db}=require("../db/sql");
const Certificate=require("../models/index")
const randomString=require("randomstring");
const sha256=require("js-sha256");
const Email  =require("../models/email");
const User =require("../models/user");
//---------------------------------------
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const factory = require('../Ethereum/certificate') ;
const moment=require("moment")
const provider = new HDWalletProvider(
    'frame apart post kick armed refuse limb armed annual jaguar apart cliff',
    'https://rinkeby.infura.io/v3/1ec6558c6dba4a9db1ab5f5b647d9a60'
    );
//-----------------------------------------
// email
const nodemailer=require("nodemailer");
const sendgridTransport=require("nodemailer-sendgrid-transport");
const transporter=nodemailer.createTransport({
    host: "mail.oyesters.in",
    port: 465,
    secure: true,
    auth: {
    user: "oyesters_training@oyesters.in",
    pass: "Oyesters@1234"
    }
})
//-----------------------------------------
let todayIs=moment().format("YYYY-MM-DD")
    
const createDate= async()=>{
    const user=await User.findAll({});
    console.log(todayIs);
    try{
        const date=await Email.findOne({
            where:{send_date:todayIs}
          })
          if(date==null){
              const makeDate=await Email.create({
                  send_Date:todayIs
              })
          }     
    }
    catch(e){
        console.log(e);
    }
  
  }
  createDate()

  

    const web3 = new Web3(provider);
    // blockchain deploy for multiple pdfs 
    const deploy = async (filehash,data,pdf,req,next) => {
        let gotHere;
        try{
            // console.log("hash_certificate:",filehash);
            // console.log("hash_certificate:",data[`Certificate_Name`]);
            // console.log("hash_certificate:",pdf.name.replace(".pdf",""));
            const accounts = await web3.eth.getAccounts();
            console.log('account address ', accounts[0]);
           
        
        let hh = await factory.methods.addData(
            filehash,/*id */
            filehash/*pdf hash file*/
          ).send({gas:'1000500' , from: accounts[0]}).on('transactionHash',async function(hash){
            //---------------------
            // code of DB
            // create row data and save

            let get={
                training_title:data[`TrainingTitle`],
                batch_trainer:data[`Batch_Trainer`],
                staff_name:data[`Staff_Name`],
                batch_duration:data[`BatchStartDate`],
                certificate_hash:filehash,
                batch_code:data[`Batch Code`],
                certificate_location:`${pdf.name}`,
                transaction_hash:hash,
                staff_name:data[`Staff_Name`],
                staff_email:data[`Staff_Email`],
                certificate_link:`${req.protocol}://${req.host}:3000/upload/certificate/${filehash}`,
               }

                   gotHere= await Certificate.create(get);
                //    email section
                var mailOptions = {
                    from: '"Example Team" <oyesters_training@oyesters.in>',
                    to:data[`Staff_Email`],
                    subject: 'Test Email',
                    html:`<p>
                        Dear student,</p>
                        <p>Your Certificate Link is created. Click <a href=${get.certificate_link}>Here</a></p>`,  
                    dsn: {
                        id: 'some random message specific id',
                        return: 'headers',
                        notify: ['failure', 'delay'],
                        recipient: 'oyesters_training@oyesters.in'
                    },
                }; 
                   transporter.sendMail(mailOptions,(err,info)=>{
                       if(err){
                           console.log("somthing went wrong will sending email",err);
                           return next(err);
                       }else{
                        console.log('Successfully sent');
                       }
                   })
                   const resultEmail=await Email.findOne({
                            where: {send_date:todayIs}
                        });
                        // console.log("my date is ",resultEmail);
                    
                        if(resultEmail!=null||resultEmail!=[]){
            
                            let newCount=resultEmail.send_count+1;
                        
                            const Email_Modify=await Email.update(
                                {
                                    send_count:newCount
                                },{returning: true,
                                    where:{send_date:todayIs}
                                })
                        
                        }


        });

        if(gotHere){
            return 1;
        }else{
            return null;
        }

        } catch(e){
            console.log(e);
            next(e)
        }

    }

// {
//         try{
            
//             let tot=1;
//           await gets.map(async (d,i)=>{
//                 if(d!=undefined){
//                     datas.map(async (data,index)=>{
//                         // console.log(d.name.replace(".pdf",""),In[`Certificate_Name`]);
//                         if(d.name.replace(".pdf","")==data[`Certificate_Name`]){
                        
//                                     let namePdf=d.name;        
            
//                                     const accounts = await web3.eth.getAccounts();
//                                     console.log('account address ', accounts[0]);
                          
//                                       // unique Id (for dev using random string )
                          
//                                      let testIs=randomString.generate({length:20});
                                     
//                                   // generating the trasaction_hash
//                                 //   factory.methods.viewData(testIs).call
//                                     let hh = await factory.methods.addData(
                                      
//                                       filehash ,/*id */
//                                       filehash /*pdf hash file*/
                          
//                                     ).send({gas:'2000000' , from: accounts[0]}).on('transactionHash',async function(hash){
                                      
                                  
//                                       let get={
//                                           training_title:data[`TrainingTitle`],
//                                           batch_trainer:data[`Batch_Trainer`],
//                                           staff_name:data[`Staff_Name`],
//                                           batch_duration:data[`BatchStartDate`],
//                                           certificate_hash:filehash,
//                                           batch_code:data[`Batch Code`],
//                                           certificate_location:`${namePdf}`,
//                                           transaction_hash:hash,
//                                           staff_name:data[`Staff_Name`],
//                                           staff_email:data[`Staff_Email`],
//                                           certificate_link:`${req.protocol}://${req.host}:3000/upload/certificate/${filehash}`,
//                                          }
                                     
//                                             // allData.push(get);
//                                             let gotHere= await Certificate.create(get);
//                                             // console.log(i+1,"asdasdasda",gets.length-1);
//                                             // if(gotHere){
//                                                 // console.log(allData);
//                                                 console.log(i+1,data[`Staff_Name`],"No of sum is ");
//                                              if(i+1==gets.length-1){
//                                                 // console.log(allData);bulkCreate
//                                                 // let gotHere= await Certificate.bulkCreate(allData,{returning: true});
//                                                 // console.log(gotHere);
//                                                 //  console.log("runned",i);
//                                                 const resultEmail=await Email.findOne({
//                                                     where: {send_date:todayIs}
//                                                 });
//                                                 // console.log("my date is ",resultEmail);
                                               
//                                                 if(resultEmail!=null||resultEmail!=[]){
                                    
//                                                     let newCount=resultEmail.send_count+gets.length-1
                                                   
//                                                     const Email_Modify=await Email.update(
//                                                         {
//                                                             send_count:newCount
//                                                         },{returning: true,
//                                                             where:{send_date:todayIs}
//                                                         })
                                                
//                                                 }

//                                                 return res.status(201).json({
//                                                     success:true,
//                                                     message:"Uploaded Successfully"
//                                                 })
//                                             }
//                                         // }
                        
//                                   //--------------------------
                                  
//                                   });
                                     
                                   
                                   
                                  
                                   
                                
                                
                            
//                         }
//                     })
                    
//                 }
                
//             })
//             // console.log(tot,gets.length);
//             // if( tot==gets.length){
//             //     gets.map(async (d,i)=>{

//             //         if(d!=undefined){

//             //             let namePdf=d.name;
//             //             // console.log(namePdf,data[`Certificate_Name`]);
//             //            if(namePdf.replace(".pdf","")==data[`Certificate_Name`]){

                        

//             //             const accounts = await web3.eth.getAccounts();
//             //             console.log('account address ', accounts[0]);
              
//             //               // unique Id (for dev using random string )
              
//             //              let testIs=randomString.generate({length:20});
                         
//             //           // generating the trasaction_hash
//             //         //   factory.methods.viewData(testIs).call
//             //             let hh = await factory.methods.addData(
                          
//             //               filehash ,/*id */
//             //               filehash /*pdf hash file*/
              
//             //             ).send({gas:'2000000' , from: accounts[0]}).on('transactionHash',async function(hash){
                          
                      
//             //               let get={
//             //                   training_title:data[`TrainingTitle`],
//             //                   batch_trainer:data[`Batch_Trainer`],
//             //                   staff_name:data[`Staff_Name`],
//             //                   batch_duration:data[`BatchStartDate`],
//             //                   certificate_hash:filehash,
//             //                   batch_code:data[`Batch Code`],
//             //                   certificate_location:`${namePdf}`,
//             //                   transaction_hash:hash,
//             //                   staff_name:data[`Staff_Name`],
//             //                   staff_email:data[`Staff_Email`],
//             //                   certificate_link:`${req.protocol}://${req.host}:3000/upload/certificate/${filehash}`,
//             //                  }
                         
//             //                     // allData.push(get);
//             //                     let gotHere= await Certificate.create(get);
//             //                     // console.log(i+1,"asdasdasda",gets.length-1);
//             //                     // if(gotHere){
//             //                         // console.log(allData);
//             //                      if(i+1==gets.length-1){
//             //                         // console.log(allData);bulkCreate
//             //                         // let gotHere= await Certificate.bulkCreate(allData,{returning: true});
//             //                         // console.log(gotHere);
//             //                         //  console.log("runned",i);
//             //                         const resultEmail=await Email.findOne({
//             //                             where: {send_date:todayIs}
//             //                         });
//             //                         // console.log("my date is ",resultEmail);
                                   
//             //                         if(resultEmail!=null||resultEmail!=[]){
                        
//             //                             let newCount=resultEmail.send_count+gets.length-1
                                       
//             //                             const Email_Modify=await Email.update(
//             //                                 {
//             //                                     send_count:newCount
//             //                                 },{returning: true,
//             //                                     where:{send_date:todayIs}
//             //                                 })
                                    
//             //                         }
//             //                         return res.status(201).json({
//             //                             success:true,
//             //                             message:"Uploaded Successfully"
//             //                         })
//             //                     }
//             //                 // }
            
//             //           //--------------------------
                      
//             //           });
                         
//             //            }
                       
                      
                       
//             //         }
                    
//             //     })
                
//             // }else{
//             //     throw new Error("Kindly check the inputs you have passed");
//             // }
    

//         } catch(e){
            
//             next(e)
            
            
//         }
//       };



    //   viewData
    const DataCheck=async (string)=>{
        try{
            let data=await factory.methods.viewData(string).call();
            return data;
            
        }
        catch (e){
            
            console.log(e);
        }
    }
    
// blockchain deploy for single pdfs 
      const deploy2 = async (filehash,data,res,req) => {
        console.log(data.certificate_link);
        try{
            const accounts = await web3.eth.getAccounts();
            console.log('account address ', accounts[0]);

            
           let testIs=randomString.generate({length:20});
           
        
        let hh = await factory.methods.addData(
            filehash,/*id */
            filehash/*pdf hash file*/
          ).send({gas:'1000000' , from: accounts[0]}).on('transactionHash',async function(hash){
            //---------------------
            // code of DB
            // create row data and save

                 let get={
                     ...data,
                     transaction_hash:hash
                 }
                 const done= await    Certificate.create(get)
                 if(done){
                     console.log(data.staff_email);
                     var mailOptions = {
                                from: '"Example Team" <oyesters_training@oyesters.in>',
                                to:data.staff_email,
                                subject: 'Test Email',
                                html:`<p>
                                    Dear student,</p>
                                    <p>Your Certificate Link is created. Click <a href=${data.certificate_link}>Here</a></p>`,  
                                dsn: {
                                    id: 'some random message specific id',
                                    return: 'headers',
                                    notify: ['failure', 'delay'],
                                    recipient: 'oyesters_training@oyesters.in'
                                },
                            }; 
                      transporter.sendMail(mailOptions,(err,info)=>{
                        if(err){
                            console.log("The error is ",err);
                        }else{
                            // console.log(nodemailer.getTestMessageUrl(info));
                            // console.log(info);
                            console.log('Successfully sent');
                        }
                    })
                    // console.log(sent_mail,"Jitul Teron");
                    
                 }
                 
                 
            //--------------------------
        
        });
           

        console.log(hh);

        } catch(e){
            console.log(e),"Jitul Teron";
        }
      };



    //------------------------------------------------------------

    // XLSX npm data extraction function
const dataExtract= async (file)=>{
    const workbook= XLSX.readFile(`${__dirname}/../public/excel/${file}`);
    var data = [];
    var info=null;
    var sheet_name_lists  = workbook.SheetNames;
    sheet_name_lists.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};
        
        for(z in worksheet) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0,tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;

            //store header names
            if(row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();
        
        info=data;

    });
    return info;
    
}


router.get("/verify/:id",async (req,res)=>{

    let check= await  DataCheck(req.params.id);
    let data= await Certificate.findOne({
            where: {certificate_hash:req.params.id}
    })
    
    // console.log(req.params.id,"id");
    // console.log(check,"blobk");
    // console.log(check==data.certificate_hash);
    // console.log(data.certificate_hash,"db");
    const resultEmail=await Email.findOne({
        where: {send_date:todayIs}
    });
    // console.log(resultEmail,"result");
    if(resultEmail!=null||resultEmail!=[]){
        let newCount=resultEmail.verify_count+1
        const Email_Modify=await Email.update(
            {
                verify_count:newCount
            },{returning: true,
                where:{send_date:todayIs}
            })
        // )
        console.log(Email_Modify,"updated view");
    }
    if(data.certificate_hash==check){
         res.status(200).json({
            success:true,
            message:"verified"
        })
    }
    else{
        res.status(200).json({
            success:false,
            message:"invalid"
        })
    }

})




// multipe file upload route
router.post('/tutor/upload/files',async (req, res,next) => {
    let totGet=0;
    try{ 
        // count the on of time saved sucessfully 
        
        // console.log(req.files,"sdfghjk")
                            const No_of_certificates=JSON.parse(req.body.data);
                            // console.log(No_of_certificates);
                        if (!req.files) {
                                return res.status(500).json({ msg: "file is not found" })
                            }
                            
                            
                    

                    let allPdfs=Object.keys(req.files).map((key)=>{
                        if(key!="file"){
                            return req.files[key]
                        }
                    })

    
    // save the file and no of files verify

                        let checkPdf=[];

                        req.files.file.mv(`${__dirname}/../public/excel/${req.files.file.name}`,async function (err) {
                            if (err) {
                                console.log(err)
                                return res.status(500).send({ msg: "Error occured" });
                            }
                             allPdfs.map(async (get,index)=>{

                            

                                 checkPdf= await dataExtract(req.files.file.name);
                                
                                // console.log(checkPdf,"checkeclsnfksdjnfkjsdnf");
                                if(No_of_certificates!=allPdfs.length-1){
                                    return res.status(200).json({ msg: "Kindly check the inputs you have passed" });
                                }  if(No_of_certificates!=checkPdf.length){
                                    
                                    return res.status(200).json({ msg: "Kindly check the inputs you have passed" });
                                }
                                if(allPdfs.length-1!=checkPdf.length){
                                    return res.status(200).json({ msg: "Kindly check the inputs you have passed" });
                                }
                                
                                if(allPdfs[index]!=undefined){
                                    let checkpdf=0;
                                    checkPdf.map((d,i)=>{
                                    
                                        
                                        if(d["Certificate_Name"]!=allPdfs[index].name.replace(".pdf","")){
                                            checkpdf=checkpdf+1
                                        }else{
                                            checkpdf=0
                                        }
                                        if(checkpdf==checkPdf.length){
                                            console.log(checkpdf,"and",checkPdf.length);
                                            console.log(d["Certificate_Name"],allPdfs[index].name.replace(".pdf",""));
                                            return res.status(201).json({
                                                error:true,
                                                message:`All pdfs saved sucessfully! Except ${allPdfs[index].name.replace(".pdf","")}.pdf  does not match with the excel sheet uploaded.`
                                            })
                                        }
                                        
                                    })
                                }
                                
                            
                            if(allPdfs.length!=index+1){
                                    
                                    get.mv(`${__dirname}/../public/Pdfs/${get.name}`,async function (err) {
                                            if (err) {
                                                console.log(err)
                                                return res.status(500).send({ msg: "Error occured" });
                                            }
                                            

                                            })
                                let data= await dataExtract(req.files.file.name);
                                            // console.log(data,"check 2");
                                     let checkpdf=0;
                                    data.map(async (d,i)=>{
                                            
                                        
                                        if(d[`Certificate_Name`]==allPdfs[index].name.replace(".pdf","")){
                                            // console.log("certificate name :",d[`Cer?tificate_Name`],"pdf name :",allPdfs[index].name.replace(".pdf",""),index,i);
                                            let hashCertificate= await sha256.sha256(allPdfs[i].name);
                                            
                                            let gogo= await deploy(hashCertificate,d,allPdfs[i],req,next); 
                                            totGet=totGet+gogo;
                                            console.log(gogo);
                                            console.log(totGet);
                                            console.log(totGet==data.length);
                                            console.log(totGet,data.length);
                                            if(totGet==data.length){

                                                return res.status(201).json({
                                                    success:true,
                                                    message:"Uploaded Successfully"
                                                });
                                            }
                                            else if(gogo==null){
                                                return res.status(201).json({
                                                    error:true,
                                                    message:"Unable to save the data"
                                                })
                                            }
                            
                                    }
                                        
                                        
                                    
                                })    
                                
                        }          
                              
                                       
                                
                                
                            
                      });


                }) 
                        

        }
            catch(e){
                console.log(e);
                next(e)
                // res.send({err:e,
                //     msg:e});
            }
        })



// single file upload route
router.post("/tutor/upload/file",async(req,res)=>{
   
    try{


        // id
        let testIs=randomString.generate({length:20});
        // pdf 
        let myfile=req.files.file;
        // hash
        let hashCertificate= await sha256.sha256(myfile.name);
        // get the data from the form
        let data=JSON.parse(req.body.data);
        // saveing with more data
        let allData={
            ...data,
            string:testIs,
            certificate_hash:hashCertificate,
            certificate_link:`${req.protocol}://${req.host}:3000/upload/certificate/${hashCertificate}`,
            certificate_location:`${myfile.name}`
        }

        // save pdf file
        myfile.mv(`${__dirname}/../public/Pdfs/${myfile.name}`,async (err)=>{
                    if(err){
                        console.log(err)
                        return res.status(400).send({ msg: "Error occured" });
                    }
                    await deploy2(hashCertificate,allData,res,req);

                    const resultEmail=await Email.findOne({
                        where: {send_date:todayIs}
                    });
                    // console.log(resultEmail,"result");
                    if(resultEmail!=null||resultEmail!=[]){
                        let newCount=resultEmail.send_count+1
                        const Email_Modify=await Email.update(
                            {
                                send_count:newCount
                            },{returning: true,
                                where:{send_date:todayIs}
                            })
                        // )
                        console.log(Email_Modify,"updated view");
                    }
                    return res.status(201).json({
                        success:1,
                        message:"Saved sucessfully"
                    });
                })
        

        }
        catch(e){
            return res.json({
                success:0,
                message:"Error :"+e
            })
        }
})



// route to get the saved files 
router.get("/data/:string",async (req,res)=>{
    
try{
    
   let string=req.params.string;
    const result =await Certificate.findOne({
    where: {certificate_hash:string}
    });
    const resultEmail=await Email.findOne({
        where: {send_date:todayIs}
    });
    // console.log(resultEmail,"result");
    if(resultEmail!=null||resultEmail!=[]){
        let newView=resultEmail.view_count+1
        console.log(newView);
        const Email_Modify=await Email.update(
            {
                view_count:newView
            },{returning: true,
                where:{send_date:todayIs}
            })
        // )
        console.log(Email_Modify,"updated view");
    }
    // if(result!=null){
    //     const data =await Email.FindOne({})
    // }

    //  res.
     res.send({data:result,path:`/${result.certificate_location}`,string:string})


}
catch(e){
res.send({err:e})
}

})

router.get("/download/:string",async (req,res)=>{
  
try{
    
   let string=req.params.string;
    const result =await Certificate.findOne({
    where: {certificate_hash:string}
    });
    
    
// console.log("WE got it ");
    //  res.

    if(result){
        res.download(`${__dirname}/../public/Pdfs/${result.certificate_location}`)
    }
    else{
        return res.status(200).json({
            error:true,
            message:"File does not exits!"
        })
    }
     


}
catch(e){
res.send({err:e})
}

})




router.use((error, req, res, next) => {
    console.error(error.message)
    res.status(200).json({
        error: true,
        message: error.message,
        route: req.url,
    })
})

module.exports=router;

