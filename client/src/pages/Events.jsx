import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../services/api';
import { BACKEND_URL } from '../services/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const { data } = await fetchEvents();
                setEvents(data);
            } catch (err) {
                console.error('Failed to load events', err);
            } finally {
                setLoading(false);
            }
        };
        getEvents();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
            <div className="mb-12 border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Upcoming Events</h2>
                    <p className="text-indigo-600 font-bold mt-2 flex items-center">
                        <span className="w-8 h-1 bg-indigo-600 rounded-full mr-2"></span>
                        Discover what's happening in our club
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {events.length === 0 ? (
                    <div className="col-span-full py-24 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 text-lg italic">No upcoming events found at the moment.</p>
                    </div>
                ) : (
                    events.map((event) => (
                        <Link
                            to={`/events/${event._id}`}
                            key={event._id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                        >
                            <div className={`relative h-56 overflow-hidden ${!event.imageUrl ? 'bg-indigo-600 flex items-center justify-center' : ''}`}>
                                {event.imageUrl ? (
                                    <img
                                        src={event.imageUrl.startsWith('http') ? event.imageUrl : `${BACKEND_URL}${event.imageUrl}`}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="text-white font-black text-4xl opacity-20 transform -rotate-12 select-none">
                                        ROBOTICS
                                    </div>
                                )}
                                <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border backdrop-blur-md shadow-sm ${event.status === 'upcoming'
                                    ? 'bg-emerald-50/90 text-emerald-700 border-emerald-100'
                                    : 'bg-indigo-50/90 text-indigo-700 border-indigo-100'
                                    }`}>
                                    {event.status}
                                </div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">{event.title}</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-600 font-medium">
                                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </div>
                                    <div className="flex items-center text-gray-600 font-medium">
                                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        {event.venue}
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-8">{event.description}</p>

                                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-indigo-600 font-extrabold text-sm uppercase tracking-wider group-hover:underline">View Details</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );

};

export default Events;

