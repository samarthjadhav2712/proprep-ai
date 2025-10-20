import React from 'react';
import { getInitials } from '../../utils/helper';

// Lucide-style Trash Icon
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const SummaryCard = ({
  colors,
  role,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="group relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.015] cursor-pointer overflow-hidden"
    >
      {/* Header Section */}
      <div
        className="relative rounded-t-2xl p-5 flex items-start gap-4"
        style={{
          background: `linear-gradient(135deg, ${colors.bgcolor} 0%, ${colors.card} 100%)`,
        }}
      >
        {/* Role Badge */}
        <div className="flex-shrink-0 w-14 h-14 bg-white/95 rounded-xl flex items-center justify-center text-lg font-bold text-gray-900 shadow-md">
          {getInitials(role)}
        </div>

        {/* Role Info */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-[18px] font-semibold text-gray-900">{role}</h2>
          <p className="text-[13px] text-gray-800 mt-0.5 font-medium">
            {questions} Q&A • {experience} {experience === 1 ? 'Year' : 'Years'}
          </p>
        </div>

        {/* Delete Button */}
        <button
          className="absolute top-3 right-3 z-20 flex items-center gap-1.5 text-xs font-semibold 
          text-rose-600 bg-white/90 hover:bg-rose-50 hover:text-rose-700 transition-all duration-300 
          border border-rose-100 rounded-full px-2.5 py-1.5 shadow-sm opacity-100 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <TrashIcon />
          <span>Delete</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[11px] font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
            Exp: {experience} {experience === 1 ? 'Year' : 'Years'}
          </span>
          <span className="text-[11px] font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
            {questions} Q&A
          </span>
          <span className="text-[11px] font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
            Updated: {lastUpdated}
          </span>
        </div>

        <p className="text-[13px] text-gray-600 font-medium leading-snug line-clamp-2">
          {description || 'No description provided.'}
        </p>
      </div>

      {/* Subtle Glow Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-6 -right-8 w-24 h-24 bg-gradient-to-br from-cyan-200 to-lime-200 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>
    </div>
  );
};

export default SummaryCard;
