import React from 'react';

import back from '../images/hero-bg1.png'
import image from '../images/19778-removebg-preview.png'

const Main = () => {
    return (
        <section className="relative md:py-10 xxl:py-8 pb-0" >
            <div className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url("${back}")` }} >
            </div>
            <div className="container mx-auto relative px-1">
                <div className=" md:flex min-h-screen xl:min-h-screen">
                    <div className="md:1/2 md:order-1">
                        <img className="md:mt-20 md:mr-10 pt-24 md:pt-1 pt-md-0 w-100" src={image} alt="hero-header" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
