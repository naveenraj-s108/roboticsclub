import React, { useEffect, useState } from 'react';
import { fetchGallery } from '../services/api';
import { BACKEND_URL } from '../services/api';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getGallery = async () => {
            try {
                const { data } = await fetchGallery();
                setImages(data);
            } catch (err) {
                console.error('Failed to load gallery', err);
            } finally {
                setLoading(false);
            }
        };
        getGallery();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
            <div className="mb-12 border-b border-gray-100 pb-8">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Photo Gallery</h2>
                <p className="text-purple-600 font-bold mt-2 flex items-center">
                    <span className="w-8 h-1 bg-purple-600 rounded-full mr-2"></span>
                    Capturing our best moments
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center">Archive drives are empty.</p>
                ) : (
                    images.map((image) => (
                        <div
                            key={image._id}
                            className="relative aspect-square group overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2"
                        >
                            <img
                                src={image.imageUrl && image.imageUrl.startsWith('http') ? image.imageUrl : `${BACKEND_URL}${image.imageUrl}`}
                                alt="Gallery"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                {image.eventId && (
                                    <span className="text-xs font-bold text-white uppercase tracking-widest mb-1">
                                        Event: {image.eventId.title}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Gallery;

