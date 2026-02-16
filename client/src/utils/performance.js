/**
 * Optimizes a Cloudinary URL by injecting transformation parameters.
 * Default optimizations: q_auto (quality), f_auto (format)
 * @param {string} url - The original Cloudinary URL
 * @param {string} transforms - Custom transforms (e.g., 'w_400,c_fill')
 * @returns {string} - The optimized URL
 */
export const optimizeImage = (url, transforms = '') => {
    if (!url || !url.includes('cloudinary.com')) return url;

    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;

    const baseTransforms = 'q_auto,f_auto';
    const finalTransforms = transforms
        ? `${baseTransforms},${transforms}`
        : baseTransforms;

    return `${parts[0]}/upload/${finalTransforms}/${parts[1]}`;
};
