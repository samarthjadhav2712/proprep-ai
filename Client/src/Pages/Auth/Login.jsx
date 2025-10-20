import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/UserContext';

const LoaderIcon = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }
        setError("");
        setIsLoading(true);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
            const { token } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/dashboard");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong, please try again!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full max-w-sm p-8'>
            <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold text-slate-800'>Welcome Back!</h3>
                <p className='text-sm text-slate-500 mt-1'>Please enter your details to log in.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    placeholder="john@example.com"
                    type="email"
                />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                />

                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className='w-full mt-2 flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow duration-300 shadow-md disabled:opacity-70'
                >
                    {isLoading ? <LoaderIcon /> : 'Login'}
                </button>

                <p className='text-sm text-slate-600 pt-4 text-center'>
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className='font-semibold text-blue-600 hover:underline'
                        onClick={() => setCurrentPage("signup")}
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;