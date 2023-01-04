import React from 'react'; 
import { Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';    
import Navigation from './../components/Navigation'; 
import moto from './../assets/moto-register.jpg';
import logo from './../assets/ESGI-Moto-logo.png';
import './Inscription.css';


function Inscription() {
    return (
      
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" id="logo-register">
                      <img src={logo} className="img-fluid" alt="logo-moto" />
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example1c">Nom</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example3c">Email</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example4c">Mot de passe</label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-4">
                           <p>
                                 J'ai déjà un compte <a href="/connexion">Me connecter</a>
                              </p>
                         </div>

                        
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-dark btn-lg btn-block" >S'inscrire</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={moto} className="img-fluid" alt="Sample image" />

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

export default Inscription; 
