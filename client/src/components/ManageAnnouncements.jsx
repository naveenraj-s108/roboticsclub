import React, { useState, useEffect } from 'react';
import { fetchAnnouncements, createAnnouncement, deleteAnnouncement } from '../services/api';

const ManageAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getAnnouncements();
    }, []);

    const getAnnouncements = async () => {
        try {
            const { data } = await fetchAnnouncements();
            setAnnouncements(data);
        } catch (err) {
            setError('Failed to fetch announcements');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await createAnnouncement({ title, message });
            setSuccess('Announcement posted successfully!');
            setTitle('');
            setMessage('');
            getAnnouncements();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post announcement');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;

        try {
            await deleteAnnouncement(id);
            setAnnouncements(announcements.filter(a => a._id !== id));
        } catch (err) {
            alert('Failed to delete announcement');
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-6">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-800">Create New Announcement</h3>
                </div>

                {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>}
                {success && <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {success}
                </div>}

                <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            placeholder="Announcement Title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            placeholder="Write the announcement message here..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50"
                    >
                        {loading ? 'Posting...' : 'Post Announcement'}
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-6">
                    <div className="w-1.5 h-6 bg-gray-400 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-800">Existing Announcements</h3>
                </div>
                <div className="space-y-4">
                    {announcements.length === 0 ? (
                        <p className="text-gray-500 text-center py-10 italic border-2 border-dashed border-gray-100 rounded-xl">No announcements found.</p>
                    ) : (
                        announcements.map((a) => (
                            <div key={a._id} className="flex justify-between items-start p-6 border border-gray-100 rounded-xl bg-gray-50 hover:border-indigo-200 transition-all group">
                                <div className="max-w-3xl">
                                    <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase text-lg">{a.title}</h4>
                                    <p className="text-gray-600 mt-2 leading-relaxed">{a.message}</p>
                                    <p className="text-xs text-gray-400 mt-4 font-medium">{new Date(a.createdAt).toLocaleDateString()}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(a._id)}
                                    className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );


};

export default ManageAnnouncements;
