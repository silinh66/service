/**
 * Utility to generate optimized image URLs.
 * Currently serves as a placeholder for CDN integration.
 * 
 * @param {string} url - The original image URL
 * @param {number} width - Target width for the image (optional)
 * @returns {string} - The optimized URL
 */
export const getOptimizedImageUrl = (url, width) => {
    if (!url) return '';

    // If the URL is a relative path (starts with /), prepend the backend URL
    if (url.startsWith('/')) {
        const apiUrl = import.meta.env.VITE_API_URL;
        // Remove '/api' from the end to get the base URL
        const baseUrl = apiUrl.replace(/\/api$/, '');
        return `${baseUrl}${url}`;
    }

    // Placeholder for CDN logic
    // Example: if (process.env.REACT_APP_CDN_URL) return `${process.env.REACT_APP_CDN_URL}/${url}?w=${width}`;

    return url;
};
