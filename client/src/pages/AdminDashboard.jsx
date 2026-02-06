import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageAnnouncements from '../components/ManageAnnouncements';
import ManageEvents from '../components/ManageEvents';
import ManageGallery from '../components/ManageGallery';
import ManageApplications from '../components/ManageApplications';
import ManageTeam from '../components/ManageTeam';


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('announcements');
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const info = localStorage.getItem('userInfo');
        if (!info) {
            navigate('/admin');
        } else {
            setUserInfo(JSON.parse(info));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin');
    };

    if (!userInfo) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
                    <p className="text-gray-500 text-sm flex items-center">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Logged in as: {userInfo.name}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    <span>Logout</span>
                </button>
            </div>


            {/* Tab Navigation */}
            <div className="flex space-x-2 bg-gray-200 p-1 rounded-xl mb-8 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('announcements')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'announcements'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-300'
                        }`}
                >
                    Announcements
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'events'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-300'
                        }`}
                >
                    Events
                </button>
                <button
                    onClick={() => setActiveTab('gallery')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'gallery'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-300'
                        }`}
                >
                    Photo Gallery
                </button>
                <button
                    onClick={() => setActiveTab('applications')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'applications'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-300'
                        }`}
                >
                    Applications
                </button>
                <button
                    onClick={() => setActiveTab('team')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'team'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-300'
                        }`}
                >
                    Management Team
                </button>
            </div>


            {/* Tab Content */}
            <div className="glass-card border-white/10 p-8">
                {activeTab === 'announcements' && <ManageAnnouncements />}
                {activeTab === 'events' && <ManageEvents />}
                {activeTab === 'gallery' && <ManageGallery />}
                {activeTab === 'applications' && <ManageApplications />}
                {activeTab === 'team' && <ManageTeam />}
            </div>

        </div>
    );
};


export default AdminDashboard;
