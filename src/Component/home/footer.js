import React from 'react';

function Footer() {
  return (
    <div>
      <section className="py-4 bg-[#283779]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:justify-evenly">
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm my-2 font-semibold text-gray-200">
                All rights Reserved &copy; RHMS, 2024
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm my-2 text-center md:text-right text-gray-200">
                Made with &nbsp;
                <svg
                  className="inline-block align-text-bottom text-primary"
                  xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#F95C19" viewBox="0 0 16 16">
                  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"></path>
                </svg>
                &nbsp;by&nbsp;
                <a className="font-semibold text-info hover:text-white" href="https://rasikp.in/" target="_blank" rel="noopener noreferrer">Rasi </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
