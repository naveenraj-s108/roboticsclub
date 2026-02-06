import React, { useState } from 'react';
import { submitApplication } from '../services/api';
import axios from 'axios';


const Join = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentId: '',
        department: '',
        year: 'First Year',
        skills: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [checkId, setCheckId] = useState('');
    const [statusResult, setStatusResult] = useState(null);
    const [checking, setChecking] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await submitApplication(formData);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckStatus = async (e) => {
        e.preventDefault();
        if (!checkId) return;
        setChecking(true);
        setStatusResult(null);
        setError('');
        try {
            const { data } = await axios.get(`http://localhost:5000/api/applications/status/${checkId}`);
            setStatusResult(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Application not found');
        } finally {
            setChecking(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-32 text-center h-[80vh] flex flex-col justify-center">
                <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                    <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                        Thank you for your interest in joining the Robotics Club. Our team will review your application and get back to you soon.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Join the Robotics Club</h2>
                <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
                    Be part of our community of innovators. Fill out the form below to start your membership application.
                </p>
                <div className="w-24 h-1.5 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Status Checker Section */}
            <div className="bg-slate-900 rounded-3xl p-8 mb-12 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Check Application Status</h3>
                    <p className="text-slate-400 mb-6 font-medium">Already applied? Enter your Student ID to see your status.</p>

                    <form onSubmit={handleCheckStatus} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Enter Student ID (e.g. B20CS001)"
                            value={checkId}
                            onChange={(e) => setCheckId(e.target.value)}
                            className="flex-grow px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                        <button
                            type="submit"
                            disabled={checking}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition disabled:opacity-50 whitespace-nowrap"
                        >
                            {checking ? 'Checking...' : 'Check Status'}
                        </button>
                    </form>

                    {statusResult && (
                        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl animate-fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Applicant Name</p>
                                    <h4 className="text-xl font-bold text-white">{statusResult.name}</h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Current Status</p>
                                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest ${statusResult.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                                        statusResult.status === 'rejected' ? 'bg-rose-500/20 text-rose-400' :
                                            'bg-amber-500/20 text-amber-400'
                                        }`}>
                                        {statusResult.status}
                                    </span>
                                </div>
                            </div>
                            {statusResult.status === 'approved' && (
                                <p className="mt-4 text-emerald-400/80 text-sm font-medium">
                                    ✨ Welcome to the club! Please visit the dashboard or contact us for orientation details.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-8 flex items-center font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">FullName</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Student ID</label>
                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                            placeholder="B20CS001"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                            placeholder="Computer Science"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Academic Year</label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                            required
                        >
                            <option>First Year</option>
                            <option>Second Year</option>
                            <option>Third Year</option>
                            <option>Fourth Year</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Primary Skills / Interests</label>
                        <textarea
                            name="skills"
                            rows="4"
                            value={formData.skills}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Arduino, Python, CAD Design, 3D Printing..."
                            required
                        ></textarea>
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-lg hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Submit Membership Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Join;

