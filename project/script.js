const stampData = [
  { id: '11', image: 'stampimage/stamp-01-05.png', points: 1, lat: 32.8138752, lon: 129.8694144, radius: 1000000, name: '長崎県立大学' },
  { id: '2', image: 'stampimage/stamp-01-06.png', points: 1, lat: 32.8138752, lon: 129.8694144, radius: 1000000, name: '浜町店' },
  { id: '3', image: 'stampimage/stamp-01-07.png', points: 1, lat: 32.8138752, lon: 129.8694144, radius: 1000000, name: '浜町店2' },
  { id: '4', image: 'stampimage/stamp-01-04.png', points: 1, lat: 32.8138752, lon: 129.8694144, radius: 1000000, name: '浜町店3' },
  { id: '5', image: 'stampimage/stamp-01-09.png', points: 1, lat: 32.8138752, lon: 129.8694144, radius: 1000000, name: '浜町店4' },
  { id: '6', image: 'stampimage/stamp-01-10.png', points: 1, lat: 32.808665436811026, lon: 129.87430175156737, radius: 30, name: '浜町店5' },
  {id: '543323256', image: 'stampimage/monkeygirl.png', points: 1, lat: 32.74328627, lon: 129.877567, radius: 6000, name: 'カラオケバー　モンキーガール'},
{id: '105729317', image: 'stampimage/銀鍋.png', points: 1, lat: 32.7425643758711, lon: 129.877097021549, radius: 6000, name: '銀鍋'},
{id: '578050608', image: 'stampimage/鉄板や万菜.png', points: 1, lat: 32.74202052, lon: 129.8766215, radius: 6000, name: '鉄板や万菜'},
{id: '453191679', image: 'stampimage/ダイニング藤蔵.png', points: 1, lat: 32.74195341, lon: 129.8766262, radius: 6000, name: 'ダイニング藤蔵'},
{id: '795776918', image: 'stampimage/LeCinq.png', points: 1, lat: 32.74200252, lon: 129.8766146, radius: 6000, name: 'Bar Le.Cinq(ルサンク)'},
{id: '761534236', image: 'stampimage/焼肉かぐら銅座店.png', points: 1, lat: 32.74251498, lon: 129.8772611, radius: 6000, name: '焼肉かくら　銅座店'},
{id: '875064950', image: 'stampimage/三八本店.png', points: 1, lat: 32.74270605, lon: 129.8773523, radius: 6000, name: '三八　本店'},
{id: '967993304', image: 'stampimage/sunnyside.png', points: 1, lat: 32.74256581, lon: 129.8781407, radius: 6000, name: 'SUNNY SIDE（サニーサイド）'},
{id: '953039271', image: 'stampimage/スナック律子.png', points: 1, lat: 32.74242757, lon: 129.8779054, radius: 6000, name: 'スナック　律子'},
{id: '975669452', image: 'stampimage/長崎炉端侘助.png', points: 1, lat: 32.7426057, lon: 129.8780127, radius: 6000, name: '長崎炉端　侘助'},
{id: '453422607', image: 'stampimage/はくしか銅座店.png', points: 1, lat: 32.742685755664, lon: 129.878024091341, radius: 6000, name: 'はくしか　銅座店'},
{id: '533929920', image: 'stampimage/LAMBD.png', points: 1, lat: 32.7426873, lon: 129.8775639, radius: 6000, name: 'LAMB D（ラムディ）'},
{id: '905563696', image: 'stampimage/アリラン亭.png', points: 1, lat: 32.74290743, lon: 129.8775222, radius: 6000, name: 'アリラン亭'},
{id: '525992769', image: 'stampimage/オルテンシアナガサキ.png', points: 1, lat: 32.74298936, lon: 129.8780992, radius: 6000, name: 'オルテンシア　ナガサキ'},
{id: '359934126', image: 'stampimage/三八銅座店.png', points: 1, lat: 32.7428248, lon: 129.8784074, radius: 6000, name: '三八　銅座店'},
{id: '206527068', image: 'stampimage/Melissa.png', points: 1, lat: 32.7426311875746, lon: 129.878323094728, radius: 6000, name: 'スナック＆BAR　Melissa(メリッサ)'},
{id: '860441267', image: 'stampimage/バートクナガ.png', points: 1, lat: 32.7426107, lon: 129.8783591, radius: 6000, name: 'バートクナガ'},
{id: '668961094', image: 'stampimage/武将門.png', points: 1, lat: 32.74275172, lon: 129.8790281, radius: 6000, name: '炭火やきとり武将門'},
{id: '501740721', image: 'stampimage/いけす居酒屋川正.png', points: 1, lat: 32.74265557, lon: 129.879029, radius: 6000, name: 'いけす居酒屋　川正'},
{id: '990410896', image: 'stampimage/DaisyHill.png', points: 1, lat: 32.74277127, lon: 129.8789761, radius: 6000, name: 'DaisyHill デイジーヒル'},
{id: '593064489', image: 'stampimage/中華居酒屋陽龍.png', points: 1, lat: 32.7426973584194, lon: 129.879145530486, radius: 6000, name: '中華居酒屋 陽龍'},
{id: '451723931', image: 'stampimage/よこはま思案橋.png', points: 1, lat: 32.7427222404276, lon: 129.87922671124, radius: 6000, name: 'よこはま　思案橋'},
{id: '282200955', image: 'stampimage/梅月堂本店.png', points: 1, lat: 32.7438092981307, lon: 129.878128979383, radius: 6000, name: '梅月堂本店'},
{id: '545447750', image: 'stampimage/松尾酒店.png', points: 1, lat: 32.7431749236103, lon: 129.87868542797, radius: 6000, name: '松尾酒店'},
{id: '553977433', image: 'stampimage/メガネのヨネザワ浜町店.png', points: 1, lat: 32.7439145258782, lon: 129.87854908202, radius: 6000, name: 'メガネのヨネザワ浜町店'},
{id: '695135485', image: 'stampimage/BRANDSHOPREFLET.png', points: 1, lat: 32.7438174132823, lon: 129.87821461008, radius: 6000, name: 'BRAND SHOP REFLET'},
{id: '388287138', image: 'stampimage/五島うどん居酒屋だしぽんず.png', points: 1, lat: 32.7438914291686, lon: 129.877377900262, radius: 6000, name: '五島うどん居酒屋　だしぼんず'},
{id: '809583866', image: 'stampimage/おしゃれの店博多屋.png', points: 1, lat: 32.74372392724, lon: 129.879072328643, radius: 6000, name: 'おしゃれの店博多屋'},
{id: '731434651', image: 'stampimage/JINS.png', points: 1, lat: 32.7438648263907, lon: 129.877825407665, radius: 6000, name: 'JINS（ハマクロス411 2F)'},
{id: '651221759', image: 'stampimage/ソフトバンク長崎浜町.png', points: 1, lat: 32.7439989496982, lon: 129.878330896824, radius: 6000, name: 'ソフトバンク長崎浜町'},
{id: '361535677', image: 'stampimage/銅座稲荷神社.png', points: 1, lat: 32.7428512014025, lon: 129.878086196631, radius: 6000, name: '銅座稲荷神社'},
];

let stamps = {};
let sumPoints = 0;
const usePoints = 2;
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
