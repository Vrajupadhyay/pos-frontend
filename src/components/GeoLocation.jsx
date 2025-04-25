import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import './GeoLocation.css';

const GeoLocations = () => {
    const [location, setLocation] = useState(null);
    const [lastLocation, setLastLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const mapRef = useRef(null); // Reference to the map instance

    useEffect(() => {
        // Handle online/offline status
        const handleOnlineStatus = () => setIsOffline(false);
        const handleOfflineStatus = () => setIsOffline(true);

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOfflineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOfflineStatus);
        };
    }, []);

    useEffect(() => {
        // Function to get geolocation
        const getGeolocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });

                        if (isOffline) {
                            // Store location in localStorage if offline
                            localStorage.setItem('lastLocation', JSON.stringify({ latitude, longitude }));
                        }
                    },
                    () => {
                        setError('Unable to retrieve location.');
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        if (!location) {
            // If location isn't already available, try to get it
            getGeolocation();
        }

        // Retrieve last saved location from localStorage
        const savedLocation = localStorage.getItem('lastLocation');
        if (savedLocation) {
            setLastLocation(JSON.parse(savedLocation));
        }
    }, [location, isOffline]);

    useEffect(() => {
        // Initialize the map only once
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([0, 0], 2); // Default view
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
        }

        // Update map view and add markers when location changes
        if (location) {
            mapRef.current.setView([location.latitude, location.longitude], 13);

            // Add marker for the current location
            L.marker([location.latitude, location.longitude])
                .addTo(mapRef.current)
                .bindPopup('You are here')
                .openPopup();
        }

        if (lastLocation) {
            // Add marker for the last saved location
            L.marker([lastLocation.latitude, lastLocation.longitude])
                .addTo(mapRef.current)
                .bindPopup('Last saved location');
        }

        return () => {
            // Cleanup map instance on component unmount
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [location, lastLocation]);

    return (
        <div className="geo-location">
            <h1>Geo-location Tracking with Offline Support</h1>
            {isOffline ? (
  <div className="status offline">You are currently offline</div>
) : (
  <div className="status online">You are online</div>
)}

            <div id="map" className="map"></div>
            {error && <div className="error">{error}</div>}
            {location && !error && (
                <div className="location-info">
                    <p>Current Location:</p>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            {lastLocation && (
                <div className="location-info">
                    <p>Last Saved Location:</p>
                    <p>Latitude: {lastLocation.latitude}</p>
                    <p>Longitude: {lastLocation.longitude}</p>
                </div>
            )}
        </div>
    );
};

export default GeoLocations;
