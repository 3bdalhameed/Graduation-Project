// src/components/Home.js
import React, { useEffect } from 'react';
import "./home.css";
import logo from "./img/logo.png";
import hacker from "./img/hacker.png";
import Navbar from '../components/Navbar/navbar';



function Home() {
    return (
        <>
    <header>
        <a href="HomePage.html" className="logo">
            <img src={logo} alt="logo" />
        </a>
        <nav className="navigation">
          <a href="GetStart">Get Started</a>
          <a href="our-team">Our Team</a>
          <a href="contact_us">Contact</a>
          <a href="about-us">About Us</a>
        </nav>
    </header>
      {/* Web beginning */}
      <section className="main">
        <div>
          <p><span>JuCC</span></p>
          <a href="#projects" className="main-btn">Improving Your Development Experience</a>
        </div>
        <div>
          <img src={hacker} alt="main" />
        </div>
      </section>

      {/* Genres */}
      <section className="projects" id="projects">
        <div className="button-container">
          <h3 className="main-btn-proj">Sample Projects</h3>
        </div>
        
        <div className="content">
          {[
            { src:{logo}, title: 'Fly Through The Sky' },
            { src:{logo}, title: 'Online Book Store' },
            { src:{logo}, title: 'Liquid Transition' },
            { src:{logo}, title: 'Downtown Tech' },
            { src:{logo}, title: 'Dashboard UI' }
          ].map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image">
                <img src={logo} alt="project" />
              </div>
              <div className="project-info">
                <strong className="project-title">
                  <span>{project.title}</span>
                  <a href="login.html" className="more-details">More Info</a>
                </strong>
              </div>
            </div>
          ))}
        </div>
        <div>
          <a href="#ending">
            <img src={logo} alt="arrow" style={{ position: 'relative', width: '7%', top: '-5vw', right: '-75vw' }} />
          </a>
        </div>
      </section>

      {/* Ending Section */}
      <section className="cards-contact contact" id="ending">
        <div className="button-container2">
          <h3 className="main-btn-work">Let's Work Together!</h3>
        </div>
        <div className="content">
          <div className="card">
            <div className="icon">
              <i className="fas fa-phone"></i>
            </div>
            <div className="info">
              <h3>Phone</h3>
              <p>0799999999</p>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="info">
              <h3>Email</h3>
              <p>WebPen@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-title">Copyrights <span>WebPen</span></p>
        <div className="social-icons">
          <a href="#"><img src={logo} alt="facebook" /></a>
          <a href="#"><img src={logo} alt="twitter" /></a>
          <a href="#"><img src={logo} alt="pinterest" /></a>
        </div>
      </footer>
        </>
    );
}

export default Home;