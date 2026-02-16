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

            <div className={`bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 ${!event.imageUrl ? 'pt-20 pb-10 px-10' : ''}`}>
                {event.imageUrl ? (
                    <div className="relative h-[450px]">
                        <img
                            src={event.imageUrl.startsWith('http') ? event.imageUrl : `${BACKEND_URL}${event.imageUrl}`}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                        <div className="absolute bottom-12 left-12 right-12">
                            <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg mb-6 inline-block">
                                {event.status}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight">{event.title}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="text-slate-900">
                        <span className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
                            {event.status}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black leading-tight mb-4 tracking-tight">{event.title}</h1>
                        <p className="text-slate-500 text-xl font-medium">Join us for this exciting event!</p>
                    </div>
                )}

                <div className="p-10 md:p-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                            <span className="w-2 h-8 bg-indigo-600 rounded-full mr-4"></span>
                            Event Description
                        </h2>
                        <div className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                            {event.description}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Event Logistics</h3>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="p-4 bg-white rounded-2xl text-indigo-600 shadow-sm mr-5 border border-slate-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Date & Time</div>
                                        <div className="text-slate-900 font-bold text-lg">{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="p-4 bg-white rounded-2xl text-indigo-600 shadow-sm mr-5 border border-slate-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Location</div>
                                        <div className="text-slate-900 font-bold text-lg">{event.venue}</div>
                                    </div>
                                </div>
                            </div>

                            {event.registrationLink ? (
                                <a
                                    href={event.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full mt-10 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-700 hover:scale-[1.02] transition-all flex items-center justify-center text-center tracking-wide"
                                >
                                    Register for this Event
                                </a>
                            ) : (
                                <button className="w-full mt-10 py-5 bg-slate-200 text-slate-400 font-black rounded-2xl cursor-not-allowed">
                                    Registration Closed
                                </button>
                            )}

                            <div className="mt-8 flex items-center justify-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Add to Calendar</span>
                            </div>
                        </div>

                        <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] text-center">
                            <p className="text-sm text-slate-400 font-medium mb-2">Questions about this event?</p>
                            <a href="mailto:club@college.edu" className="text-indigo-600 font-bold text-sm hover:underline">Contact Organizer</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

