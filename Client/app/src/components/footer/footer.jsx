import React from "react";
import "./footer.css";
import logo from "../../pages/img/logo.png"


function footer(){
    return(
<footer className="footer">
    <p className="footer-title">
        Copyrights <span>JUCC</span>
    </p>
    <div className="social-icons">
        <a href="#">
            <img src={logo} alt="facebook" />
        </a>
        <a href="#">
            <img src={logo} alt="twitter" />
        </a>
        <a href="#">
            <img src={logo} alt="pinterest" />  
        </a>
    </div>
</footer>
    );
}
export default footer;