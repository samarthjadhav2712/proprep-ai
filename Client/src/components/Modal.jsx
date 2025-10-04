import React from 'react';

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
    if (!isOpen) return null;

    // This function stops the modal from closing when the content inside is clicked.
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div 
            className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50 backdrop-blur-sm animate-fade-in'
            onClick={onClose} // Close modal when clicking the overlay
        >
            {/* Modal content */}
            <div 
                className='relative flex flex-col bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-md m-4 animate-scale-up'
                onClick={handleContentClick}
            >
                {/* Modal Header */}
                {
                    !hideHeader && (
                        <div className='flex items-center justify-between p-5 border-b border-gray-200'>
                            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
                            <button 
                                type="button" 
                                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center' 
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <svg className='w-4 h-4' aria-hidden="true" xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
                                    {/* Corrected SVG path for a close icon (X) */}
                                    <path 
                                        stroke='currentColor' 
                                        strokeLinecap='round' 
                                        strokeLinejoin='round' 
                                        strokeWidth='2' 
                                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                    />
                                </svg>
                            </button>
                        </div>
                    )
                }
                
                {/* Close button for modals without a header */}
                {
                    hideHeader && (
                        <button 
                            type="button" 
                            className='absolute top-3 right-3 text-gray-400 bg-white/50 hover:bg-gray-200 rounded-full p-1.5'
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                             <svg className='w-4 h-4' aria-hidden="true" xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
                                <path 
                                    stroke='currentColor' 
                                    strokeLinecap='round' 
                                    strokeLinejoin='round' 
                                    strokeWidth='2' 
                                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                />
                            </svg>
                        </button>
                    )
                }

                {/* Modal Body (Scrollable) */}
                <div className='flex-1 p-5 overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
