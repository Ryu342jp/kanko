const locations = [
  {lat: 32.74328627, lng: 129.877567, name: 'カラオケバー　モンキーガール', limited: true, electronic: true, foods: true, url: 'shop/カラオケバーモンキーガール.html', imageUrl: 'shopimage/カラオケバーモンキーガール.jpg'},
{lat: 32.7425643758711, lng: 129.877097021549, name: '銀鍋', limited: true, electronic: true, foods: true, url: 'shop/銀鍋.html', imageUrl: 'shopimage/銀鍋.jpg'},
{lat: 32.74202052, lng: 129.8766215, name: '鉄板や万菜', limited: true, electronic: true, foods: true, url: 'shop/鉄板や万菜.html', imageUrl: 'shopimage/鉄板や万菜.jpg'},
{lat: 32.74195341, lng: 129.8766262, name: 'ダイニング藤蔵', limited: true, electronic: true, foods: true, url: 'shop/ダイニング藤蔵.html', imageUrl: 'shopimage/ダイニング藤蔵.jpg'},
{lat: 32.74200252, lng: 129.8766146, name: 'Bar Le.Cinq(ルサンク)', limited: true, electronic: true, foods: true, url: 'shop/BarLeCinq(ルサンク).html', imageUrl: 'shopimage/BarLeCinq(ルサンク).jpg'},
{lat: 32.74251498, lng: 129.8772611, name: '焼肉かくら　銅座店', limited: true, electronic: true, foods: true, url: 'shop/焼肉かくら銅座店.html', imageUrl: 'shopimage/焼肉かくら銅座店.jpg'},
{lat: 32.74270605, lng: 129.8773523, name: '三八　本店', limited: false, electronic: true, foods: true, url: 'shop/三八本店.html', imageUrl: 'shopimage/三八本店.jpg'},
{lat: 32.74256581, lng: 129.8781407, name: 'SUNNY SIDE（サニーサイド）', limited: true, electronic: false, foods: true, url: 'shop/SUNNYSIDEサニーサイド.html', imageUrl: 'shopimage/SUNNYSIDEサニーサイド.jpg'},
{lat: 32.74242757, lng: 129.8779054, name: 'スナック　律子', limited: true, electronic: true, foods: true, url: 'shop/スナック律子.html', imageUrl: 'shopimage/スナック律子.jpg'},
{lat: 32.7426057, lng: 129.8780127, name: '長崎炉端　侘助', limited: true, electronic: true, foods: true, url: 'shop/長崎炉端侘助.html', imageUrl: 'shopimage/長崎炉端侘助.jpg'},
{lat: 32.742685755664, lng: 129.878024091341, name: 'はくしか　銅座店', limited: true, electronic: true, foods: true, url: 'shop/はくしか銅座店.html', imageUrl: 'shopimage/はくしか銅座店.jpg'},
{lat: 32.7426873, lng: 129.8775639, name: 'LAMB D（ラムディ）', limited: true, electronic: true, foods: true, url: 'shop/LAMBDラムディ.html', imageUrl: 'shopimage/LAMBDラムディ.jpg'},
{lat: 32.74290743, lng: 129.8775222, name: 'アリラン亭', limited: true, electronic: true, foods: true, url: 'shop/アリラン亭.html', imageUrl: 'shopimage/アリラン亭.jpg'},
{lat: 32.74298936, lng: 129.8780992, name: 'オルテンシア　ナガサキ', limited: true, electronic: true, foods: true, url: 'shop/オルテンシアナガサキ.html', imageUrl: 'shopimage/オルテンシアナガサキ.jpg'},
{lat: 32.7428248, lng: 129.8784074, name: '三八　銅座店', limited: false, electronic: true, foods: true, url: 'shop/三八銅座店.html', imageUrl: 'shopimage/三八銅座店.jpg'},
{lat: 32.7426311875746, lng: 129.878323094728, name: 'スナック＆BAR　Melissa(メリッサ)', limited: true, electronic: false, foods: true, url: 'shop/スナックBAR Melissaメリッサ.html', imageUrl: 'shopimage/スナックBAR Melissaメリッサ.jpg'},
{lat: 32.7426107, lng: 129.8783591, name: 'バートクナガ', limited: true, electronic: false, foods: true, url: 'shop/バートクナガ.html', imageUrl: 'shopimage/バートクナガ.jpg'},
{lat: 32.74275172, lng: 129.8790281, name: '炭火やきとり武将門', limited: true, electronic: true, foods: true, url: 'shop/炭火やきとり武将門.html', imageUrl: 'shopimage/炭火やきとり武将門.jpg'},
{lat: 32.74265557, lng: 129.879029, name: 'いけす居酒屋　川正', limited: true, electronic: true, foods: true, url: 'shop/いけす居酒屋川正.html', imageUrl: 'shopimage/いけす居酒屋川正.jpg'},
{lat: 32.74277127, lng: 129.8789761, name: 'DaisyHill デイジーヒル', limited: true, electronic: true, foods: true, url: 'shop/DaisyHillデイジーヒル.html', imageUrl: 'shopimage/DaisyHillデイジーヒル.jpg'},
{lat: 32.7426973584194, lng: 129.879145530486, name: '中華居酒屋 陽龍', limited: true, electronic: true, foods: true, url: 'shop/中華居酒屋 陽龍.html', imageUrl: 'shopimage/中華居酒屋 陽龍.jpg'},
{lat: 32.7427222404276, lng: 129.87922671124, name: 'よこはま　思案橋', limited: true, electronic: false, foods: true, url: 'shop/よこはま思案橋店.html', imageUrl: 'shopimage/よこはま思案橋店.jpg'},
{lat: 32.7438092981307, lng: 129.878128979383, name: '梅月堂本店', limited: true, electronic: true, foods: true, url: 'shop/梅月堂本店.html', imageUrl: 'shopimage/梅月堂本店.jpg'},
{lat: 32.7431749236103, lng: 129.87868542797, name: '松尾酒店', limited: true, electronic: false, foods: true, url: 'shop/松尾酒店.html', imageUrl: 'shopimage/松尾酒店.jpg'},
{lat: 32.7439145258782, lng: 129.87854908202, name: 'メガネのヨネザワ浜町店', limited: true, electronic: true, foods: false, url: 'shop/メガネのヨネザワ浜町店.html', imageUrl: 'shopimage/メガネのヨネザワ浜町店.jpg'},
{lat: 32.7438174132823, lng: 129.87821461008, name: 'BRAND SHOP REFLET', limited: true, electronic: true, foods: false, url: 'shop/BRANDSHOPREFLET.html', imageUrl: 'shopimage/BRANDSHOPREFLET.jpg'},
{lat: 32.7438914291686, lng: 129.877377900262, name: '五島うどん居酒屋　だしぼんず', limited: true, electronic: true, foods: true, url: 'shop/五島うどん居酒屋だしぼんず.html', imageUrl: 'shopimage/五島うどん居酒屋だしぼんず.jpg'},
{lat: 32.74372392724, lng: 129.879072328643, name: 'おしゃれの店博多屋', limited: true, electronic: true, foods: false, url: 'shop/おしゃれの店博多屋.html', imageUrl: 'shopimage/おしゃれの店博多屋.jpg'},
{lat: 32.7438648263907, lng: 129.877825407665, name: 'JINS（ハマクロス411 2F)', limited: false, electronic: true, foods: false, url: 'shop/JINSハマクロス4112F.html', imageUrl: 'shopimage/JINSハマクロス4112F.jpg'},
{lat: 32.7439989496982, lng: 129.878330896824, name: 'ソフトバンク浜町', limited: false, electronic: true, foods: false, url: 'shop/ソフトバンク浜町.html', imageUrl: 'shopimage/ソフトバンク浜町.jpg'},
{lat: 32.7428512014025, lng: 129.878086196631, name: '銅座稲荷神社', limited: false, electronic: false, foods: false, url: 'shop/銅座稲荷神社.html', imageUrl: 'shopimage/銅座稲荷神社.jpg'},
];


let map, userMarker;
let initialLocationSet = false; // 初期位置が設定されたかどうかを追跡

const defaultCenter = [32.74392196939944, 129.87867759617737];
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
    return L.icon({ iconUrl: 'image/selected_shopping.png', iconSize: [40, 40] });
  }
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
