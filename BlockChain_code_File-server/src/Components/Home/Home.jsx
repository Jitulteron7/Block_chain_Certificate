import React,{useState,useRef} from "react";
import "./Home.css";
import img from "../../img/home.png"
import axiosInstance from "../../helper/AxiosInstance";
import axios from "axios";
import M from "materialize-css"
import moment from "moment";
import {Link} from "react-router-dom";




const Home =()=>{
    // excel
    const [file, setFile] = useState(''); 
    // pdf
    const [file2, setFile2] = useState([]); 

    // no of of certificates
    const [NoIs,set_NoIs]=useState("");
    // progress bar code
    const [data, getFile] = useState({ name: "", path: "" });   
     const [progress, setProgess] = useState(0); 
    
    const el = useRef(); 
    const sl=useRef();

    // excel
    const handleChange = (e) => {
        setProgess(0)
        const fileIs=e.target.files
        console.log(fileIs);
        setFile(fileIs[0]); // storing file
    }
    // pdf 
    const handleChange2 = (e) => {
        setProgess(0)
        const fileIs = e.target.files;
      
        setFile2(fileIs); // storing file
    }

    // upload function
    const uploadFile = () => {
        if(file2.length>100){
            return  M.toast({html:`
            <div class="file_upload_notification_error">
                <span class="material-icons">
                error_outline
                </span>
                <span >Cannot upload more then 100!</span>
            </div>`
            ,classes:"file_upload_notification"})
        }
    
        let load=document.querySelector("#load_fileIn.uploading_file");
        console.log(file,"file1");
        console.log(file2,"file2");
        console.log(NoIs,"numbers for pdfs");
        if(file==""||file2.length==0||NoIs=="")
          {
            return  M.toast({html:`
            <div class="file_upload_notification_error">
                <span class="material-icons">
                error_outline
                </span>
                <span >Please add all the fields !</span>
            </div>`
            ,classes:"file_upload_notification"})
          }
          
          load.style.height="85%"
           load.style.display="block"

        const formData = new FormData(); 
        
        // pdf 
        for (let i=0;i<file2.length;i++){
            formData.append(`file${i}`,file2[i]);
        }
        // excel
        formData.append('file',file);
        
        formData.append('data',JSON.stringify(NoIs));
        axios.post(`${window.location.protocol}//${window.location.hostname}:5000/tutor/upload/files`,formData, {
            headers: {
                'content-type': 'multipart/form-data'
              }
        }).then(res => {
                // setFile("");
                // setFile2("")
            console.log(res)
            if(res.data.success){
                load.style.display="none"
                M.toast({html:`
                        <div class="file_upload_notification">
                            <span class="material-icons">
                                check_circle_outline
                            </span>
                            <span >Pushed certificates to Blockchain Successfully</span>
                        </div>`
                        ,classes:"file_upload_notification"})

                    // excel
                     setFile("")
                    // pdf
                     setFile2("")

                    // no of of certificates
                    set_NoIs("")


                getFile({ name: res.data.name,
                     path: 'http://localhost:5000' + res.data.path
                   })
                window.location.reload();
            }
            else if (res.data.error){
                load.style.display="none"
                // npm start;
                // setFile2("");
                M.toast({displayLength:12000,
                    html:`
                <div class="file_upload_notification_error">
                    <span class="material-icons">
                    error_outline
                    </span>
                    <span >${res.data.message} !</span>
                </div>`
                ,classes:"file_upload_notification"})
            }
            else if(res.data.msg){
                load.style.display="none"
                // npm start;
                // setFile2("");
                M.toast({html:`
                <div class="file_upload_notification_error">
                    <span class="material-icons">
                    error_outline
                    </span>
                    <span >${res.data.msg} !</span>
                </div>`
                ,classes:"file_upload_notification"})
            }
            else{
                load.style.display="none"
                // setFile("");
                // setFile2("");
                M.toast({html:`
                <div class="file_upload_notification_error">
                    <span class="material-icons">
                    error_outline
                    </span>
                    <span >Unable to upload !</span>
                </div>`
                ,classes:"file_upload_notification"})
            }
            
        }).catch(err => 
            {
                // setFile("");
                // setFile2("")
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

    const dummy=()=>{

           let load=document.querySelector("#load_fileIn.uploading_file");
           load.style.display="block"
            setTimeout(()=>{
                load.style.display="none"
                
            },5000 )
            M.toast({html:`
                        <div class="file_upload_notification">
                            <span class="material-icons">
                                check_circle_outline
                            </span>
                            <span >Pushed certificates to Blockchain Successfully</span>
                        </div>`
                        ,classes:"file_upload_notification"})
                    
            M.toast({html:`
            <div class="file_upload_notification_error">
                <span class="material-icons">
                error_outline
                </span>
                <span >Unable to upload !</span>
            </div>`
            ,classes:"file_upload_notification"})
            
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
                      
                </button>
               </a>
        </div>
    <div className="Home">

        

        <div className="File">
            <div className="body">
                {/* <img src={img} /> */}
                <h3>Upload Your File Here</h3>
                <form action="#">
                    <div class="file-field input-field">
                    <div class="btn" style={{backgroundColor:"#AACC00",fontSize:"1.2rem",borderRadius:"40px",width:"100%",fontWeight:"bold"}}>
                    <div className="inner_btn">
                            <span class="Small material-icons">upload_file</span>
                            <span>Excel</span>
                    </div>
                        
                        
                        <input type="file" accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="multiplefile" ref={el} onChange={handleChange}  multiple/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    </div>
                </form>
                <form action="#">
                    <div class="file-field input-field">
                    <div class="btn " style={{backgroundColor:"#00b0ff",fontSize:"1.2rem",borderRadius:"40px",width:"100%",fontWeight:"bold"}}>
                    <div className="inner_btn">
                            <span class="Small material-icons">picture_as_pdf</span>
                            <span>Pdf</span>
                    </div>
                        
                        <input accept="application/pdf" type="file" name="multiplefile" ref={sl} onChange={handleChange2}  multiple/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    </div>
                </form>
                <div class="input-field col s6">
                        <input onChange={(e)=>{set_NoIs(e.target.value)}} id="NoIs" type="number" class="validate" />
                        <label for="NoIs">Enter no of Certificates</label>
                </div>       
                
            </div>
            
            <div className="bottom">
                
                {/* <div className="progessBar" style={{ width: progress }}>
                     {progress}
                     
                </div> */}
                    
            </div>
        </div>
        
        <center> <button onClick={()=>{uploadFile()/*dummy()*/}} class="waves-effect waves-light btn"><span class="Small material-icons">upload</span><span>UPLOAD</span></button></center>
    </div>
    </>);


}

export default Home;



// 