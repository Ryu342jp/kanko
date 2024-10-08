const locations = [
    { lat: 32.743602850872975, lng: 129.87845706348565, name: '長崎県立大ラーメン', limited: true, electronic: true, foods: false, priority: 1, url: 'shop/nagasakikendai.html', imageUrl: 'image/nagasakikendai.jpg' },
    { lat: 32.7446319263072, lng: 129.87491829070444, name: '長崎ラーメン', limited: true, electronic: true, foods: false, priority: 1, url: 'shop/nagasakikendai.html', imageUrl: 'image/nagasakikendai.jpg' },
    // ほかの店舗も同様に追加
    {lat: 32.74328627, lng: 129.877567, name: 'カラオケバー　モンキーガール', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/カラオケバーモンキーガール.html', imageUrl: 'image/None'},
    {lat: 32.74202052, lng: 129.8766215, name: '鉄板や万菜', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/鉄板や万菜.html', imageUrl: 'image/None'},
    {lat: 32.74195341, lng: 129.8766262, name: 'ダイニング藤蔵', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/ダイニング藤蔵.html', imageUrl: 'image/None'},
    {lat: 32.74200252, lng: 129.8766146, name: 'Bar Le.Cinq(ルサンク)', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/Bar Le.Cinq(ルサンク).html', imageUrl: 'image/None'},
    {lat: 32.74251498, lng: 129.8772611, name: '焼肉かくら　銅座店', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/焼肉かくら 銅座店.html', imageUrl: 'image/None'},
    {lat: 32.74270605, lng: 129.8773523, name: '三八　本店', limited: false, electronic: true, foods: true, priority: 1.0, url: 'shop/三八 本店.html', imageUrl: 'image/None'},
    {lat: 32.74256581, lng: 129.8781407, name: 'SUNNY SIDE（サニーサイド）', limited: true, electronic: false, foods: true, priority: 1.0, url: 'shop/SUNNY SIDE（サニーサイド）.html', imageUrl: 'image/None'},
    {lat: 32.74242757, lng: 129.8779054, name: 'スナック　律子', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/スナック 律子.html', imageUrl: 'image/None'},
    {lat: 32.7426057, lng: 129.8780127, name: '長崎炉端　侘助', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/長崎炉端 侘助.html', imageUrl: 'image/None'},
    {lat: 32.7426873, lng: 129.8775639, name: 'LAMB D（ラムディ）', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/LAMB D（ラムディ）.html', imageUrl: 'image/None'},
    {lat: 32.74290743, lng: 129.8775222, name: 'アリラン亭', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/アリラン亭.html', imageUrl: 'image/None'},
    {lat: 32.74298936, lng: 129.8780992, name: 'オルテンシア　ナガサキ', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/オルテンシア ナガサキ.html', imageUrl: 'image/None'},
    {lat: 32.7428248, lng: 129.8784074, name: '三八　銅座店', limited: false, electronic: true, foods: true, priority: 1.0, url: 'shop/三八 銅座店.html', imageUrl: 'image/None'},
    {lat: 32.74261094, lng: 129.878351, name: 'スナック＆BAR　Melissa(メリッサ)', limited: true, electronic: false, foods: true, priority: 1.0, url: 'shop/スナック＆BAR Melissa(メリッサ).html', imageUrl: 'image/None'},
    {lat: 32.7426107, lng: 129.8783591, name: 'バートクナガ', limited: true, electronic: false, foods: true, priority: 1.0, url: 'shop/バートクナガ.html', imageUrl: 'image/None'},
    {lat: 32.7427517164987, lng: 129.879028095843, name: '炭火やきとり武将門', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/炭火やきとり武将門.html', imageUrl: 'image/None'},
    {lat: 32.7426555683021, lng: 129.87902897646, name: 'いけす居酒屋　川正', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/いけす居酒屋川正.html', imageUrl: 'image/None'},
    {lat: 32.7427712745024, lng: 129.878976112525, name: 'DaisyHill デイジーヒル', limited: true, electronic: true, foods: true, priority: 1.0, url: 'shop/DaisyHillデイジーヒル.html', imageUrl: 'image/None'},
];

let map, userMarker;
const defaultCenter = [32.74392196939944, 129.87867759617737];
const defaultZoom = 16;
const coordinateA = { lat: 32.74434829076686, lng: 129.87779131187102 };
const coordinateB = { lat: 32.74276806394401, lng: 129.87662692514667 };
let currentIndex = 0;

function initMap() {
    map = L.map('map').setView(defaultCenter, defaultZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 22
    }).addTo(map);

    addAllMarkers();
    checkUserLocation();
    map.on('zoomend', updateMarkers);
    map.on('moveend', checkCenterLocation);
    map.on('zoomend moveend', updateBottomPanel);
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
        map.setView([location.lat, location.lng], 18);
    });
}

function getIcon(location, zoom) {
    if (location.foods) {
        return L.icon({ iconUrl: 'image/foods.png', iconSize: [32, 32] });
    } else {
        return L.icon({ iconUrl: 'image/shopping.png', iconSize: [32, 32] });
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
    A: { lat: 32.74434829076686, lng: 129.87779131187102, name: '浜町', radius: 500 },
    B: { lat: 32.74276806394401, lng: 129.87662692514667, name: '銅座', radius: 250 },
    C: { lat: 32.742187740055144, lng: 129.8793031779364, name: '思案橋', radius: 250 },
    D: { lat: 0, lng: 0, name: 'エリアD', radius: 400 }
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
            <span class="area-name">${area.name}</span>
            ${getIconsHTML(closestArea)}
        `;
    }
}

function getIconsHTML(area) {
    switch (area) {
        case 'A':
            return `
                <a href="https://www.hamanmachi.com" target="_blank"><img src="image/hama.png" alt="公式ホームページ"></a>
                <a href="https://www.google.com/search?q=instagram+hama_bura" target="_blank" rel="noreferrer"><img src="image/insta.png" alt="インスタグラム"></a>
            `;
        case 'B':
            return `
                <a href="https://www.nagasaki-douza.com/" target="_blank"><img src="image/doza.png" alt="公式ホームページ"></a>
                <a href="https://www.google.com/search?q=%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF+douzagram" target="_blank"><img src="image/insta.png" alt="インスタグラム"></a>
            `;
        case 'C':
            return `
                <a href="https://shiannbashi-yokocho.com/" target="_blank"><img src="image/sia.png" alt="公式ホームページ"></a>
                <a href="https://www.google.com/search?q=インスタグラム+shiannbashiyokocho" target="_blank"><img src="image/insta.png" alt="インスタグラム"></a>
                <a href="https://lin.ee/KOjOjQS" target="_blank"><img src="image/line.png" alt="公式ライン"></a>
                <a href="https://www.google.com/search?q=Facebook+shiannbashiyokocho" target="_blank"><img src="image/face.png" alt="Facebook"></a>
            `;
        case 'D':
            return `
                <!-- DエリアのアイコンHTMLを追加 -->
            `;
        default:
            return '';
    }
}
function updateBottomPanel() {
    if (map.getZoom() < 17) {
        document.getElementById('bottom-panel').style.display = 'none';
        return;
    }
    const center = map.getCenter();
    let closestLocation = locations[0];
    let minDistance = Infinity;
    locations.forEach((location, index) => {
        const distance = L.latLng(location.lat, location.lng).distanceTo(center);
        if (distance < minDistance) {
            minDistance = distance;
            closestLocation = location;
            currentIndex = index;
        }
    });
    updatePanelContent(closestLocation);
    document.getElementById('bottom-panel').style.display = 'flex';
}

function updatePanelContent(location) {
    document.getElementById('shop-image').src = location.imageUrl;
    document.getElementById('shop-name').textContent = location.name;
    document.getElementById('shop-detail').href = location.url;
}

function nextLocation() {
    currentIndex = (currentIndex + 1) % locations.length;
    const location = locations[currentIndex];
    updatePanelContent(location);
    map.setView([location.lat, location.lng], map.getZoom());
}

function prevLocation() {
    currentIndex = (currentIndex - 1 + locations.length) % locations.length;
    const location = locations[currentIndex];
    updatePanelContent(location);
    map.setView([location.lat, location.lng], map.getZoom());
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();

    const searchToggle = document.getElementById('search-toggle');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');
    const searchButton = document.getElementById('search-button');

    searchToggle.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    searchButton.addEventListener('click', () => {
        const electronic = document.getElementById('electronic').checked;
        const foods = document.getElementById('foods').checked;
        const limited = document.getElementById('limited').checked;

        map.eachLayer(layer => {
            if (layer instanceof L.Marker && layer !== userMarker) {
                const latlng = layer.getLatLng();
                const location = locations.find(loc => loc.lat === latlng.lat && loc.lng === latlng.lng);
                if (location) {
                    const visible = (!electronic || location.electronic) &&
                        (!foods || location.foods) &&
                        (!limited || location.limited);
                    layer.setOpacity(visible ? 1 : 0);
                }
            }
        });

        popup.style.display = 'none';
    });
});
