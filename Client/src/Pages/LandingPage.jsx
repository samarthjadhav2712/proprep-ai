import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_FEATURES } from "../utils/data";
import { Brain } from 'lucide-react';
import Modal from '../components/Modal';
import Login from './Auth/Login';
import Signup from './Auth/Signup'
import { UserContext } from '../context/UserContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

// Importing specific icons from lucide-react
import { Sparkles, Target, Wind, PenSquare, MessageSquareHeart, Presentation } from 'lucide-react';

// A map to associate feature IDs with their corresponding icons
const iconMap = {
  "01": <Target className="h-8 w-8 text-amber-500" />,
  "02": <Wind className="h-8 w-8 text-sky-500" />,
  "03": <PenSquare className="h-8 w-8 text-violet-500" />,
  "04": <MessageSquareHeart className="h-8 w-8 text-rose-500" />,
  "05": <Presentation className="h-8 w-8 text-teal-500" />,
};

const LandingPage = () => {
  const {user}  = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if(!user){
      setOpenAuthModel(true);
    }
    else{
      navigate("/dashboard");
    }
  };

  return (
    <>
    <div className='w-full min-h-screen bg-[#FFFCEF] font-sans'>
      {/* Main Container with relative positioning for pseudo-elements */}
      <div className='relative w-full overflow-hidden'>
        
        {/* Decorative background gradients */}
        <div aria-hidden="true" className="absolute -top-48 left-1/2 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-200/50 to-orange-200/40 blur-3xl"></div>
        <div aria-hidden="true" className="absolute -bottom-96 right-0 -z-10 h-[30rem] w-[40rem] translate-x-1/4 rounded-full bg-gradient-to-tl from-sky-200/50 to-blue-200/40 blur-3xl"></div>

        <div className='container mx-auto px-15 pt-6 pb-20 relative z-10'>
          
          {/* Header */}
          <header className='flex justify-between items-center mb-20'>
            <div className='text-3xl text-black font-bold tracking-tight'><Brain />ProPrep AI</div>
           
            {user ?
             (<ProfileInfoCard/> ) : (<button className='bg-gradient-to-r from-amber-500 to-orange-500 text-sm font-semibold text-white px-7 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300' onClick={()=>setOpenAuthModel(true)}>
              Login / Sign Up
            </button>)}
          </header>

          {/* Centered Hero Section */}
          <section className='flex flex-col items-center text-center pt-8 md:pt-12 pb-24'>
            <div className='flex items-center gap-2 text-md font-semibold bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full border border-amber-200 mb-6 shadow-sm'>
              <Sparkles className="w-4 h-4" /> AI Powered Preparation
            </div>
            <h1 className='text-4xl md:text-6xl text-slate-800 font-extrabold mb-6 leading-tight max-w-3xl tracking-tighter'>
              Ace Your Interviews with <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500'>
                AI-Powered Learning
              </span>
            </h1>
            <p className='text-lg text-slate-600 mb-10 max-w-2xl'>
              Get role-specific questions, dive deep into concepts, and organize your prep. Your ultimate interview toolkit is here.
            </p>
            <button onClick={handleCTA} className='bg-slate-900 text-base font-semibold text-white px-8 py-3.5 rounded-full shadow-lg hover:bg-slate-800 hover:scale-105 transition-all duration-300'>
              Get Started for Free
            </button>
          </section>

          {/* Image Section with enhanced styling */}
          <section className='flex items-center justify-center -mb-32'>
            <div className="relative w-full max-w-4xl">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 blur-2xl"></div>
                <img 
                    src="https://placehold.co/1200x600/FFFCEF/333333?text=App+Screenshot" 
                    alt="App Screenshot" 
                    className='relative w-full rounded-2xl shadow-2xl ring-1 ring-black/10'
                />
            </div>
          </section>
        </div>
      </div>

      {/* Features Section */}
      <div className='w-full bg-white pt-48 pb-24'>
        <div className='container mx-auto px-6'>
          <section>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-800 text-center mb-16 tracking-tight'>
              Features That Make You Shine
            </h2>
            <div className='flex flex-col items-center gap-8'>
              {/* First 3 cards */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl'>
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div key={feature.id} className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100'>
                    <div className='mb-4 w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center'>
                      {iconMap[feature.id]}
                    </div>
                    <h3 className='text-lg font-semibold text-slate-800 mb-3'>{feature.title}</h3>
                    <p className='text-slate-600 leading-relaxed'>{feature.description}</p>
                  </div>
                ))}
              </div>
              {/* Remaining two cards */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl'>
                {APP_FEATURES.slice(3).map((feature) => (
                  <div key={feature.id} className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100'>
                    <div className='mb-4 w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center'>
                       {iconMap[feature.id]}
                    </div>
                    <h3 className='text-lg font-semibold text-slate-800 mb-3'>{feature.title}</h3>
                    <p className='text-slate-600 leading-relaxed'>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className='text-sm bg-slate-50 text-slate-500 text-center p-6'>
        Made with ❤️ by ProPrep AI. Happy Coding!
      </footer>
    </div>

     <Modal
      isOpen = {openAuthModel}
      onClose={()=>{
        setOpenAuthModel(false);
        setCurrentPage("login");
      }}
      hideHeader
     >
      <div>
        {currentPage==="login" && (
          <Login setCurrentPage={setCurrentPage}/>
        )}
        {currentPage ==="signup" && (
          <Signup setCurrentPage={setCurrentPage}/>
        )}
      </div>
     </Modal>

    </>
  );
};

export default LandingPage;

