// mapToken is already defined in the EJS template
mapboxgl.accessToken = mapToken;

// listingData is passed from the EJS template
console.log("Map.js received listingData:", listingData);

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v12', // Better street style
    center: listingData.coordinates,
    zoom: 12, // Closer zoom for better detail
    pitch: 45, // Add 3D tilt
    bearing: 0
});

// Add navigation controls
map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// Add fullscreen control
map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

// Add a marker at the listing location (only if we have real coordinates)
if (listingData.hasCoordinates) {
    // Create custom marker element with location pin icon
    const el = document.createElement('div');
    el.className = 'custom-marker';
    
    // Create the pin icon using CSS and HTML
    el.innerHTML = `
        <div class="pin-icon">
            <svg width="35" height="45" viewBox="0 0 35 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 0C7.85 0 0 7.85 0 17.5C0 30.625 17.5 45 17.5 45S35 30.625 35 17.5C35 7.85 27.15 0 17.5 0Z" fill="#FF385C"/>
                <circle cx="17.5" cy="17.5" r="8" fill="white"/>
                <circle cx="17.5" cy="17.5" r="4" fill="#FF385C"/>
            </svg>
            <div class="pin-shadow"></div>
        </div>
    `;
    
    el.style.cursor = 'pointer';
    el.style.transform = 'translate(-50%, -100%)'; // Center the pin properly
    el.style.transition = 'all 0.3s ease';
    
    // Add CSS for the pin and hover effects
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker .pin-icon {
            position: relative;
            display: inline-block;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .custom-marker .pin-shadow {
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 8px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .custom-marker:hover .pin-icon {
            transform: scale(1.2) translateY(-5px);
            filter: drop-shadow(0 8px 16px rgba(255, 56, 92, 0.4));
        }
        
        .custom-marker:hover .pin-shadow {
            width: 25px;
            height: 10px;
            opacity: 0.6;
        }
        
        .custom-marker:active .pin-icon {
            transform: scale(1.1) translateY(-2px);
        }
        
        .pin-bounce {
            animation: bounce 0.8s ease-in-out;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: scale(1) translateY(0); }
            40% { transform: scale(1.1) translateY(-10px); }
            60% { transform: scale(1.05) translateY(-5px); }
        }
    `;
    document.head.appendChild(style);

    // Create enhanced popup
    const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        className: 'custom-popup'
    }).setHTML(`
        <div style="padding: 10px; text-align: center; max-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">${listingData.title}</h4>
            <p style="margin: 0; color: #666; font-size: 14px;">📍 ${listingData.location}</p>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
                <small style="color: #999;">Click to explore this area</small>
            </div>
        </div>
    `);

    // Add marker with custom element
    const marker = new mapboxgl.Marker(el)
        .setLngLat(listingData.coordinates)
        .setPopup(popup)
        .addTo(map);

    // Add subtle animation on load
    map.on('load', () => {
        // Fly to the location with animation
        map.flyTo({
            center: listingData.coordinates,
            zoom: 14,
            pitch: 60,
            duration: 2000
        });
        
        // Show popup after animation
        setTimeout(() => {
            marker.getPopup().addTo(map);
        }, 2500);
    });

    // Add click event to marker for interaction
    el.addEventListener('click', () => {
        // Add bounce animation
        el.querySelector('.pin-icon').classList.add('pin-bounce');
        
        map.flyTo({
            center: listingData.coordinates,
            zoom: 16,
            pitch: 45,
            duration: 1500
        });
        
        // Remove bounce class after animation
        setTimeout(() => {
            el.querySelector('.pin-icon').classList.remove('pin-bounce');
        }, 800);
    });
} else {
    // If no coordinates, show a nice default view
    map.on('load', () => {
        map.flyTo({
            center: listingData.coordinates,
            zoom: 3,
            pitch: 0,
            duration: 2000
        });
    });
}
