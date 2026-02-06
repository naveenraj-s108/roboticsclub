import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const userInfo = localStorage.getItem('userInfo');
            setIsLoggedIn(!!userInfo);
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return (
        <nav className="bg-white text-gray-900 border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black flex items-center space-x-2 text-indigo-600">
                    <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-lg">R</span>
                    <span>RoboticsClub</span>
                </Link>
                <div className="hidden md:flex space-x-8 items-center font-bold text-sm">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600 transition">Home</Link>
                    <Link to="/events" className="text-gray-600 hover:text-indigo-600 transition">Events</Link>
                    <Link to="/gallery" className="text-gray-600 hover:text-indigo-600 transition">Gallery</Link>
                    <Link to="/announcements" className="text-gray-600 hover:text-indigo-600 transition">Updates</Link>
                    <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition">About</Link>

                    {isLoggedIn ? (
                        <Link to="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95">
                            Admin Portal
                        </Link>
                    ) : (
                        <div className="flex items-center space-x-8">
                            <Link to="/join" className="text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-5 py-2 rounded-xl transition-all">Join Club</Link>
                            <Link to="/admin" className="text-gray-400 hover:text-gray-900 transition text-xs uppercase tracking-widest">Admin</Link>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
