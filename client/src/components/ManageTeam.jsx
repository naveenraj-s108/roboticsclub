import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../services/api';

const ManageTeam = () => {
    const [team, setTeam] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        term: '',
        order: 0
    });
    const [image, setImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const API_URL = `${BACKEND_URL}/api/team`;

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setTeam(data);
        } catch (error) {
            console.error('Error fetching team:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const form = new FormData();
        form.append('name', formData.name);
        form.append('role', formData.role);
        form.append('term', formData.term);
        form.append('order', formData.order);
        if (image) form.append('image', image);

        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };

            if (isEditing) {
                await axios.put(`${API_URL}/${editId}`, form, config);
                setMessage('Team member updated successfully!');
            } else {
                await axios.post(API_URL, form, config);
                setMessage('Team member added successfully!');
            }

            setFormData({ name: '', role: '', term: '', order: 0 });
            setImage(null);
            setIsEditing(false);
            setEditId(null);
            fetchTeam();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        setFormData({
            name: member.name,
            role: member.role,
            term: member.term,
            order: member.order
        });
        setIsEditing(true);
        setEditId(member._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this team member?')) {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo')).token;
                await axios.delete(`${API_URL}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchTeam();
                setMessage('Member removed successfully');
            } catch (error) {
                setMessage('Error deleting member');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Manage Team</h2>

            {message && (
                <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') || message.includes('wrong') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. President"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Term</label>
                    <input
                        type="text"
                        name="term"
                        value={formData.term}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. 2024-2025"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order (optional)</label>
                    <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Photo</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : isEditing ? 'Update Member' : 'Add Member'}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => { setIsEditing(false); setFormData({ name: '', role: '', term: '', order: 0 }); }}
                            className="w-full mt-2 text-slate-500 py-2 hover:underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="pb-4 font-semibold text-slate-600">Photo</th>
                            <th className="pb-4 font-semibold text-slate-600">Name</th>
                            <th className="pb-4 font-semibold text-slate-600">Role</th>
                            <th className="pb-4 font-semibold text-slate-600">Term</th>
                            <th className="pb-4 font-semibold text-slate-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {team.map((member) => (
                            <tr key={member._id} className="hover:bg-slate-50 transition">
                                <td className="py-4">
                                    {member.imageUrl ? (
                                        <img src={member.imageUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <i className="fas fa-user"></i>
                                        </div>
                                    )}
                                </td>
                                <td className="py-4 font-medium text-slate-800">{member.name}</td>
                                <td className="py-4 text-slate-600">{member.role}</td>
                                <td className="py-4 text-slate-500 text-sm">{member.term}</td>
                                <td className="py-4 text-right space-x-3">
                                    <button onClick={() => handleEdit(member)} className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(member._id)} className="text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTeam;
