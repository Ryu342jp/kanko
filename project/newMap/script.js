const locations = [
    { lat: 32.743602850872975, lng: 129.87845706348565, name: '浜屋百貨店', limited: true, electronic: true, foods: false, priority: 1, url: 'shop/hamahyakka.html', imageUrl: 'image/hamahyakka.jpg' },
    // ほかの店舗も同様に追加
];

let map, userMarker;
const defaultCenter = [32.74392196939944, 129.87867759617737];
const defaultZoom = 16;
const iconTypes = {
    'shopping': './image/shopping.png',
    'foods': './image/foods.png'
};

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
        icon: getIcon(location)
    }).addTo(map);

    marker.bindPopup(`<b>${location.name}</b><br><img src="${location.imageUrl}" width="100">`);
    marker.on('click', () => {
        if (map.getZoom() >= 17) {
            marker.openPopup();
        }
    });
}

function getIcon(location) {
    if (location.foods) {
        return L.icon({
            iconUrl: 'fork-and-spoon.png',
            iconSize: [32, 32]
        });
    } else {
        return L.icon({
            iconUrl: 'shopping-bag.png',
            iconSize: [32, 32]
        });
    }
}

function updateMarkers() {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer !== userMarker) {
            const popup = layer.getPopup();
            if (map.getZoom() >= 17 && popup) {
                layer.setIcon(L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-image: url('${popup.getContent().match(/src="([^"]+)"/)[1]}');" class="marker-image"></div><div class="marker-text">${popup.getContent().match(/<b>(.+?)<\/b>/)[1]}</div>`,
                    iconSize: [50, 50]
                }));
            } else {
                const location = locations.find(loc => loc.lat === layer.getLatLng().lat && loc.lng === layer.getLatLng().lng);
                if (location) {
                    layer.setIcon(getIcon(location));
                }
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
