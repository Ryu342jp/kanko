const locations = [
    { lat: 32.743602850872975, lng: 129.87845706348565, name: 'Nagasaki Prefectural UniversityーMen', limited: true, electronic: true, foods: false, priority: 1, url: 'shop/nagasakikendai.html', imageUrl: 'image/nagasakikendai.jpg' },
    // Please add the other stores in the same way.
];

let map, userMarker;
const defaultCenter = [32.74392196939944, 129.87867759617737];
const defaultZoom = 16;

const coordinateA = { lat: 32.74434829076686, lng: 129.87779131187102 };
const coordinateB = { lat: 32.74276806394401, lng: 129.87662692514667 };

function initMap() {
    map = L.map('map').setView(defaultCenter, defaultZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    addAllMarkers();
    checkUserLocation();
    map.on('zoomend', updateMarkers);
    map.on('moveend', checkCenterLocation);

    // Perform a check at the time of the initial display.
    checkCenterLocation();
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
            map.setView([location.lat, location.lng], 18);
        }
    });
}

function getIcon(location, zoom) {
    if (zoom >= 17) {
        return L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="marker-text">${location.name}</div>`,
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

const coordinates = {
    A: { lat: 32.74434829076686, lng: 129.87779131187102, name: 'Hamacho', radius: 500 },
    B: { lat: 32.74276806394401, lng: 129.87662692514667, name: 'Bronze seat', radius: 250 },
    C: { lat: 32.742187740055144, lng: 129.8793031779364, name: 'Shian Bridge', radius: 250 },
    D: { lat: 0, lng: 0, name: 'AreaD', radius: 400 }  // DPlease set the coordinates appropriately.
};

function checkCenterLocation() {
    const mapCenter = map.getCenter();
    const iconsContainer = document.getElementById('icons-container');
    iconsContainer.innerHTML = '';

    let closestArea = null;
    let minDistance = Infinity;

    for (const [key, coord] of Object.entries(coordinates)) {
        const distance = L.latLng(mapCenter).distanceTo(L.latLng(coord));
        if (distance <= coord.radius && distance < minDistance) {
            closestArea = key;
            minDistance = distance;
        }
    }

    if (closestArea) {
        const area = coordinates[closestArea];
        iconsContainer.innerHTML = `
              <div class="area-name">${area.name}</div>
              ${getIconsHTML(closestArea)}
          `;
    }
}

function getIconsHTML(area) {
    switch (area) {
        case 'A':
            return `
                  <a href="https://www.hamanmachi.com" target="_blank"><img src="image/hama.png" alt="Formula HoーThere is no meaning in the text "ムペ."ーThis is the Hiragana character "ji" in Japanese."></a>
                  <a href="https://www.instagram.com/hama_bura?igsh=MThscHIyMmNsaGw0Mw%3D%3D&utm_source=qr" target="_blank"><img src="image/insta.png" alt="Instagram"></a>
              `;
        case 'B':
            return `
                  <a href="https://www.nagasaki-douza.com/" target="_blank"><img src="image/doza.png" alt="Official websiteーMopeーThis is a single Japanese character "ジ" which is pronounced as "ji.""></a>
                  <a href="https://www.instagram.com/douzagram/" target="_blank"><img src="image/insta.png" alt="LINE"></a>
              `;
        case 'C':
            return `
                　<a href="https://shiannbashi-yokocho.com/" target="_blank"><img src="image/sia.png" alt="Formula HoーI'm sorry, but "ムペ" does not seem to correspond to any recognizable text in Japanese. Could you provide more context or confirm the correct text for me to translate?ーThis is a hiragana character in Japanese called "ji.""></a>
                  <a href="https://lin.ee/KOjOjQS" target="_blank"><img src="image/line.png" alt="Formula line"></a>
                  <a href="https://www.instagram.com/shiannbashiyokocho" target="_blank"><img src="image/insta.png" alt="Instagram"></a>
                  <a href="https://www.facebook.com/shiannbashiyokocho" target="_blank"><img src="image/face.png" alt="Facebook"></a>
              `;
        case 'D':
            return `
                  <!-- DArea iconHTMLAdd a 'を' -->
              `;
        default:
            return '';
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