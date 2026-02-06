import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../services/api';

const About = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/api/team`);
                setTeam(data);
            } catch (error) {
                console.error('Error fetching team:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Our Club</h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Empowering students through technology, innovation, and teamwork. Shaping the future of robotics one project at a time.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm">Our Mission</span>
                        <h2 className="text-4xl font-bold text-slate-900">Driving Innovation Forward</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Our club aims to provide a platform for students to explore the fascinating world of robotics, from foundational mechanics to advanced artificial intelligence. We believe in learning by doing and fostering a collaborative environment.
                        </p>
                        <div className="flex items-start space-x-4">
                            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                                <i className="fas fa-lightbulb text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Creative Solutions</h4>
                                <p className="text-slate-500">Encouraging out-of-the-box thinking for complex engineering challenges.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-100 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-5"></div>
                        <h3 className="text-3xl font-bold text-indigo-600 mb-4">Our Vision</h3>
                        <p className="text-slate-700 text-lg">
                            To become a hub of technological excellence where students transform their academic knowledge into real-world innovations that benefit society.
                        </p>
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm">Leadership</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">Meet Our Management Team</h2>
                        <div className="w-20 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member) => (
                                <div key={member._id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        {member.imageUrl ? (
                                            <img
                                                src={member.imageUrl}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                                <i className="fas fa-user text-6xl"></i>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <p className="text-white text-sm font-medium italic">"{member.role}"</p>
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                                        <p className="text-indigo-600 font-semibold text-sm mb-2">{member.role}</p>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest">{member.term}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default About;
