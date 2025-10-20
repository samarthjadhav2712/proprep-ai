import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import RoleInfoHeader from './components/RoleInfoHeader';
import QuestionCard from '../../components/Cards/QuestionCard';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loaders/SkeletonLoader';

// Inline SVG Icons
const CollapseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const LoaderIcon = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
             5.291A7.962 7.962 0 014 12H0c0 3.042 
             1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const AlertCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

// Toast
const CustomToast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] 
        flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg 
        backdrop-blur-md border ${
        type === 'error'
            ? 'bg-gradient-to-r from-rose-500/80 to-red-600/80 text-white border-red-300/30'
            : 'bg-gradient-to-r from-indigo-500/80 to-cyan-500/80 text-white border-cyan-300/30'
        }`}
    >
    <span className="font-medium text-center">{message}</span>
</motion.div>
  );
};

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);
  const [toastInfo, setToastInfo] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToastInfo({ show: true, message, type });
  };

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      setSessionData(response.data?.session || null);
    } catch (error) {
      setErrorMsg('Failed to fetch session details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg('');
      setExplanation(null);
      setIsExplanationLoading(true);
      setOpenLearnMoreDrawer(true);
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
      if (response.data) setExplanation(response.data);
    } catch {
      setErrorMsg('Failed to generate explanation, please try again later.');
    } finally {
      setIsExplanationLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (id) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(id));
      if (response.data?.question) fetchSessionDetailsById();
    } catch {
      console.error('Error toggling pin');
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTION, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      });
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });
      if (response.data) {
        showToast('Added 10 more Q&A!');
        fetchSessionDetailsById();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong!';
      showToast(message, 'error');
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  return (
    <DashboardLayout>
      <AnimatePresence>
        {toastInfo.show && (
          <CustomToast
            message={toastInfo.message}
            type={toastInfo.type}
            onClose={() => setToastInfo({ show: false, message: '', type: 'success' })}
          />
        )}
      </AnimatePresence>

      {/* Page Background with Gradient Layers */}
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-tl from-cyan-100/40 via-white to-indigo-100/50 blur-3xl -z-10"></div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[70vh] text-slate-600 text-lg">
            Loading Session...
          </div>
        ) : !sessionData ? (
          <div className="flex items-center justify-center h-[70vh] text-rose-500 font-medium">
            {errorMsg || 'Session not found.'}
          </div>
        ) : (
          <>
            <div className="container mx-2 px-4 py-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <RoleInfoHeader
                  role={sessionData.role || ''}
                  topicsToFocus={sessionData.topicsToFocus || ''}
                  experience={sessionData.experience || '-'}
                  questions={sessionData.questions?.length || 0}
                  description={sessionData.description || ''}
                  lastUpdated={sessionData.updatedAt ? moment(sessionData.updatedAt).format('DD MMM YYYY') : ''}
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold text-slate-800 mt-10 mb-6"
              >
                ✨ Interview Q & A
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className={`col-span-12 transition-all duration-300 ${openLearnMoreDrawer ? 'md:col-span-7' : 'md:col-span-8'}`}>
                  <AnimatePresence>
                    {sessionData.questions?.map((data, index) => (
                      <motion.div
                        key={data._id || index}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                      >
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          onLearnMore={() => generateConceptExplanation(data.question)}
                          isPinned={data?.isPinned}
                          onTogglePin={() => toggleQuestionPinStatus(data._id)}
                        />

                        {sessionData.questions?.length === index + 1 && (
                          <div className="flex items-center justify-center mt-8">
                            <button
                              className="flex items-center gap-3 text-sm text-white font-medium bg-gradient-to-r from-cyan-600 to-indigo-600 px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-60"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? <LoaderIcon /> : <CollapseIcon className="text-white" />}
                              Load More Questions
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="hidden md:block md:col-span-4"></div>
              </div>
            </div>

            <Drawer
              isOpen={openLearnMoreDrawer}
              onClose={() => setOpenLearnMoreDrawer(false)}
              title={isExplanationLoading ? 'Generating...' : (explanation?.title || 'Learn More')}
            >
              {isExplanationLoading && <SkeletonLoader />}
              {!isExplanationLoading && errorMsg && (
                <p className="flex items-start gap-3 text-sm text-amber-600 font-medium p-4 bg-amber-50 rounded-lg">
                  <AlertCircleIcon className="mt-0.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </p>
              )}
              {!isExplanationLoading && explanation && (
                <AIResponsePreview content={explanation?.explanation} />
              )}
            </Drawer>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
