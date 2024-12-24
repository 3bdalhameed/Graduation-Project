import React from "react";
import "./main.css";
import hacker from "../../pages/img/hacker.png";

function main(){
    return (
    <section className="main">
    <div>
      <p>
        <span>JuCC</span>
      </p>
      <a href="#projects" className="main-btn">
        Improving Your Development Experience
      </a>
    </div>
    <div>
      <img src={hacker} alt="main visual" />
    </div>
  </section>
    );
}
export default main;