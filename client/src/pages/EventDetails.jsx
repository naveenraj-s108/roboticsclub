import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventById } from '../services/api';
import { BACKEND_URL } from '../services/api';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getEvent = async () => {
            try {
                const { data } = await fetchEventById(id);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        getEvent();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (error || !event) return (
        <div className="max-w-4xl mx-auto px-4 py-32 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h2>
            <Link to="/events" className="text-indigo-600 font-bold hover:underline">Return to Events</Link>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-20 min-h-screen">
            <Link to="/events" className="inline-flex items-center text-indigo-600 font-bold mb-10 hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Back to Events
            </Link>

            <div className={`bg-indigo-600 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 ${!event.imageUrl ? 'pt-20 pb-10 px-10' : ''}`}>
                {event.imageUrl ? (
                    <div className="relative h-[400px]">
                        <img
                            src={event.imageUrl.startsWith('http') ? event.imageUrl : `${BACKEND_URL}${event.imageUrl}`}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 right-10">
                            <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg mb-4 inline-block">
                                {event.status}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">{event.title}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="text-white">
                        <span className="px-4 py-1.5 bg-white/20 text-white rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block backdrop-blur-md">
                            {event.status}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-2">{event.title}</h1>
                        <p className="text-indigo-100 font-medium">Join us for this exciting event!</p>
                    </div>
                )}

                <div className="p-10 md:p-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-1.5 h-8 bg-indigo-600 rounded-full mr-4"></span>
                            About the Event
                        </h2>
                        <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                            {event.description}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Event Logistics</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm mr-4 border border-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Date & Time</div>
                                        <div className="text-gray-900 font-bold">{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm mr-4 border border-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Location</div>
                                        <div className="text-gray-900 font-bold">{event.venue}</div>
                                    </div>
                                </div>
                            </div>

                            {event.registrationLink ? (
                                <a
                                    href={event.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full mt-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-700 hover:scale-[1.02] transition-all flex items-center justify-center text-center"
                                >
                                    Register for this Event
                                </a>
                            ) : (
                                <button className="w-full mt-10 py-4 bg-gray-200 text-gray-500 font-black rounded-2xl cursor-not-allowed">
                                    Registration Closed
                                </button>
                            )}

                            <div className="mt-6 flex items-center justify-center space-x-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Add to Calendar</span>
                            </div>
                        </div>

                        <div className="p-6 border-2 border-dashed border-gray-100 rounded-3xl text-center">
                            <p className="text-sm text-gray-400 font-medium">Questions about this event?</p>
                            <a href="mailto:club@college.edu" className="text-indigo-600 font-bold text-sm hover:underline">Contact Organizer</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

