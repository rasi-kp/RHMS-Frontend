import React from 'react';
import back from './hero-bg.png'
import image from './hero.png'

const Main = () => {
  return (
    <section className="py-xxl-10 pb-0" id="home">
        <div
          className="bg-holder bg-size"
          style={{
            backgroundImage: `url("${back}")`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover'
          }}
        ></div>

        <div className="container">
          <div className="row min-vh-xl-100 min-vh-xxl-25">
            <div className="col-md-5 col-xl-6 col-xxl-7 order-0 order-md-1 text-end"><img className="pt-7 pt-md-0 w-100" src={image} alt="hero-header" /></div>
            <div className="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center py-6">
              <h1 className="fw-light font-base fs-6 fs-xxl-7">We're <strong>determined </strong>for<br />your&nbsp;<strong>better life.</strong></h1>
              <p className="fs-1 mb-5">You can get the care you need 24/7 – be it online or in <br />person. You will be treated by caring specialist doctors. </p><a className="btn btn-lg btn-primary rounded-pill" href="#!" role="button">Make an Appointment</a>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Main;
