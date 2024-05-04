import React, { useState } from 'react'

function Pagination({ page, setPage, totalPages }) {
    //*********************** Pagination Logic *************** */
    const handlePrevClick = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1)); // Ensure page doesn't go below 1
    };
    const handleNextClick = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages)); // Ensure page doesn't exceed total pages
    };
    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`mr-1 hover:bg-blue-400 hover:text-white text-blue-600 text-xs py-1 px-2 rounded-md ${i === page ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handlePageClick(i)} >
                    {i}
                </button>
            );
        }
        return buttons;
    };
    //*************************************************** */

    return (
        <div>
            <div className="mt-1 me-5 flex justify-end items-center">
                <div>
                    <button className="mr-1 hover:bg-blue-400 hover:text-white text-blue-600 text-xs py-1 px-2 rounded-md"
                        onClick={handlePrevClick}
                        disabled={page === 1} > Prev
                    </button>
                </div>
                <div>
                    {renderPaginationButtons()}
                </div>
                <div>
                    <button className="ml- hover:bg-blue-400 hover:text-white text-blue-600 text-xs py-1 px-2 rounded-md"
                        onClick={handleNextClick}
                        disabled={page === totalPages} > Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pagination
