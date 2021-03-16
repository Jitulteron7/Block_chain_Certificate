import React,{useRef,useEffect} from "react";
import {Link } from "react-router-dom";
import logo from "../../img/main_logo.jpeg"
import M from "materialize-css"
const Nav =()=>{
  const sideMode=useRef()
  useEffect(()=>{
    M.Sidenav.init(sideMode.current);
  },[])
  
    return(<>
    <nav style={{backgroundColor:"#fff",color:"#AACC00"}}>
        <div class="nav-wrapper">
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="Small material-icons" style={{color:"#AACC00"}}>menu</i></a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
          
                <li className="logo_align"><Link  class=" logo_pic"><img src={logo} /></Link></li>      
                <li><Link to="/upload/home">Multiple Certificate</Link></li>
                <li><Link to="/upload/page1">One Certificate</Link></li>
          </ul>
          <a href="#" class="brand-logo upper_logo center">Technology Academy</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
                {/* <li><Link to="/page2">Next</Link></li> */}
          </ul>
        </div>
    </nav>
    <ul class="sidenav" id="mobile-demo" ref={sideMode}>
    
                <a onClick={()=>{M.Sidenav.getInstance(sideMode.current).close()}} className="brand-logo ">
                  <img  className="side_logo_pic" src={logo} />
                </a>      
                <li onClick={()=>{M.Sidenav.getInstance(sideMode.current).close()}} ><Link to="/upload/home">Multiple Certificate</Link></li>
                <li onClick={()=>{M.Sidenav.getInstance(sideMode.current).close()}} ><Link to="/upload/page1">One Certificate</Link></li>
    </ul>
    </>);


}

export default Nav;