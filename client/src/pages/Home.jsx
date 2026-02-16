import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents, fetchAnnouncements } from '../services/api';

const Home = () => {
    const [latestEvent, setLatestEvent] = useState(null);
    const [latestAnnouncement, setLatestAnnouncement] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [eventsRes, announcementsRes] = await Promise.all([
                    fetchEvents().catch(err => { console.error('Error fetching events:', err); return { data: [] }; }),
                    fetchAnnouncements().catch(err => { console.error('Error fetching announcements:', err); return { data: [] }; })
                ]);

                if (eventsRes.data && eventsRes.data.length > 0) {
                    setLatestEvent(eventsRes.data[0]);
                }
                if (announcementsRes.data && announcementsRes.data.length > 0) {
                    setLatestAnnouncement(announcementsRes.data[0]);
                }
            } catch (err) {
                console.error('Unexpected error loading home data:', err);
            }
        };
        loadData();
    }, []);

    return (
        <div className="flex flex-col space-y-16 pb-20">
            {/* Hero Section */}
            <section className="bg-indigo-600 text-white py-24 px-4 text-center rounded-b-[3rem] shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                        Building the <span className="text-indigo-200 italic">Future</span> of Robotics
                    </h1>
                    <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Welcome to the Robotics Club. A community of engineers, creators, and innovators shaping the next generation of autonomy.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/join" className="px-10 py-4 bg-white text-indigo-700 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                            Apply for Membership
                        </Link>
                        <Link to="/events" className="px-10 py-4 bg-indigo-500 text-white font-black rounded-2xl hover:bg-indigo-400 border border-indigo-400/30 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                            Explore Events
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Content */}
            <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Latest Announcement */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 items-start flex flex-col">
                    <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-4">Latest Update</span>
                    {latestAnnouncement ? (
                        <>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{latestAnnouncement.title}</h3>
                            <p className="text-gray-600 mb-6 line-clamp-3">{latestAnnouncement.message}</p>
                            <Link to="/announcements" className="text-indigo-600 font-bold hover:text-indigo-700">Read more &rarr;</Link>
                        </>
                    ) : (
                        <p className="text-gray-500 italic">No announcements at the moment.</p>
                    )}
                </div>

                {/* Featured Event */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 items-start flex flex-col">
                    <span className="text-green-600 font-bold text-sm uppercase tracking-wider mb-4">Upcoming Event</span>
                    {latestEvent ? (
                        <>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{latestEvent.title}</h3>
                            <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                                <span>{new Date(latestEvent.date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{latestEvent.venue}</span>
                            </div>
                            <p className="text-gray-600 mb-6 line-clamp-3">{latestEvent.description}</p>
                            <Link to="/events" className="text-green-600 font-bold hover:text-green-700">See details &rarr;</Link>
                        </>
                    ) : (
                        <p className="text-gray-500 italic">No upcoming events scheduled.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
