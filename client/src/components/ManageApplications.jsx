import React, { useState, useEffect } from 'react';
import { fetchApplications, updateApplicationStatus } from '../services/api';

const ManageApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadApplications = async () => {
        try {
            const { data } = await fetchApplications();
            setApplications(data);
        } catch (err) {
            setError('Failed to fetch applications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateApplicationStatus(id, status);
            loadApplications();
        } catch (err) {
            setError(`Failed to update status to ${status}`);
        }
    };

    if (loading) return <div className="text-center py-10 text-gray-400 font-bold uppercase tracking-widest animate-pulse">Scanning Applications...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-900">Membership Applications</h3>
                </div>
                <div className="text-sm text-gray-500 font-bold border-l-2 border-indigo-500 pl-3">
                    Total: {applications.length} Requests
                </div>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center font-medium mb-6">{error}</div>}

            <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
                <table className="w-full text-left bg-white">
                    <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <tr>
                            <th className="px-8 py-5">Applicant</th>
                            <th className="px-8 py-5">Details</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-8 py-20 text-center text-gray-400 italic">No applications found in the protocol logs.</td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-gray-900 text-lg">{app.name}</div>
                                        <div className="text-gray-500 text-sm">{app.email}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-medium text-gray-700">ID: {app.studentId}</div>
                                        <div className="text-xs text-gray-400 mt-1 uppercase tracking-tight">{app.department} • {app.year}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${app.status === 'approved' ? 'bg-green-50 text-green-700 border-green-100' :
                                                app.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                                    'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {app.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(app._id, 'approved')}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 shadow-md transition-all active:scale-95"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {app.status !== 'rejected' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 shadow-md transition-all active:scale-95"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageApplications;
