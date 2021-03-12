import React,{useEffect,useState,useRef} from "react";
import "./Page.css";
import {useParams,useHistory} from "react-router-dom"
import axios from "axios"
import ShowFile from "../ShowFile/ShowFile";
import {Link} from "react-router-dom"
import pdf from "../../Files/pdf/1916125_Exp3.pdf";
import img from "../../img/banner.png";
import M from "materialize-css";
import {useLottie} from "lottie-react"
import animation from "../../img/layer.json"

import {Done1,Done2,Done3,Done} from "../Anime/Anime"


const Anime=()=>{
const style={
  height:200,

}

  const options = {
    animationData: animation,
    loop: true,
    autoplay: true,
  };
  const { View } = useLottie(options, style);
  
  return View;
}


const Page2=()=>{
    const ThisONe=useRef(null)
    const History=useHistory()
    const string=useParams()
    const [path,setPath]=useState("")
    const [user,setUser]=useState({});
    const [conditionIs,setCondition]=useState(false);
    
    const fetchData= async ()=>{
        // console.log(string.string);
        try{
            const data= await axios.get(`${window.location.protocol}//${window.location.hostname}:5000/data/${string.string}`);
        if(data.data.data){

            setUser(data.data.data)
            setPath(data.data.path)
            console.log(data.data);
            // console.log(data.d ata.data)   
            }
            else{
                
                    return History.push("/error_page");
                
            }
        } 
        catch (e){
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
        console.log(e)

                    }
            
    }
    const showLi=()=>{
        let li=document.querySelectorAll(".table_data ul li .done");
        let li2=document.querySelectorAll(".table_data ul li .not");
        let div=document.querySelector(".table_data .message_done");
        let div1=document.querySelector(".table_data .message_not");
        
        for (let i=0;i<li.length;i++){
            setTimeout( ()=>{
                li[i].style.display="flex";
                li2[i].style.display="none";
                
                if(i+1==li.length){
                    if(div){
                        div.style.display="flex";
                    }
                    if(div1){
                        div1.style.display="flex";
                        }
                    
                    
                }
                
            },1000*(i+1));
        }
    }
    useEffect( ()=>{
        fetchData()
        console.log(path);
    },[])
    const Click=()=>{

        let time=document.querySelector(".timmer")
        time.style.display="flex";
        setTimeout(()=>{
            time.style.display="none";
            
            axios.get(`${window.location.protocol}//${window.location.hostname}:5000/verify/${string.string}`)
            .then(res=>
                {
                    console.log(res.data)
                    
                        showVerification(res.data.success);
                        goToBottom()
                    
                })
                
                .catch(e=> 
                    {
                        let load=document.querySelector("#load_fileIn.uploading_file");
                        load.style.display="none";
                        M.toast({html:`
                    <div class="file_upload_notification_error">
                        <span class="material-icons">
                        error_outline
                        </span>
                        <span >Error! Unable Verify</span>
                    </div>`
                    ,classes:"file_upload_notification"})
                    console.log(e)})
        },5000)

    }
    

    const goToBottom=()=>{

        // window.scrollTo(0,document.body.scrollHeight);
        ThisONe.current?.scrollIntoView({ behavior: "smooth" })
        
    }
const showVerification=(condition)=>{
    setCondition(condition)
    let verification=document.querySelector(".table_data");
    verification.style.display="block";
    showLi()
}
    return(<>
    
    {user?
    <div className="certificate_page"  >
    <div class="response page">
      
      <div class="div1 card ">

         {user?<ShowFile url={path} />:<h4>Certificate will be displayed here</h4>}
          
          
      </div>
      <div class="div2  card">
              <div>
                  <img src={img}/>
                  
              </div>
          <div className="content_page">
              
              <div>
              <h3>Issued to</h3>
              <h4>{user?user.staff_name:"NO"}</h4>
              </div>
              <div>
              <h3>Trainer Name</h3>
              <h4>{user?user.batch_trainer:"NO"}</h4>
              </div>
            
              <div>
              <h3>Batch Code</h3>
              <h4> {user?user.batch_code:"NO"}</h4>
              </div>
              <div>
              <h3>Batch Duration</h3>
              <h4> {user?user.batch_duration:"NO"}</h4>
              </div>
              <div>
              <h3>Transaction Hash</h3>
              <p style={{width:"500px",textAlign:"left"}}>{user?user.transaction_hash:"NO"}</p>
              </div>
              <div>
              <h3>Certificate Hash</h3>
              <p style={{width:"500px",textAlign:"left"}}>{user?user.certificate_hash:"NO"}</p>
              </div>
          </div>
          <div className="buttonIs">
              <button onClick={()=>{Click();goToBottom()}} className="btn icon_btn"><span class="Small material-icons">gavel</span><span>Verify</span></button>
             
          </div>
      </div>
      
      
</div>
<div className="timmer">
<Anime/>
</div>
<div className="table_data" >
<center><h3  >Verification</h3></center>
        <ul id="gotoBottom">
            <li><h4>Fetching EnCrypted Hash from Blockchain</h4><span style={{color:"#4ED4FF"}} class="not Small material-icons">access_time_filled</span><span class="done Small material-icons" style={{color:"#AACC00"}}>check_circle</span></li>
            <li><h4>Fetching Document</h4><span style={{color:"#4ED4FF"}} class="not Small material-icons">access_time_filled</span><span class="done Small material-icons" style={{color:"#AACC00"}}>check_circle</span></li>
            <li><h4>Generating Hash and Comparing</h4><span style={{color:"#4ED4FF"}} class="not Small material-icons">access_time_filled</span><span class="done Small material-icons" style={{color:"#AACC00"}}>check_circle</span></li>
            <li><h4>Verifying Cryptographic Signature</h4><span  style={{color:"#4ED4FF"}}class="not Small material-icons">access_time_filled</span><span className="done Small material-icons" style={conditionIs?{color:"#AACC00"}:{color:"red"}}>{conditionIs?"check_circle":"error"}</span></li>
            {/* <li><h4>Checking Revocation Status</h4><span style={{color:"#4ED4FF"}} class="not Small material-icons">access_time_filled</span><span className="done Small material-icons" style={conditionIs?{color:"#AACC00"}:{color:"red"}}>{conditionIs?"check_circle":"error"}</span></li> */}
            
        </ul>
        {conditionIs?<div className="message_done">
            <p>Sucessfully Verified</p>
        </div>:
        <div className="message_not">
            <p>Invalid Document</p>
        </div>}
</div>
</div>
:<div>Loading</div>}
<div ref={ThisONe} style={{height:"200px"}} ></div>
    </>
    );


}

export default Page2;