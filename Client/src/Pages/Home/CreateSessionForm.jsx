import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { motion } from 'framer-motion';

const LoaderIcon = () => (
    <svg 
        className="animate-spin h-5 w-5 text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
    >
        <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
        ></circle>
        <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

const CreateSessionForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();
        const { role, experience, topicsToFocus } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill in all required fields.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTION,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 10,
                }
            );

            const generatedQuestions = aiResponse.data;

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestions,
            });

            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data.session._id}`);
                onClose?.(); // Close modal after creation
            }

        } catch (apiError) {
            if (apiError.response?.data?.message) {
                setError(apiError.response.data.message);
            } else {
                console.log(apiError);
                setError("Something went wrong. Please try again!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6"
        >
            <h3 className='text-2xl font-bold text-gray-900'>
                Start a New Interview Journey
            </h3>
            <p className='mt-2 text-sm text-gray-600'>
                Fill out a few quick details and unlock your personalized set of interview questions!
            </p>

            <form onSubmit={handleCreateSession} className="mt-8 space-y-5">
                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role *"
                    placeholder="e.g., Frontend Developer, UI/UX Designer"
                    type="text"
                />
                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Years of Experience *"
                    placeholder="e.g., 2"
                    type="number"
                />
                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics to Focus On *"
                    placeholder="Comma-separated, e.g., React, Node.js, MongoDB"
                    type="text"
                />
                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description (Optional)"
                    placeholder="Any specific goals or notes for this session"
                    type="text"
                    isTextarea={true}
                />

                {error && <p className='text-sm text-red-600 text-center'>{error}</p>}

                <button
                    type="submit"
                    className='w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-75 disabled:cursor-not-allowed transition-all'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <LoaderIcon />
                            <span>Creating...</span>
                        </>
                    ) : (
                        "Create Session"
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateSessionForm;
