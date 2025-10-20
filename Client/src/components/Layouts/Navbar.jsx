import React from 'react'
import { Link } from 'react-router-dom'
import { Brain } from 'lucide-react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-white/40 shadow-sm"
    >
      <div className="container mx-auto px-6 md:px-6 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-8 h-8 bg-gradient-to-r blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            <Brain className="w-7 h-7 text-cyan-700 relative z-10 group-hover:scale-105 transition-transform duration-300" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
            ProPrep <span className="text-cyan-600">AI</span>
          </h2>
        </Link>

        {/* Profile / Actions */}
        <div className="flex items-center gap-4">
          <ProfileInfoCard />
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
