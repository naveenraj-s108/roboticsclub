import React, { useState, useEffect } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/api';
import { BACKEND_URL } from '../services/api';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        registrationLink: '',
        status: 'upcoming'
    });
    const [imageFile, setImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        try {
            const { data } = await fetchEvents();
            setEvents(data);
        } catch (err) {
            setError('Failed to fetch events');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (imageFile) data.append('image', imageFile);

        try {
            if (isEditing) {
                await updateEvent(editId, data);
                setSuccess('Event updated successfully!');
            } else {
                // Image is optional now
                await createEvent(data);
                setSuccess('Event created successfully!');
            }
            setFormData({
                title: '',
                description: '',
                date: '',
                venue: '',
                registrationLink: '',
                status: 'upcoming'
            });
            setImageFile(null);
            setIsEditing(false);
            setEditId(null);
            e.target.reset();
            getEvents();
        } catch (err) {
            setError(err.response?.data?.message || 'Action failed');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (event) => {
        // Format date for input field
        const formattedDate = new Date(event.date).toISOString().split('T')[0];
        setFormData({
            title: event.title,
            description: event.description,
            date: formattedDate,
            venue: event.venue,
            registrationLink: event.registrationLink || '',
            status: event.status
        });
        setEditId(event._id);
        setIsEditing(true);
        setImageFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            await deleteEvent(id);
            setEvents(events.filter(ev => ev._id !== id));
        } catch (err) {
            alert('Failed to delete event');
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setImageFile(null);
        setFormData({
            title: '',
            description: '',
            date: '',
            venue: '',
            registrationLink: '',
            status: 'upcoming'
        });
    };

    return (
        <div className="space-y-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-8">
                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Event Details' : 'Register New Event'}
                    </h3>
                </div>

                {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-100 flex items-center">{error}</div>}
                {success && <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-100 flex items-center">{success}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            placeholder="Enter event name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Event Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Venue / Location</label>
                        <input
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            placeholder="e.g. Auditorium"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Registration Link (Google Form)</label>
                        <input
                            type="url"
                            name="registrationLink"
                            value={formData.registrationLink}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            placeholder="https://forms.gle/..."
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Event Banner {isEditing && '(Optional)'}</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-bold
                                file:bg-emerald-50 file:text-emerald-700
                                hover:file:bg-emerald-100 cursor-pointer"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Event Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        >
                            <option value="upcoming">Upcoming</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Event Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            placeholder="Describe the event details..."
                            required
                        ></textarea>
                    </div>
                    <div className="md:col-span-2 flex space-x-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-grow py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-md hover:bg-emerald-700 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : (isEditing ? 'Update Event Details' : 'Create New Event')}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-8">
                    <div className="w-1.5 h-6 bg-gray-400 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-900">Manage Existing Events</h3>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Event Info</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Venue</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {events.map((ev) => (
                                <tr key={ev._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                                                {ev.imageUrl ? (
                                                    <img className="h-full w-full object-cover" src={ev.imageUrl.startsWith('http') ? ev.imageUrl : `${BACKEND_URL}${ev.imageUrl}`} alt="" />
                                                ) : (
                                                    <span className="text-[10px] font-bold text-gray-400">NO IMG</span>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{ev.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-medium">{new Date(ev.date).toLocaleDateString()}</div>
                                        <div className="text-xs text-gray-500">{ev.venue}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${ev.status === 'upcoming' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {ev.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(ev)} className="text-indigo-600 hover:text-indigo-900 mr-6 font-bold">Edit</button>
                                        <button onClick={() => handleDelete(ev._id)} className="text-red-500 hover:text-red-700 font-bold">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};

export default ManageEvents;
