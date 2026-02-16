import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../services/api';
import { BACKEND_URL } from '../services/api';
import { optimizeImage } from '../utils/performance';

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
                            className="group bg-indigo-900 rounded-[2rem] overflow-hidden shadow-2xl border border-indigo-800/50 transition-all duration-500 hover:-translate-y-3 flex flex-col relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className={`relative h-60 overflow-hidden ${!event.imageUrl ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center' : ''}`}>
                                {event.imageUrl ? (
                                    <img
                                        src={event.imageUrl.startsWith('http') ? optimizeImage(event.imageUrl, 'w_800,c_fill') : `${BACKEND_URL}${event.imageUrl}`}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-white font-black text-4xl opacity-10 transform -rotate-12 select-none uppercase tracking-tighter">
                                            Robotics
                                        </div>
                                    </div>
                                )}
                                <div className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg transition-colors ${event.status === 'upcoming'
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                                    }`}>
                                    {event.status}
                                </div>
                            </div>

                            <div className="p-10 flex-grow flex flex-col relative z-10">
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-indigo-300 transition-colors leading-tight tracking-tight drop-shadow-sm">{event.title}</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center text-indigo-200/80 font-bold text-xs uppercase tracking-widest">
                                        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-300 mr-4 border border-indigo-500/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </div>
                                    <div className="flex items-center text-indigo-200/80 font-bold text-xs uppercase tracking-widest">
                                        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-300 mr-4 border border-indigo-500/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        {event.venue}
                                    </div>
                                </div>

                                <p className="text-indigo-100/70 text-sm leading-relaxed line-clamp-2 mb-10 font-medium">{event.description}</p>

                                <div className="mt-auto pt-8 border-t border-indigo-800/50 flex justify-between items-center group/btn">
                                    <span className="text-white font-black text-xs uppercase tracking-[0.2em] group-hover/btn:text-indigo-300 transition-colors">Go to Event</span>
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-white group-hover/btn:bg-indigo-500 group-hover/btn:scale-110 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
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

