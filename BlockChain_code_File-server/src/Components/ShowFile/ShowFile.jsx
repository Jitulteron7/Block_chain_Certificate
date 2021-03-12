import React, { useState ,useEffect} from 'react'; 
import { Document, Page,pdfjs } from "react-pdf"; 
import {useParams} from "react-router-dom"
import url1 from "../../Files/pdf/certificate.pdf"  
import FileDownload from "js-file-download"
import "./showFile.css";  
import M from "materialize-css";
import axios from "axios"
const hereIs=`http://game.oyesters.in/EC-353-TCPIP-Mid%20Exam%20March%202021-OPM.pdf`;
// import a from "../../../../BlockChain_code_File-main/public/Pdfs/"
export default function Test(params) { 
  const [PdfIs,setPdfIs]=useState("")
  let fpdfIs=`${window.location.protocol}//${window.location.hostname}:5000/Pdfs${params.url}`
  const string=useParams()
        console.log(params.url);
        // let itIs="../../../../BlockChain_code_File-main/public/Pdfs/"+params.url
        // console.log("../../../../BlockChain_code_File-main/public/Pdfs/"+params.url);
  const downloadCertificate=()=>{
    axios.get(`${window.location.protocol}//${window.location.hostname}:5000/download/${string.string}`,{
      responseType:"blob",
    })
    .then(res=>{
      if(res.data.error){
        return  M.toast({html:`
        <div class="file_upload_notification_error">
            <span class="material-icons">
            error_outline
            </span>
            <span >${res.data.message}!</span>
        </div>`
        ,classes:"file_upload_notification"})
      }
      setPdfIs(res.data)
      FileDownload(res.data,`${params.url.replace("/","")}`);
    })
    .catch(e=>{
      if(e){
      return  M.toast({html:`
        <div class="file_upload_notification_error">
            <span class="material-icons">
            error_outline
            </span>
            <span > ${e}!</span>
        </div>`
        ,classes:"file_upload_notification"})
      }
    })
  }
  pdfjs.GlobalWorkerOptions.workerSrc =  
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 

  const [numPages, setNumPages] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1); 
  
  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => { 
    event.preventDefault(); 
  }); 
    
  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) { 
    setNumPages(numPages); 
    setPageNumber(1); 
  } 
  
  function changePage(offset) { 
    setPageNumber(prevPageNumber => prevPageNumber + offset); 
  } 
  
  function previousPage() { 
    changePage(-1); 
  } 
  
  function nextPage() { 
    changePage(1); 
  } 

  useEffect(()=>{
    // console.log(`../../Files/pdf/${url}`)
  },[])
  
  return ( 
    <> 
    <div className="main showFile"> 
    <div  className="embed_div" >
    <embed
    style={{scrollBehavior:"unset"}}
        src={`${window.location.protocol}//${window.location.hostname}:5000/Pdfs${params.url}`}
        type="application/pdf"
        frameBorder="0"
        scrolling={"auto"}
    ></embed>
    {/* <object width={"100%"} height={500} type="application/pdf" data={`http://localhost:5000/Pdfs${params.url}`}> */}
    {/* <p>Insert your error message here, if the PDF cannot be displayed.</p>
</object> */}
    </div>
      {/* <Document 
        file={PdfIs}
        onLoadSuccess={onDocumentLoadSuccess} 
      >
      </Document>  */}
           {/* <iframe src={`http://localhost:5000/Pdfs${params.url}`} style={{width:600, height:500}} frameborder="0"> */}
      {/* <embed src={`http://localhost:5000/Pdfs${params.url}`} style={{width:600, height:500}}/> */}
      <div className="buttonIsShow">
          <button onClick={()=>downloadCertificate()} className="btn icon_btn"><a   target="_blank" download><i className="large material-icons">get_app</i><a  type="button">Download pdf</a></a></button>
      </div>
      </div> 
    </> 
  ); 
}

