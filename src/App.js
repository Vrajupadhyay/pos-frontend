import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import ImageUpload from './components/ImageUpload';
import Geolocations from './components/GeoLocation';
import AppLock from './components/AppLock';
import CRUDManager from './components/CRUDManager';
import SplashScreen from './components/SplashScreen';  // Import SplashScreen
import './App.css';

function App() {
  const [activeScreen, setActiveScreen] = useState('crud');
  const [status, setStatus] = useState('online');
  const [unlocked, setUnlocked] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen visibility

  useEffect(() => {
    const isUnlocked = localStorage.getItem('unlocked') === 'true';
    setUnlocked(isUnlocked);
  }, []);

  useEffect(() => {
    const handleOnline = () => setStatus('online');
    const handleOffline = () => setStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    navigator.onLine ? setStatus('online') : setStatus('offline');

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUnlock = () => {
    localStorage.setItem('unlocked', 'true');
    setUnlocked(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('unlocked');
    setUnlocked(false);
    window.location.reload();
  };

  const handleSplashLoad = () => {
    setShowSplash(false); // Hide splash screen after it finishes
  };

  if (showSplash) {
    return <SplashScreen onLoad={handleSplashLoad} />; // Show splash screen
  }

  if (!unlocked) {
    return <AppLock onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="hidden md:flex space-x-4">
          {/* Top Buttons for Navigation */}
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeScreen === 'crud' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => setActiveScreen('crud')}
          >
            CRUD
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeScreen === 'products' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => setActiveScreen('products')}
          >
            Product List
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeScreen === 'order' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => setActiveScreen('order')}
          >
            Order Form
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeScreen === 'imageUpload' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => setActiveScreen('imageUpload')}
          >
            Image Upload
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeScreen === 'geoLocation' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => setActiveScreen('geoLocation')}
          >
            Geo Location
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          Logout 🔒
        </button>
      </div>

      {/* Status Message */}
      <div className="bg-white p-3 rounded-md shadow-md mb-4">
        {status === 'offline' && <p className="text-red-500 text-sm">You are offline. Some features may not work.</p>}
        {status === 'online' && <p className="text-green-500 text-sm">You are online.</p>}
      </div>

      {/* Content Display */}
      <div className="bg-white p-4 rounded-md shadow-md flex-1">
        {activeScreen === 'crud' && <CRUDManager />}
        {activeScreen === 'products' && <ProductList />}
        {activeScreen === 'order' && <OrderForm />}
        {activeScreen === 'imageUpload' && <ImageUpload />}
        {activeScreen === 'geoLocation' && <Geolocations />}
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 w-full bg-white shadow-md md:hidden flex justify-around py-3 border-t border-gray-200">
        <button
          className={`flex flex-col items-center text-sm ${activeScreen === 'products' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
          onClick={() => setActiveScreen('products')}
        >
          <span>📦</span>
          <span>Products</span>
        </button>
        <button
          className={`flex flex-col items-center text-sm ${activeScreen === 'order' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
          onClick={() => setActiveScreen('order')}
        >
          <span>🛒</span>
          <span>Orders</span>
        </button>
        <button
          className={`flex flex-col items-center text-sm ${activeScreen === 'crud' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
          onClick={() => setActiveScreen('crud')}
        >
          <span>🛠️</span>
          <span>CRUD</span>
        </button>
        <button
          className={`flex flex-col items-center text-sm ${activeScreen === 'imageUpload' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
          onClick={() => setActiveScreen('imageUpload')}
        >
          <span>📤</span>
          <span>Upload</span>
        </button>
        <button
          className={`flex flex-col items-center text-sm ${activeScreen === 'geoLocation' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
          onClick={() => setActiveScreen('geoLocation')}
        >
          <span>📍</span>
          <span>Location</span>
        </button>
      </div>
    </div>
  );
}

export default App;
