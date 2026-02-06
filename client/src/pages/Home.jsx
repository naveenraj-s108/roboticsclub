import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents, fetchAnnouncements } from '../services/api';

const Home = () => {
    const [latestEvent, setLatestEvent] = useState(null);
    const [latestAnnouncement, setLatestAnnouncement] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const eventsRes = await fetchEvents();
                if (eventsRes.data.length > 0) {
                    setLatestEvent(eventsRes.data[0]);
                }
                const announcementsRes = await fetchAnnouncements();
                if (announcementsRes.data.length > 0) {
                    setLatestAnnouncement(announcementsRes.data[0]);
                }
            } catch (err) {
                console.error('Error loading home data:', err);
            }
        };
        loadData();
    }, []);

    return (
        <div className="flex flex-col space-y-16 pb-20">
            {/* Hero Section */}
            <section className="bg-indigo-900 text-white py-24 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Innovating the Future of <span className="text-indigo-300">Robotics</span>
                    </h1>
                    <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                        Welcome to the Robotics Club. A community of engineers, creators, and innovators building the next generation of autonomous systems.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/join" className="px-8 py-3 bg-white text-indigo-700 font-bold rounded-lg hover:bg-indigo-50 transition shadow-lg w-full sm:w-auto">
                            Become a Member
                        </Link>
                        <Link to="/events" className="px-8 py-3 bg-indigo-800 text-white font-bold rounded-lg hover:bg-indigo-700 border border-indigo-600 transition w-full sm:w-auto">
                            View Our Events
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
