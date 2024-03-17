import React, { useState } from 'react';
import logo from './logo.png'
import './home.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div>
      <nav className={isMobileMenuOpen ? "bg-white navbar navbar-expand-lg navbar-light fixed-top py-3":"navbar navbar-expand-lg navbar-light fixed-top py-3"}>
        <div className="container"><a className="navbar-brand" href="index.html"><img src={logo} width="118" alt="logo" /></a>
          <button className="navbar-toggler" type="button" onClick={toggleMobileMenu}><span className="navbar-toggler-icon"> </span>
          </button>
          <div className="collapse navbar-collapse show">
          </div>
          <ul className={isMobileMenuOpen ? " navbar-nav pt-2 pt-lg-0 font-base d-block" :"navbar-nav pt-2 pt-lg-0 font-base d-none d-lg-flex"}>
            <li className="nav-item px-2"><a className="nav-link" href="#departments">Departments</a></li>
            <li className="nav-item px-2"><a className="nav-link" href="#findUs">Membership</a></li>
            <li className="nav-item px-2"><a className="nav-link" href="#findUs">Help </a></li>
            <li className="nav-item px-2"><a className="nav-link" href="#findUs">Contact</a></li>
            <a className="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4" href="#!">Sign In</a>
          </ul>
        </div> 
      </nav>
    </div>
  );
};

export default Navbar;
