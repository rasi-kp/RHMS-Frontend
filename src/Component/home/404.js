import React from 'react';
import back from '../images/hero-bg1.png';
import error404Image from '../images/error.png'; // Import the 404 image

const Main = () => {
    return (
        <section className="relative md:py-10 xxl:py-8 pb-0">
            {/* Background image */}
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url("${back}")` }} />

            {/* Container */}
            <div className="container mx-auto relative px-1 flex items-center justify-center"> {/* Center content */}
                <div className="text-center">
                    {/* 404 image */}
                    <img src={error404Image} alt="404 Not Found" className="mx-auto h-80" />
                    <h1 className="text-4xl font-bold ">Oops! Page Not Found</h1>
                    <p className="text-lg mt-1">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                </div>
            </div>
        </section>
    );
};

export default Main;
