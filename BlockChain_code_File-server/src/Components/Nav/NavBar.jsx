import React from "react";
import {Link } from "react-router-dom";
import "./.nav.css";
import logo from "../../img/main_logo.jpeg"
const Nav =()=>{
    return(<>
    <nav style={{backgroundColor:"#fff",color:"#AACC00"}}>
<div class="nav-wrapper">
  <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li className="logo_align"><Link to="/" class=" logo_pic"><img src={logo} /></Link></li>      
        {/* <li><Link to="/">Multiple Certificate</Link></li>
        <li><Link to="/page3">One Certificate</Link></li> */}
  </ul>
  <a href="#" class="brand-logo upper_logo center">Technology Academy</a>
  <ul id="nav-mobile" class="right hide-on-med-and-down">
        {/* <li><Link to="/page2">Next</Link></li> */}
  </ul>
  
</div>
</nav>
    </>);


}

export default Nav;