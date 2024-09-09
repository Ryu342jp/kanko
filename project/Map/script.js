const locations = [
    { lat: 32.743602850872975, lng: 129.87845706348565, name: '長崎県立大ラーメン', limited: true, electronic: true, foods: false, priority: 1, url: 'shop/nagasakikendai.html', imageUrl: 'image/nagasakikendai.jpg' },
    // ほかの店舗も同様に追加
];

let map, userMarker;
const defaultCenter = [32.74392196939944, 129.87867759617737];
const defaultZoom = 16;

function initMap() {
    map = L.map('map').setView(defaultCenter, defaultZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    addAllMarkers(); // 全てのマーカーを追加
    checkUserLocation();
    map.on('zoomend', updateMarkers);
}

function addAllMarkers() {
    locations.forEach(location => {
        addMarker(location);
    });
}

function addMarker(location) {
    const marker = L.marker([location.lat, location.lng], {
        icon: getIcon(location, map.getZoom())
    }).addTo(map);

    marker.on('click', () => {
        if (map.getZoom() >= 17) {
            window.location.href = location.url;
        } else {
            map.setView([location.lat, location.lng], 18);  // 拡大レベルを18に設定
        }
    });
}

function getIcon(location, zoom) {
    if (zoom >= 17) {
        return L.divIcon({
            className: 'custom-div-icon',
            html: `
          <img src="${location.imageUrl}" style="width: 30px; height: 30px;">
          <span class="marker-text">${location.name}</span>
        `,
            iconSize: [100, 40],
            iconAnchor: [50, 40]
        });
    } else {
        if (location.foods) {
            return L.icon({ iconUrl: 'image/foods.png', iconSize: [32, 32] });
        } else {
            return L.icon({ iconUrl: 'image/shopping.png', iconSize: [32, 32] });
        }
    }
}

function updateMarkers() {
    const currentZoom = map.getZoom();
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer !== userMarker) {
            const latlng = layer.getLatLng();
            const location = locations.find(loc => loc.lat === latlng.lat && loc.lng === latlng.lng);
            if (location) {
                layer.setIcon(getIcon(location, currentZoom));
            }
        }
    });
}

function checkUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const userLatLng = L.latLng(userLat, userLng);

            if (userMarker) {
                map.removeLayer(userMarker);
            }

            userMarker = L.marker(userLatLng, {
                icon: L.divIcon({
                    className: 'user-marker',
                    html: '➤',
                    iconSize: [20, 20]
                })
            }).addTo(map);

            if (userLatLng.distanceTo(L.latLng(defaultCenter)) <= 1000) {
                map.setView(userLatLng);
            }
        });
    }
}

function filterLocations() {
    const electronic = document.getElementById('electronic').checked;
    const foods = document.getElementById('foods').checked;
    const limited = document.getElementById('limited').checked;

    map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });

    locations.forEach(location => {
        if ((!electronic || location.electronic) &&
            (!foods || location.foods) &&
            (!limited || location.limited)) {
            addMarker(location);
        }
    });

    updateMarkers();
}

document.getElementById('search-toggle').addEventListener('click', () => {
    const options = document.getElementById('search-options');
    options.style.display = options.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('search-button').addEventListener('click', filterLocations);

initMap();
