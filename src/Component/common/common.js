import React from 'react'

function common() {
    const [isModalVisible, setisModal] = React.useState(true)
    return (
        <div>
            {isModalVisible && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="relative mx-3 p-4 w-full max-w-md md:h-auto bg-white rounded-lg shadow dark:bg-white">
                        < button className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={showModal} ><IoMdClose className='w-6 h-6 font-bold' />
                        </button>
                        <div className="p-4 text-center">
                            <GiConfirmed className='text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto' />
                            <p className="mb-4 text-gray-600 dark:text-gray-600">Are you sure you want to delete this item?</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={showModal} > No, cancel
                                </button>
                                <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                // onClick={handleDelete}
                                >
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default common
