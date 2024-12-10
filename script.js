const stampData = [
  {id: '543323256', image: 'stampimage/oura.png', points: 1, lat: 32.74328627, lon: 129.877567, radius: 100000, name: '大浦天主堂'},
{id: '479632480', image: 'stampimage/matsugae.png', points: 1, lat: 32.7344437238626, lon: 129.869944540613, radius: 100000, name: '松が枝公園'},
{id: '984582920', image: 'stampimage/kozone.png', points: 1, lat: 32.7352229595697, lon: 129.871455290353, radius: 100000, name: '小曽根公園'},
{id: '984131751', image: 'stampimage/kinen.png', points: 1, lat: 32.7338507436866, lon: 129.867392442194, radius: 100000, name: '祈念坂'},
{id: '656108992', image: 'stampimage/dondon.png', points: 1, lat: 32.7339218887299, lon: 129.870360232649, radius: 100000, name: 'どんどん坂'},
];

let stamps = {};
let sumPoints = 0;
const usePoints = 5;
const intervalTime = 1 * 2 * 1000; // 2秒のインターバル（ミリ秒）
let lastStampTime = 0;

function initializeStamps() {
  const savedStamps = localStorage.getItem('stamps');
  const savedPoints = localStorage.getItem('sumPoints');
  const savedLastStampTime = localStorage.getItem('lastStampTime');

  if (savedStamps) {
    stamps = JSON.parse(savedStamps);
  } else {
    stampData.forEach(stamp => {
      stamps[stamp.id] = { ...stamp, read: 0, accessCount: 0, history: [] };
    });
  }

  if (savedPoints) {
    sumPoints = parseInt(savedPoints);
  }

  if (savedLastStampTime) {
    lastStampTime = parseInt(savedLastStampTime);
  }
}

function saveData() {
  localStorage.setItem('stamps', JSON.stringify(stamps));
  localStorage.setItem('sumPoints', sumPoints.toString());
  localStorage.setItem('lastStampTime', lastStampTime.toString());
}

function renderStamps() {
  const container = document.getElementById('stampContainer');
  container.innerHTML = '';
  Object.values(stamps).forEach(stamp => {
    if (stamp.read > 0) {
      const stampElement = document.createElement('div');
      stampElement.className = 'stamp';
      stampElement.style.backgroundImage = `url(${stamp.image})`;
      const readCount = document.createElement('div');
      readCount.className = 'read-count';
      readCount.textContent = stamp.read;
      stampElement.appendChild(readCount);
      container.appendChild(stampElement);
    }
  });
}

function updatePointsDisplay() {
  document.getElementById('totalPoints').textContent = `合計ポイント: ${sumPoints}`;
}

function checkLocation(latitude, longitude, stampLat, stampLon, radius) {
  const distance = calculateDistance(latitude, longitude, stampLat, stampLon);
  console.log(`Distance to stamp: ${distance} meters`);
  return distance <= radius;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function handleStampAcquisition(id) {
  if (id === '0808') {
    usePointsWithoutPassword();
    return;
  }

  if (!stamps[id]) return;

  const currentTime = Date.now();
  if (currentTime - lastStampTime < intervalTime) {
    const remainingTime = Math.ceil((intervalTime - (currentTime - lastStampTime)) / 1000);
    document.getElementById('message').textContent = `次のスタンプまで${remainingTime}秒お待ちください。`;
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log(`User position: ${latitude}, ${longitude}`);
    console.log(`Stamp position: ${stamps[id].lat}, ${stamps[id].lon}`);

    if (checkLocation(latitude, longitude, stamps[id].lat, stamps[id].lon, stamps[id].radius)) {
      stamps[id].accessCount++;
      if (stamps[id].accessCount === 1) {
        stamps[id].read++;
        sumPoints += stamps[id].points;
        stamps[id].history.push({ time: new Date().toLocaleString(), name: stamps[id].name });
        lastStampTime = currentTime;
        renderStamps();
        updatePointsDisplay();
        saveData();
        document.getElementById('message').textContent = 'スタンプを獲得しました！';
      } else {
        document.getElementById('message').textContent = 'このスタンプは既に獲得済みです。';
      }
    } else {
      document.getElementById('message').textContent = '指定された範囲内にいません。';
    }
  }, error => {
    console.error('Geolocation error:', error);
    document.getElementById('message').textContent = '位置情報の取得に失敗しました。';
  }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
}

function showHistory() {
  const historyModal = document.getElementById('historyModal');
  const historyContent = document.getElementById('historyContent');
  if (!historyContent) {
    console.error('historyContent element not found');
    return;
  }

  let historyHTML = '<ul>';
  let hasHistory = false;

  Object.values(stamps).forEach(stamp => {
    stamp.history.forEach(entry => {
      historyHTML += `<li>${entry.time} - ${entry.name}</li>`;
      hasHistory = true;
    });
  });

  historyHTML += '</ul>';

  if (!hasHistory) {
    historyHTML = '<p>履歴がありません。</p>';
  }

  historyContent.innerHTML = historyHTML;
  historyModal.style.display = 'block';
}

function usePointsWithoutPassword() {
  const use = Math.floor(sumPoints / usePoints);
  sumPoints = sumPoints % usePoints;
  Object.values(stamps).forEach(stamp => stamp.accessCount = 0);
  saveData();
  const currentUrl = new URL(window.location.href);
  const baseUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}`;
  const redirectUrl = `${baseUrl}?reset=true&use=${use}`;
  window.location.href = redirectUrl;
}

document.addEventListener('DOMContentLoaded', function () {
  const usePointsButton = document.getElementById('usePointsButton');
  if (usePointsButton) {
    usePointsButton.style.display = 'none';
  }

  document.getElementById('historyButton').addEventListener('click', showHistory);

  const historyModal = document.getElementById('historyModal');
  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.onclick = function () {
    historyModal.style.display = 'none';
  }

  window.onclick = function (event) {
    if (event.target == historyModal) {
      historyModal.style.display = 'none';
    }
  }

  document.getElementById('locationButton').addEventListener('click', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(() => {
        document.getElementById('message').textContent = '位置情報の使用が許可されています。';
      }, () => {
        document.getElementById('message').textContent = '位置情報の使用を許可してください。';
      });
    } else {
      document.getElementById('message').textContent = 'お使いのブラウザは位置情報をサポートしていません。';
    }
  });

  document.getElementById('mapButton').addEventListener('click', () => {
    window.location.href = '/kanko/project//Map/index.html';
  });

  document.getElementById('exchangeButton').addEventListener('click', () => {
    window.location.href = 'https://maps.app.goo.gl/koUq5F7UyFakbaNw5';
  });

  initializeStamps();
  renderStamps();
  updatePointsDisplay();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const reset = urlParams.get('reset');
  const use = urlParams.get('use');

  if (reset === 'true' && use) {
    document.getElementById('message').textContent = `ポイントが消費され、スタンプが再度獲得可能になりました。${use}回抽選を行えます！`;
  } else if (id) {
    handleStampAcquisition(id);
  }
});
