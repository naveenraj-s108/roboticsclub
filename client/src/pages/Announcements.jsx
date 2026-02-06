import React, { useEffect, useState } from 'react';
import { fetchAnnouncements } from '../services/api';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAnnouncements = async () => {
            try {
                const { data } = await fetchAnnouncements();
                setAnnouncements(data);
            } catch (err) {
                console.error('Failed to load announcements', err);
            } finally {
                setLoading(false);
            }
        };
        getAnnouncements();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen">
            <div className="mb-12 border-b border-gray-100 pb-8">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Latest Announcements</h2>
                <p className="text-indigo-600 font-bold mt-2 flex items-center">
                    <span className="w-8 h-1 bg-indigo-600 rounded-full mr-2"></span>
                    Stay updated with club news and activities
                </p>
            </div>

            <div className="space-y-8">
                {announcements.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 text-lg italic">No announcements at the moment.</p>
                    </div>
                ) : (
                    announcements.map((announcement) => (
                        <div
                            key={announcement._id}
                            className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="mb-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    {new Date(announcement.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {announcement.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {announcement.message}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Announcements;
