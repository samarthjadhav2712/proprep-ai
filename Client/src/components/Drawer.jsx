import React from 'react';

// Self-contained SVG Icon to remove lucide-react dependency
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const Drawer = ({ isOpen, onClose, title, children }) => {
    return (
        <div 
            className={`fixed top-[110px] right-0 z-40 h-[calc(100dvh-64px)] p-6 overflow-y-auto transition-transform bg-white w-full md:w-[40vw] shadow-2xl shadow-gray-800/10 border-l border-gray-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            tabIndex={-1} 
            aria-labelledby='drawer-right-label'
        >
            {/* Header */}
            <div className='flex items-center justify-between mb-6'>
                <h5 id="drawer-right-label" className='flex items-center text-base font-semibold text-gray-800'>
                    {title}
                </h5>
                <button
                    type="button"
                    onClick={onClose}
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center'
                >
                    <XIcon />
                    <span className="sr-only">Close menu</span>
                </button>
            </div>
            
            {/* Body content */}
            <div className='text-lg mb-6'>
                {children}
            </div>
        </div>
    );
};

export default Drawer;