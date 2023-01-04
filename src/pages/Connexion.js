import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from './../components/Navigation';
import * as mdb from 'mdb-ui-kit'; 
import { Input } from 'mdb-ui-kit'; 
import motologin from './../assets/moto-login.jpg';
import logo from './../assets/ESGI-Moto-logo.png';
import './Connexion.css';
import React, { useState } from 'react';


function Connexion() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name , setName] = useState(''); 
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault(); 
  }
  
  return (
 <section className="vh-100" style={{backgroundColor: '#e0e0e0'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: '1rem'}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={motologin} alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleLogin}>
                        <div className="logo-div">
                          <img src={logo} alt="login form" style={{borderRadius: '1rem 0 0 1rem' }} /> 
                        </div>
                        <div className="form-outline mb-4">
                          <input type="email" id="email" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                          <label className="form-label" htmlFor="email">Email</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="password" id="password" className="form-control form-control-lg"onChange={(e) => setPassword(e.target.value)} value={password} />
                          <label className="form-label" htmlFor="password">Mot de passe</label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit" style={{}}>Se Connecter</button>
                        </div>
                        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Vous n'avez pas de compte ? <a href="/inscription" style={{color: '#393f81'}}>Inscrivez-vous</a></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        
     
    
    )
}

export default Connexion; 
