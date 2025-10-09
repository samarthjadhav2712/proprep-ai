import React, { useContext, useState } from 'react';
// Assuming these components are in the correct paths as per your project structure
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { useNavigate } from 'react-router-dom';
import uploadImage from '../../utils/uploadImage';

const Signup = ({ setCurrentPage }) => {
    const {user , updateUser}  = useContext(UserContext);
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

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
        
        // signup API call -
        try{
            if(profilePic){
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl  || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER , {
                name : fullName,
                email,
                password,
                profileImageUrl
            });

            const {token} = response.data;

            if(token){
                localStorage.setItem("token" , token);
                updateUser(response.data);
                navigate("/dashboard");
            }
        }
        catch(error){
            console.log(error);
            
            if(error.response && error.response.data.message){
                setError(err.response.data.message);
            }else{
                setError("Something went wrong  , Please try it again !");
            }
        }
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

