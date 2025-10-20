import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Clock, BookOpen } from 'lucide-react'

const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated }) => {
  return (
    <div className="relative w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden">
      {/* Animated background gradient blobs */}
      <div aria-hidden="true" className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-300/40 blur-[120px] rounded-full animate-pulse"></div>
      <div aria-hidden="true" className="absolute top-10 right-0 w-96 h-96 bg-cyan-200/40 blur-[150px] rounded-full animate-pulse"></div>

      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
        {/* Motion container */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="backdrop-blur-md bg-white/70 border border-white/50 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Briefcase className="w-7 h-7 text-indigo-600" />
              {role}
            </h2>
            <p className="text-base text-slate-600">{topicsToFocus}</p>
            {description && (
              <p className="text-sm text-slate-500 leading-relaxed mt-2 max-w-2xl">
                {description}
              </p>
            )}

            {/* Info badges */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 px-3 py-1.5 rounded-full shadow-md">
                <Clock className="w-3.5 h-3.5" />
                Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 rounded-full shadow-md">
                <BookOpen className="w-3.5 h-3.5" />
                {questions} Q&A
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 rounded-full shadow-md">
                <Clock className="w-3.5 h-3.5" />
                Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RoleInfoHeader
