import React, { useEffect, useState, useRef } from 'react';
import AIResponsePreview from '../../Pages/InterviewPrep/components/AIResponsePreview';

// --- Self-contained SVG Icons ---
const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);
const PinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
  </svg>
);
const PinOffIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path><line x1="2" y1="2" x2="22" y2="22"></line>
  </svg>
);
const SparklesIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73z"></path>
    </svg>
);

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            setHeight(contentRef.current.scrollHeight + 20); // Add padding to height
        } else {
            setHeight(0);
        }
    }, [isExpanded, answer]);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className='bg-white rounded-xl mb-4 overflow-hidden py-4 px-5 shadow-sm border border-gray-200/80 group'>
            <div className='flex items-start justify-between cursor-pointer' onClick={toggleExpand}>
                <div className='flex items-start gap-3.5 flex-1'>
                    <span className='text-sm font-semibold text-gray-400 leading-relaxed pt-0.5'>Q.</span>
                    <h3 className='text-sm md:text-base font-semibold text-gray-800 leading-relaxed pr-4'>{question}</h3>
                </div>
                <div className='flex items-center justify-end ml-4 relative'>
                    {/* FIX: Simplified CSS classes for correct hover effect */}
                    <div className={`flex items-center gap-2 transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <button className='flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1.5 rounded-full text-nowrap border border-transparent hover:border-indigo-200' onClick={(e) => { e.stopPropagation(); onTogglePin(); }}>
                            {isPinned ? <PinOffIcon /> : <PinIcon />}
                        </button>
                        <button className='flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1.5 rounded-full text-nowrap border border-transparent hover:border-cyan-200' onClick={(e) => { e.stopPropagation(); setIsExpanded(true); onLearnMore(); }}>
                            <SparklesIcon />
                            <span className='hidden md:block'>Learn More</span>
                        </button>
                    </div>

                    <button className='text-gray-400 hover:text-gray-500 ml-2' onClick={(e) => { e.stopPropagation(); toggleExpand(); }}>
                        <ChevronDownIcon className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                </div>
            </div>
            <div className='overflow-hidden transition-all duration-300 ease-in-out' style={{ maxHeight: `${height}px` }}>
                <div ref={contentRef} className='pt-5'>
                    <AIResponsePreview content={answer} />
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;