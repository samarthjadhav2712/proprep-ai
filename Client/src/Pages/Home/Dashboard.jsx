import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import SummaryCard from '../../components/Cards/SummaryCard'
import ConfirmationModal from '../../components/Cards/ConfirmationModal'
import CreateSessionForm from './CreateSessionForm'
import Modal from '../../components/Modal'
import { CARD_BG } from '../../utils/data'

// --- Elegant Plus Icon ---
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)

// --- Core Dashboard Component ---
const Dashboard = () => {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null })

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data?.sessions || [])
    } catch (err) {
      console.error('Error fetching sessions', err)
      setSessions([])
    }
  }

  // --- In Dashboard.jsx ---

const deleteSession = async () => {
    const sessionToDelete = openDeleteAlert.data;
    if (!sessionToDelete) return;

    // Keep a backup of the current sessions in case the API call fails
    const originalSessions = [...sessions];

    // 1. OPTIMISTIC UPDATE: Remove the session from the UI immediately
    setSessions(currentSessions =>
        currentSessions.filter(session => session._id !== sessionToDelete._id)
    );

    // 2. Close the confirmation modal right away
    setOpenDeleteAlert({ open: false, data: null });

    // 3. Make the API call in the background
    try {
        await axiosInstance.delete(`${API_PATHS.SESSION.DELETE}/${sessionToDelete._id}`);
        // If successful, we don't need to do anything else. The UI is already updated!
        
    } catch (err) {
        console.error("Error deleting session:", err);
        
        // 4. ON FAILURE: Revert the UI to its original state
        setSessions(originalSessions);
        
        // Optional but recommended: Show an error message to the user
        alert(`Failed to delete the "${sessionToDelete.role}" session. Please try again.`);
    }
};

  useEffect(() => {
    fetchAllSessions()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative min-h-screen px-6 md:px-10 py-10 bg-gradient-to-br from-white via-gray-50 to-gray-100"
      >
        {/* Header Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-gradient-to-r from-indigo-200/40 to-cyan-200/40 blur-[100px] rounded-full -z-10"></div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Your <span className="text-cyan-600">Interview Prep Sessions</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage, review, and expand your personalized AI interview experiences.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 md:mt-0 flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={() => setOpenCreateModal(true)}
          >
            <PlusIcon />
            Add New Session
          </motion.button>
        </div>

        {/* Sessions Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {sessions?.length > 0 ? (
              sessions.map((data, index) => (
                <motion.div
                  key={data._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SummaryCard
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ''}
                    topicsToFocus={data?.topicsToFocus || ''}
                    experience={data?.experience || '-'}
                    questions={data?.questions?.length || ''}
                    description={data?.description || ''}
                    lastUpdated={formatDate(data?.updatedAt)}
                    onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                    onDelete={() => setOpenDeleteAlert({ open: true, data })}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-gray-500 py-10"
              >
                No sessions found. Start by creating a new one!
              </motion.div>
            )}
          </div>
        </AnimatePresence>

        {/* Delete Confirmation */}
        <ConfirmationModal
          isOpen={openDeleteAlert.open}
          message={`Are you sure you want to delete the "${openDeleteAlert.data?.role}" session?`}
          onConfirm={deleteSession}
          onCancel={() => setOpenDeleteAlert({ open: false, data: null })}
        />

        {/* Create Session Modal */}
        <Modal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          hideHeader
        >
          <div className="p-2">
            <CreateSessionForm />
          </div>
        </Modal>
      </motion.div>
    </DashboardLayout>
  )
}

export default Dashboard
 