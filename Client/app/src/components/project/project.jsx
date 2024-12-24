import React from "react";
import "./project.css";
import arrow from "../../pages/img/arrow.png";
import logo from "../../pages/img/logo.png";
import playctf from "../../pages/img/playctf.png";


function project(){

    const projects = [
        { src: logo, title: "Learn" },
        { src: logo, title: "Practice" },
        { src: playctf, title: "Compete" },
        { src: playctf, title: "Play" },
      ];

return(
    <section className="projects" id="projects">
    <div className="button-container">
    <h3 className="main-btn-proj">Sample Projects</h3>
    </div>
    <div className="content">
    {projects.map((project, index) => (
        <div className="project-card" key={index}>
        <div className="project-image">
            <img src={project.src} alt={project.title} />
        </div>
        <div className="project-info">
            <strong className="project-title">
            <span>{project.title}</span>
            <a href="login.html" className="more-details">
                More Info
            </a>
            </strong>
        </div>
        </div>
    ))}
    </div>
    <div>
    <a href="#ending" className="arrow">
        <img src={arrow} alt="arrow" />
    </a>
    </div>
    </section>
);
}
export default project;