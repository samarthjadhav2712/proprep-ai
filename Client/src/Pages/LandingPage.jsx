import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { motion } from 'framer-motion';
import { Brain, Sparkles, BarChart2, Star, Search, Bell, User, LayoutGrid, List, Pin } from 'lucide-react';

import { APP_FEATURES } from "../utils/data";
import Modal from '../components/Modal';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import { UserContext } from '../context/UserContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

/**
 * DashboardPreview (NEW BLUE THEME)
 * - A high-fidelity, animated mock of the entire application UI with the new blue palette.
 */
const DashboardPreview = () => {
    const PinIcon = (props) => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg> );
    const SparklesIcon = (props) => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73z"></path></svg> );

    const sidebarLinks = [
        { name: 'Dashboard', icon: <LayoutGrid size={18} />, active: false },
        { name: 'My Sessions', icon: <List size={18} />, active: true },
    ];

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }
        }
    };
    const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="w-full max-w-6xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 bg-slate-100 flex min-h-[650px]"
        >
            {/* --- Mock Sidebar --- */}
            <aside className="w-56 bg-white p-6 hidden md:flex flex-col border-r border-slate-200">
                <div className="flex items-center gap-2 mb-8">
                    <Brain className="w-7 h-7 text-blue-600" />
                    <span className="font-bold text-lg text-slate-800">ProPrep AI</span>
                </div>
                <nav className="flex flex-col gap-2">
                    {sidebarLinks.map(link => (
                        <a key={link.name} href="#" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${link.active ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                            {link.icon}
                            {link.name}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* --- Main Content Area --- */}
            <div className="flex-1 min-w-0">
                <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
                    <div className="relative w-1/2">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search sessions..." className="w-full pl-10 pr-4 py-1.5 text-sm bg-slate-100 rounded-md border-transparent focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 text-white flex items-center justify-center font-bold text-sm">
                            JD
                        </div>
                    </div>
                </header>

                <main className="p-6 space-y-6">
                    <motion.div variants={itemVariants} className="rounded-xl bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 p-1">
                        <div className="bg-white rounded-lg p-5">
                            <h2 className="text-xl font-bold text-slate-800">AIML engineer</h2>
                            <p className="text-sm text-slate-500 mt-1">Python, Tensorflow, Pytorch, Scikit learn</p>
                            <div className="flex flex-wrap items-center gap-2 mt-4">
                                <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">Experience: 1 Years</span>
                                <span className="text-xs font-semibold text-teal-800 bg-teal-100 px-3 py-1 rounded-full">10 Q&A</span>
                                <span className="text-xs font-semibold text-rose-800 bg-rose-100 px-3 py-1 rounded-full">Updated: {moment().format('DD MMM YY')}</span>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <h3 className="flex items-center gap-3 text-lg font-bold text-slate-800 mb-4">
                            <Star className="text-amber-500 w-5 h-5" /> Interview Q & A
                        </h3>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
                            <div className="flex items-start justify-between">
                                <p className="text-sm font-semibold text-slate-800 flex-1 pr-4">What is Python, and why is it popular for AIML ?</p>
                                <button className="text-sm font-medium text-blue-600 flex items-center gap-1.5 hover:text-blue-800 transition flex-shrink-0">
                                    <SparklesIcon /> Learn More
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 mt-3">
                            <div className="flex items-start justify-between">
                                <p className="text-sm font-semibold text-slate-800 flex-1 pr-4">Explain the roles of NumPy, Pandas, and Scikit-learn in a typical machine learning project ?</p>
                                <button className="text-sm font-medium text-blue-600 flex items-center gap-1.5 hover:text-blue-800 transition flex-shrink-0">
                                    <SparklesIcon /> Learn More
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 mt-3">
                            <div className="flex items-start justify-between">
                                <p className="text-sm font-semibold text-slate-800 flex-1 pr-4">What is the difference between a list and a tuple in Python ?</p>
                                <button className="text-sm font-medium text-blue-600 flex items-center gap-1.5 hover:text-blue-800 transition flex-shrink-0">
                                    <SparklesIcon /> Learn More
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </motion.div>
    );
};


const LandingPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [openAuthModel, setOpenAuthModel] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const handleCTA = () => user ? navigate('/dashboard') : setOpenAuthModel(true);
    const iconMap = {
        '01': <TargetIcon />, '02': <WindIcon />, '03': <PenIcon />,
    };

    return (
        <>
            <div className="w-full min-h-screen bg-slate-50 font-sans overflow-hidden">
                <header className="flex justify-between items-center px-6 py-4 sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-50 border-b border-slate-200/80">
                    <div className="flex items-center gap-3">
                        <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.6 }}>
                            <Brain className="w-8 h-8 text-cyan-700" />
                        </motion.div>
                        <div className="text-2xl font-semibold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">ProPrep <span className="text-cyan-600">AI</span></div>
                    </div>
                    <div>
                        {user ? (
                            <ProfileInfoCard/>
                        ) : (
                            <button
                                onClick={() => setOpenAuthModel(true)}
                                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
                            >
                                Login / Sign Up
                            </button>
                        )}
                    </div>
                </header>

                <main className="container mx-auto px-6 mt-16">
                    <section className="text-center">
                        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1.5 rounded-full shadow-sm mb-6 font-medium text-sm">
                                <Sparkles className="w-4 h-4" />
                                 AI Powered
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4 max-w-4xl mx-auto">
                                Master interviews with <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-600 to-cyan-300">
                                    AI-Powered Preparation
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                                Role-specific question banks, concept deep-dives, and structured practice — tailored to your career trajectory.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={handleCTA}
                                    className="bg-gradient-to-r from-sky-300 to-blue-700 text-white px-7 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
                                >
                                    Get Started — It's Free
                                </button>
                            </div>
                        </motion.div>
                    </section>
                    
                    <section className="mt-16">
                        <DashboardPreview />
                    </section>
                    
                    <section className="mt-24 mb-24">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">Core Features</h2>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        >
                            {APP_FEATURES.slice(0, 3).map((feature) => (
                                <motion.div
                                    key={feature.id}
                                    className="p-6 rounded-2xl bg-white shadow-md hover:-translate-y-2 transition transform border border-slate-100"
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                >
                                    <div className="mb-4 w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                        <div className="text-blue-600">{iconMap[feature.id] || <BarChart2 className="w-5 h-5" />}</div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-slate-800">{feature.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                </main>

                <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-200">
                    © {new Date().getFullYear()} ProPrep AI · Built with precision.
                </footer>
            </div>
            
            <Modal isOpen={showPreviewModal} onClose={() => setShowPreviewModal(false)}>
                 <div className="p-1 max-w-5xl w-full">
                     <DashboardPreview />
                 </div>
            </Modal>
            <Modal isOpen={openAuthModel} onClose={() => { setOpenAuthModel(false); setCurrentPage('login'); }} hideHeader>
                <div>
                    {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
                    {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
                </div>
            </Modal>
        </>
    );
};

export default LandingPage;

/* --- Self-contained Icon Components --- */
function TargetIcon() { return ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg> ); }
function WindIcon() { return ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h13a4 4 0 0 0 0-8 4 4 0 0 0-3 1" /><path d="M3 18h9a6 6 0 0 0 0-12 6 6 0 0 0-5 3" /></svg> ); }
function PenIcon() { return ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg> ); }