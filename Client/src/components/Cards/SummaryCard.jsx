import React from 'react'
import { getInitials } from '../../utils/helper';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

const SummaryCard = ({ colors, role, experience, questions, description, lastUpdated, onSelect, onDelete }) => {
  return (
    <div className='bg-white border border-gray-200/80 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow shadow-gray-100 relative group' onClick={onSelect}>
      <div className='rounded-lg p-4' style={{ background: colors.bgcolor }}>
        <div className='flex items-start'>
          <div className='flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4'>
            <span className='text-lg font-semibold text-black'>{getInitials(role)}</span>
          </div>
          <div>
            <h2 className='text-[17px] font-medium'>{role}</h2>
          </div>
        </div>
        <button className='opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded-full border border-rose-100 absolute top-2 right-2' onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <TrashIcon />
          <span>Delete</span>
        </button>
      </div>
      <div className='px-3 pb-3 pt-1'>
        <div className='flex items-center flex-wrap gap-2 mt-3'>
          <div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>
          <div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
            {questions} Q&A
          </div>
          <div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
            Last Updated: {lastUpdated}
          </div>
        </div>
        <p className='text-xs text-gray-500 font-medium line-clamp-2 mt-3'>{description}</p>
      </div>
    </div>
  )
};
export default SummaryCard
