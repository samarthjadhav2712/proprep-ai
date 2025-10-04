import React, { useState } from 'react';

// Self-contained SVG icon for an open eye to replace FaRegEye
const EyeIcon = ({ size = 20, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

// Self-contained SVG icon for a slashed eye to replace FaRegEyeSlash
const EyeSlashIcon = ({ size = 20, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);


const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col gap-1">
            <label className='text-sm font-medium text-slate-700'>{label}</label>
            <div className='flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-amber-400 transition-all duration-300'>
                <input 
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400'
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <button type="button" onClick={toggleShowPassword} className="ml-2 flex-shrink-0">
                        {showPassword ? (
                            <EyeIcon className="text-amber-600" />
                        ) : (
                            <EyeSlashIcon className="text-slate-400" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;