import React, { useEffect, useState } from 'react'
import {CARD_BG} from "../../utils/data";
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import SummaryCard from '../../components/Cards/SummaryCard';
import ConfirmationModal from '../../components/Cards/ConfirmationModal';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-2xl text-white">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- Main Dashboard Component ---
const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const fetchAllSessions = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
    const sessionsData = Array.isArray(response.data)
      ? response.data
      : response.data?.data || []; // fallback if nested under 'data'
    setSessions(sessionsData);
  } catch (err) {
    console.error("Error fetching session data", err);
    setSessions([]); // fail-safe reset
  }
};

  const deleteSession = async () => {
    if (!openDeleteAlert.data) return;
    try {
        await axiosInstance.delete(`${API_PATHS.SESSION.DELETE}/${openDeleteAlert.data._id}`);
        fetchAllSessions(); // Refetch to update UI
    } catch (err) {
        console.error("Error deleting session", err);
    } finally {
        setOpenDeleteAlert({ open: false, data: null });
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || ""}
              description={data?.description || ""}
              lastUpdated={formatDate(data?.updatedAt)}
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>
        <button
          className='h-14 md:h-12 w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:from-black hover:to-gray-800 transition-all cursor-pointer shadow-lg hover:shadow-xl fixed bottom-10 md:bottom-20 right-10 md:right-20'
          onClick={() => setOpenCreateModal(true)}
        >
          <PlusIcon />
          <span>Add new</span>
        </button>
      </div>
      <ConfirmationModal
        isOpen={openDeleteAlert.open}
        message={`Are you sure you want to delete the "${openDeleteAlert.data?.role}" session?`}
        onConfirm={deleteSession}
        onCancel={() => setOpenDeleteAlert({ open: false, data: null })}
      />
    </DashboardLayout>
  )
}

export default Dashboard
