import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { motion } from 'framer-motion';

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

    if (!user) return null;

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-4 bg-white shadow-lg rounded-2xl px-4 py-3 cursor-pointer transition-all"
        >
            <img
                src={user.profileImageUrl || "/default-profile.png"}
                alt={user.name || "Profile"}
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
            />
            <div className="flex flex-col">
                <span className="text-sm md:text-base font-semibold text-gray-900">{user.name}</span>
                <button
                    onClick={handleLogout}
                    className="mt-1 text-xs md:text-sm font-medium text-cyan-600 hover:text-cyan-500 hover:underline transition-colors"
                >
                    Logout
                </button>
            </div>
        </motion.div>
    );
};

export default ProfileInfoCard;
