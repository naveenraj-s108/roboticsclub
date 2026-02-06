import React, { useState, useEffect } from 'react';
import { fetchGallery, uploadGalleryImage, deleteGalleryImage, fetchEvents } from '../services/api';
import { BACKEND_URL } from '../services/api';

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [events, setEvents] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [eventId, setEventId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getGallery();
        getEvents();
    }, []);

    const getGallery = async () => {
        try {
            const { data } = await fetchGallery();
            setImages(data);
        } catch (err) {
            setError('Failed to fetch gallery images');
        }
    };

    const getEvents = async () => {
        try {
            const { data } = await fetchEvents();
            setEvents(data);
        } catch (err) {
            console.error('Failed to fetch events');
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!imageFile) {
            setError('Please select an image file');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        if (eventId) formData.append('eventId', eventId);

        try {
            await uploadGalleryImage(formData);
            setSuccess('Image added to gallery successfully!');
            setImageFile(null);
            setEventId('');
            // Reset the file input manually if needed
            e.target.reset();
            getGallery();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add image');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        try {
            await deleteGalleryImage(id);
            setImages(images.filter(img => img._id !== id));
        } catch (err) {
            alert('Failed to delete image');
        }
    };

    return (
        <div className="space-y-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-8">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-900">Upload to Photo Gallery</h3>
                </div>

                {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-100 flex items-center">{error}</div>}
                {success && <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-100 flex items-center">{success}</div>}

                <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Image File</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-bold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100 cursor-pointer"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Associate Event (Optional)</label>
                        <select
                            value={eventId}
                            onChange={(e) => setEventId(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                        >
                            <option value="">No Association</option>
                            {events.map((ev) => (
                                <option key={ev._id} value={ev._id}>{ev.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Uploading...' : 'Upload to Gallery'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-8">
                    <div className="w-1.5 h-6 bg-gray-400 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-900">Gallery Image Management</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {images.length === 0 ? (
                        <p className="col-span-full text-gray-500 text-center py-16 italic border-2 border-dashed border-gray-100 rounded-2xl">No images found in the gallery archive.</p>
                    ) : (
                        images.map((img) => (
                            <div key={img._id} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                                <img src={img.imageUrl && img.imageUrl.startsWith('http') ? img.imageUrl : `${BACKEND_URL}${img.imageUrl}`} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => handleDelete(img._id)}
                                        className="bg-red-500 p-3 rounded-full text-white shadow-lg hover:bg-red-600 hover:scale-110 active:scale-90 transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {img.eventId && (
                                    <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm px-3 py-2 text-[10px] font-bold text-blue-600 truncate border-t border-gray-100">
                                        EVENT: {img.eventId.title}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

};

export default ManageGallery;
