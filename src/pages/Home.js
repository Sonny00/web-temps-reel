import React from 'react'; 
import { Row, Col, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import "./home.css"; 


function Home() {
    return (
        <div>
        <header id="header" className="fixed-top d-flex align-items-center header-transparent">
          <div className="container d-flex justify-content-between align-items-center">
          </div>
        </header>
        <section id="hero">
          <div className="hero-container" data-aos="zoom-in" data-aos-delay={100}>
            <h1>Bienvenue sur Moto </h1>
            <h2>Réparation de moto en toute simplicité</h2>
            <a href="/Connexion" className="btn-get-started" id="home-button"> COMMENCER </a>
          </div>
        </section>
      </div>
 

            
    )
}

export default Home; 
