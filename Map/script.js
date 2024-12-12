const locations = [
  {lat: 32.7344437238626, lng: 129.869944540613, name: '大浦天主堂', limited: false, electronic: false, foods: false, url: 'shop/oura.html', imageUrl: 'shop/shopimage/none'},
  {lat: 32.7352229595697, lng: 129.871455290353, name: '松が枝公園', limited: false, electronic: false, foods: false, url: 'shop/matsugae.html', imageUrl: 'shop/shopimage/none'},
  {lat: 32.7338507436866, lng: 129.867392442194, name: '小曽根公園', limited: false, electronic: false, foods: false, url: 'shop/kozone.html', imageUrl: 'shop/shopimage/none'},
  {lat: 32.7339218887299, lng: 129.870360232649, name: '祈念坂', limited: false, electronic: false, foods: false, url: 'shop/kinen.html', imageUrl: 'shop/shopimage/none'},
  {lat: 32.7316032212982, lng: 129.866896867615, name: 'どんどん坂', limited: false, electronic: false, foods: false, url: 'shop/dondon.html', imageUrl: 'shop/shopimage/none'},
  {lat: 32.73390553577598,lng:129.87282338884566, name: 'HUBsIshibashi(13日交換所)', limited: false, electronic: false, foods: true, url: 'https://55hubs.localinfo.jp/', imageUrl: 'shop/shopimage/HUB'},
  //{lat: 32.73435844854654, lng: 129.86922078278042 , name: 'グラバー園(14日交換所)', limited: false, electronic: false, foods: true, url: 'https://glover-garden.jp/', imageUrl: 'shop/shopimage/grab'},
];


let map, userMarker;
let initialLocationSet = false; // 初期位置が設定されたかどうかを追跡

const defaultCenter = [32.73248992178525, 129.86961868726252];
const defaultZoom = 17;

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
let selectedMarker = null;

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
    // 前に選択されていたマーカーのアイコンを元に戻す
    if (selectedMarker && selectedMarker !== marker) {
      selectedMarker.setIcon(getIcon(selectedMarker.location, map.getZoom()));
    }

    // 現在のマーカーを選択状態にする
    marker.setIcon(getSelectedIcon(location, map.getZoom()));
    selectedMarker = marker;

    map.setView([location.lat, location.lng], 18);
  });

  marker.location = location; // マーカーにロケーション情報を追加
}

function getSelectedIcon(location, zoom) {
  if (location.foods) {
    return L.icon({ iconUrl: 'image/selected_foods.png', iconSize: [40, 40] });
  } else {
    return L.icon({ iconUrl: 'image/selected_star.png', iconSize: [40, 40] });
  }
}

function getIcon(location, zoom) {
  if (location.foods) {
    return L.icon({ iconUrl: 'image/foods.png', iconSize: [32, 32] });
  } else {
    return L.icon({ iconUrl: 'image/image/star.png', iconSize: [32, 32] });
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
  if ("geolocation" in navigator && !initialLocationSet) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const userLatLng = L.latLng(userLat, userLng);

      if (userMarker) {
        map.removeLayer(userMarker);
      }

      userMarker = L.marker(userLatLng, {
        icon: L.divIcon({
          className: 'user-marker',
          html: '◎',
          iconSize: [20, 20]
        })
      }).addTo(map);

      if (userLatLng.distanceTo(L.latLng(defaultCenter)) <= 1000) {
        map.setView(userLatLng);
      }

      initialLocationSet = true; // 初期位置を設定したことをマーク
    }, error => {
      console.error("位置情報の取得に失敗しました:", error);
      initialLocationSet = true; // エラーの場合も初期設定完了とみなす
    });
  } else {
    initialLocationSet = true; // geolocationが利用できない場合も初期設定完了とみなす
  }
}

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
  document.getElementById('shop-image').src = 'shop/' + location.imageUrl;
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
