import React from 'react';
import back from '../home/hero-bg1.png'
import image from '../home/19778-removebg-preview.png'

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
                    <div className="col-md-5 col-xl-6 col-xxl-7 order-0 order-md-1 text-end">
                        <img className="pt-7 pt-md-0 w-100" src={image} alt="hero-header" />
                    </div>
                    {/* <div className="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center py-6">
              <h1 className="fw-light font-base fs-6 fs-xxl-7">We're <strong>determined </strong>for<br />your&nbsp;<strong>better life.</strong></h1>
              <p className="fs-1 mb-5">You can get the care you need 24/7 – be it online or in <br />person. You will be treated by caring specialist doctors. </p><a className="btn btn-lg btn-primary rounded-pill" href="#!" role="button">Make an Appointment</a>
            </div> */}
                    <div className="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center py-6">
                        <div className="flex justify-center bg-transparent">
                                <form className="space-y-4">
                                <h6 className="flex font-base fs-3 "><strong>Login Signup</strong></h6>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-full bg-transparent"
                                            placeholder="Username"/>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2 rounded-full bg-transparent"
                                            placeholder="Password"/>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                                        Login
                                    </button>
                                </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Main;
