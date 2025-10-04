import React, { useState } from 'react';

// Assuming these are the correct paths in your project
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';


const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password.");
            return;
        }

        setError("");
        // Add your login logic here
        console.log("Logging in with:", email);

        // login API call => try & catch block . 
    };

    return (
        // This container is now flexible and will fit perfectly inside your modal
        <div className='w-full max-w-md p-8'>
            <div className='text-center mb-8'>
                <h3 className='text-2xl font-semibold text-slate-800'>Welcome Back</h3>
                <p className='text-sm text-slate-500 mt-1'>Please enter your details to log in.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    placeholder="john@example.com"
                    type="text"
                />

                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="Min 8 characters"
                    type="password"
                />

                {error && <p className='text-red-500 text-sm text-center -mt-2'>{error}</p>}

                <button
                    type="submit"
                    className='w-full mt-2 bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-sm'
                >
                    LOGIN
                </button>

                <p className='text-sm text-slate-600 mt-4 text-center'>
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className='font-semibold text-amber-600 hover:underline'
                        onClick={() => {
                            setCurrentPage("signup");
                        }}
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;

