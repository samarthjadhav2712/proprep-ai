import React, { useState } from 'react';
// Assuming these components are in the correct paths as per your project structure
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const Signup = ({ setCurrentPage }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!fullName) {
            setError("Please enter your full name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        setError("");
        // Sign up API call would go here.
        console.log("Signing up with:", { fullName, email, profilePic });
    };

    return (
        // Using responsive classes to ensure it fits well on all screen sizes without scrolling
        <div className='w-full max-w-md p-8'>
            <div className='text-center mb-6'>
                <h3 className='text-2xl font-semibold text-slate-800'>Create an Account</h3>
                <p className='text-sm text-slate-500 mt-1'>Join us today by entering your details below.</p>
            </div>

            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    label="Full Name"
                    placeholder="John Doe"
                    type="text"
                />
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
                    SIGN UP
                </button>

                <p className='text-sm text-slate-600 mt-4 text-center'>
                    Already have an account?{" "}
                    <button
                        type="button"
                        className='font-semibold text-amber-600 hover:underline'
                        onClick={() => setCurrentPage("login")}
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Signup;

