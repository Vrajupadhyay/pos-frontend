import React, { useState, useEffect } from 'react';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState('offline');
    const [loading, setLoading] = useState(false);
    const [imageCategory, setImageCategory] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageDetails, setImageDetails] = useState(null);
    const [showImageDetailsModal, setShowImageDetailsModal] = useState(false);

    useEffect(() => {
        const handleOnline = () => setStatus('online');
        const handleOffline = () => setStatus('offline');

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        if (navigator.onLine) {
            setStatus('online');
        } else {
            setStatus('offline');
        }

        const storedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
        setUploadedImages(storedImages);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

        if (status === 'online') {
            uploadImage(file, e);
        }
    };

    const uploadImage = (file, e) => {
        setLoading(true);
        setToastMessage('Uploading image...');
        setTimeout(() => {
            const newImage = {
                name: file.name,
                data: URL.createObjectURL(file),
                category: imageCategory,
                status: 'Uploaded',
                id: new Date().toISOString(),
            };

            const updatedImages = [...uploadedImages, newImage];
            setUploadedImages(updatedImages);

            localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));

            setLoading(false);
            setToastMessage('Image uploaded successfully!');
            setImageCategory('');
            setImage(null);
            setPreview(null);
            e.target.value = '';
        }, 3000);
    };

    const handleDeleteUploadedImage = (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            const updatedImages = uploadedImages.filter((image) => image.id !== id);
            setUploadedImages(updatedImages);
            localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
            setToastMessage('Image deleted.');
        }
    };

    const handleImageCategoryChange = (e) => {
        setImageCategory(e.target.value);
    };

    const showImageDetails = (image) => {
        setImageDetails(image);
        setShowImageDetailsModal(true);
    };

    const closeImageDetailsModal = () => {
        setShowImageDetailsModal(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Image Upload</h2>

            {toastMessage && (
                <div className="p-4 mb-4 text-center text-white bg-green-500 rounded-md">
                    {toastMessage}
                </div>
            )}

            <input
                type="file"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            {preview && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-72 object-cover mt-2 rounded-lg border border-gray-300"
                    />
                </div>
            )}

            <div className="mt-4">
                <select
                    onChange={handleImageCategoryChange}
                    value={imageCategory}
                    className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                >
                    <option value="">Select Category</option>
                    <option value="Profile">Profile</option>
                    <option value="Documents">Documents</option>
                    <option value="Screenshots">Screenshots</option>
                </select>
            </div>

            {loading && (
                <div className="mt-4 flex justify-center">
                    <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            {showImageDetailsModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"></div>
                        <h3 className="text-xl font-semibold mb-4">Image Details</h3>
                        <p><strong>Name:</strong> {imageDetails.name}</p>
                        <p><strong>Category:</strong> {imageDetails.category}</p>
                        <button onClick={closeImageDetailsModal} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
                            Close
                        </button>
                    </div>
            )}

            {uploadedImages.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Uploaded Images</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {uploadedImages.map((image) => (
                            <div
                                key={image.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src={image.data}
                                    alt={image.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <p className="text-sm font-medium text-gray-700 truncate">{image.name}</p>
                                    <p className="text-xs text-gray-500">{image.category}</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <button
                                            onClick={() => showImageDetails(image)}
                                            className="text-blue-500 text-sm font-medium hover:underline"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUploadedImage(image.id)}
                                            className="text-red-500 text-sm font-medium hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
