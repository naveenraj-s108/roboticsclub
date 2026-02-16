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

            <div className={`bg-[#0a0c10] rounded-[3.5rem] overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)] border border-white/5 ${!event.imageUrl ? 'pt-24 pb-12 px-12' : ''}`}>
                {event.imageUrl ? (
                    <div className="relative h-[550px]">
                        <img
                            src={event.imageUrl.startsWith('http') ? event.imageUrl : `${BACKEND_URL}${event.imageUrl}`}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/40 to-transparent"></div>
                        <div className="absolute bottom-16 left-16 right-16">
                            <span className="px-5 py-2 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl mb-8 inline-block">
                                {event.status}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter drop-shadow-2xl">{event.title}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="text-white">
                        <span className="px-6 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block border border-indigo-500/20">
                            {event.status}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6 tracking-tighter">{event.title}</h1>
                        <p className="text-indigo-200/60 text-2xl font-medium tracking-tight">Join us for this exciting chapter of robotics innovation.</p>
                    </div>
                )}

                <div className="p-10 md:p-24 grid grid-cols-1 lg:grid-cols-3 gap-20">
                    <div className="lg:col-span-2">
                        <div className="inline-flex items-center space-x-4 mb-10">
                            <div className="w-3 h-10 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                            <h2 className="text-3xl font-black text-white tracking-tight italic">Mission Briefing</h2>
                        </div>
                        <div className="text-indigo-50/80 text-xl leading-relaxed whitespace-pre-wrap font-medium max-w-3xl">
                            {event.description}
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
                            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-10">Intelligence</h3>

                            <div className="space-y-10">
                                <div className="flex items-center">
                                    <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 mr-6 border border-indigo-500/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Timeline</div>
                                        <div className="text-white font-bold text-lg">{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 mr-6 border border-indigo-500/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Base Location</div>
                                        <div className="text-white font-bold text-lg">{event.venue}</div>
                                    </div>
                                </div>
                            </div>

                            {event.registrationLink ? (
                                <a
                                    href={event.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full mt-12 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:scale-[1.05] transition-all flex items-center justify-center text-center tracking-widest uppercase text-xs"
                                >
                                    Synchronize Access
                                </a>
                            ) : (
                                <button className="w-full mt-12 py-5 bg-white/5 text-white/20 font-black rounded-2xl cursor-not-allowed border border-white/5 uppercase text-xs tracking-widest">
                                    Access Terminated
                                </button>
                            )}
                        </div>

                        <div className="p-10 border border-white/5 rounded-[2.5rem] text-center bg-white/[0.01]">
                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-4">Transmission Error?</p>
                            <a href="mailto:club@college.edu" className="text-indigo-400 font-bold text-sm hover:text-indigo-300 transition-colors">Contact Command Center</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

