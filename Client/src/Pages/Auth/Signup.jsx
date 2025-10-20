import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import uploadImage from '../../utils/uploadImage';

const LoaderIcon = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const Signup = ({ setCurrentPage }) => {
    const { updateUser } = useContext(UserContext);
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!fullName) { setError("Please enter your full name."); return; }
        if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
        if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
        
        setError("");
        setIsLoading(true);

        try {
            let profileImageUrl = "";
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { name: fullName, email, password, profileImageUrl });
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
            <div className='text-center mb-6'>
                <h3 className='text-2xl font-bold text-slate-800'>Create an Account</h3>
                <p className='text-sm text-slate-500 mt-1'>Join us today by entering your details below.</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
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
                    type="email"
                />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="Min. 8 characters"
                    type="password"
                />

                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className='w-full mt-2 flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow duration-300 shadow-md disabled:opacity-70'
                >
                    {isLoading ? <LoaderIcon /> : 'Create Account'}
                </button>

                <p className='text-sm text-slate-600 pt-4 text-center'>
                    Already have an account?{" "}
                    <button
                        type="button"
                        className='font-semibold text-blue-600 hover:underline'
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