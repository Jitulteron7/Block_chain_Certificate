import React,{useState,useRef} from "react";
import "./Page3.css";
import img from "../../img/home.png"
import axiosInstance from "../../helper/AxiosInstance";
import axios from "axios";
import M from "materialize-css"
import {Link} from "react-router-dom";

const Home =()=>{

    // excel
    const [file, setFile] = useState(''); 

    // all the data state
    const [batch_code,set_batch_code]=useState();
    const [batch_trainer,set_batch_trainer]=useState("");
    const [batch_duration,set_batch_start_date]=useState("");
    const [training_title,set_training_title]=useState("");
    const [staff_name,set_stuff_name]=useState("");
    const [staff_email,set_staff_email]=useState("");
    const [training_code,set_training_code]=useState();
    const [load,setLoad]=useState(true)
    const [data, getFile] = useState({ name: "", path: "" });   
     const [progress, setProgess] = useState(0);
    const sl=useRef();


    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // storing file
    }
    
    const uploadFile = () => {
        
        
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           var  validation =re.test(String(staff_email).toLowerCase());
           console.log(validation);
           if(!validation){
                return M.toast({html:`
                <div class="file_upload_notification_error">
                    <span class="material-icons">
                    error_outline
                    </span>
                    <span >Email is not valid !</span>
                </div>`
                ,classes:"file_upload_notification"})       
           }
        
       if(!staff_email||!file||!batch_trainer||!training_title||!staff_name||!batch_duration){
        M.toast({html:`
        <div class="file_upload_notification_error">
            <span class="material-icons">
            error_outline
            </span>
            <span >Please add all the fields !</span>
        </div>`
        ,classes:"file_upload_notification"})
       }else{

        let load=document.querySelector("#load_fileIn.uploading_file");
        load.style.display="block"
        load.style.height="115%"
        const formData = new FormData(); 
       
        let totData={ batch_code,
            batch_trainer,
            batch_duration,
            training_title,
            staff_name:staff_name,
            staff_email
        }
       
        formData.append('file',file);
        formData.append('data',JSON.stringify(totData));
        
        axios.post(`${window.location.protocol}//${window.location.hostname}:5000/tutor/upload/file`,
        
       formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            dummy(res.data.success)
            
            getFile({ name: res.data.name,
                     path: 'http://localhost:4500' + res.data.path
                   })
                   
        }).catch(err => 
            
            {
                let load=document.querySelector("#load_fileIn.uploading_file");
                load.style.display="none";
                M.toast({html:`
            <div class="file_upload_notification_error">
                <span class="material-icons">
                error_outline
                </span>
                <span >Error! Unable to upload files</span>
            </div>`
            ,classes:"file_upload_notification"})
            console.log(err)})
       }
    }

    const dummy=(boolen)=>{
        if(boolen){

            M.toast({html:`
                        <div class="file_upload_notification">
                            <span class="material-icons">
                                check_circle_outline
                            </span>
                            <span >Pushed certificate to Blockchain Successfully</span>
                        </div>`
                        ,classes:"file_upload_notification"})
                        setFile("")
                        set_batch_code("")
                        set_batch_trainer("")
                        set_batch_start_date("")
                        set_training_title("")
                        set_stuff_name("")
                        set_staff_email("")
                        window.location.reload();
          }else{
           M.toast({html:`
           <div class="file_upload_notification_error">
               <span class="material-icons">
               error_outline
               </span>
               <span >Unable to upload !</span>
           </div>`
           ,classes:"file_upload_notification"})
          }

        let load=document.querySelector("#load_fileIn.uploading_file");
        load.style.display="none";
          document.querySelectorAll("input").values=""
        
            
       
                
        
        
    }
    return(<>
    
    <div id="load_fileIn" className="uploading_file">
        <div className="loading">
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div className="go_back">
                <a href={`${window.location.protocol}//${window.location.hostname}/BlockChainProj/front-end/dashboard.php`}>
                
                <button className="btn">
                    <span class="Small material-icons">arrow_back</span>
                        back
                </button></a>
        </div>
    <div className="Page3">
        <div className="File row">
            <div className=" col l12">
            <div className="body ">
                
                <div class="row">
                    <center><h3 className="details_h3">Details</h3></center>
                    <center><div className="detail_bar"></div></center>
                    <form class="col s12">
                    
                    <div class="row">
                        <div class="input-field col s6">
                        
                        <input onChange={(e)=>{set_batch_code(e.target.value)}}  id="Batch_Code" type="number" class="validate" />
                        <label for="Batch_Code">Batch Code</label>
                        </div>
                        <div class="input-field col s6">
                        <input onChange={(e)=>{set_stuff_name(e.target.value)}} id="Stuff_Name" type="text" class="validate" />
                        <label for="Stuff_Name">Staff Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                        <input onChange={(e)=>{set_training_title(e.target.value)}} id="Training_Title" type="text" class="validate" />
                        <label for="Training_Title">Training Title</label>
                        </div>
                        <div class="input-field col s6">
                        <input onChange={(e)=>{set_batch_trainer(e.target.value)}} id="Batch_Trainer" type="text" class="validate" />
                        <label for="Batch_Trainer">Batch Trainer</label>
                        </div>
                    </div>
                    <div class="row">
                        
                        <div class="input-field col s6">
                        <input onChange={(e)=>{set_staff_email(e.target.value)}} id="staff_email" type="email" class="validate" />
                        <label for="staff_email">Staff Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                        <input  onChange={(e)=>{set_batch_start_date(e.target.value)}} id="Batch_Start_Date" type="text" class="validate" />
                        <label for="Batch_Start_Date">Batch Duration Date</label>
                        </div>
                        
                    </div>
                    
                    
                    </form>
                </div>
                  </div>
                
            </div>
            <div className="bottom col l12">
                <form action="#">
                    <div class="file-field input-field">
                    <div class="btn " >
                        <span>Pdf</span>
                        
                        <input accept="application/pdf" type="file" name="multiplefile" ref={sl} onChange={handleChange}  />
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    </div>
                </form>
                {/* <div className="progessBar" style={{ width: progress }}>
                         {progress}
                    </div> */}
                    {/* <div class="progress card">
                        <div class="determinate" style={{width:`${50}%`}}></div>
                    </div> */}
            </div>
            
        </div>
        <center><button onClick={()=>{uploadFile()}} class="waves-effect waves-light btn">UPLOAD</button></center>
    </div>
    </>);


}

export default Home;