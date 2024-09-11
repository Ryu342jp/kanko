const stampData = [
    { id: '1', image: 'stamp-01-05.png', points: 10, lat: 32.8138752, lon: 129.8694144, radius: 10000, name: '長崎県立大学' },
    { id: '2', image: 'stamp-01-06.png', points: 15, lat: 32.8138752, lon: 129.8694144, radius: 10000, name: '浜町店' },
    { id: '3', image: 'stamp-01-07.png', points: 10, lat: 32.8138752, lon: 129.8694144, radius: 10000, name: '浜町店2' },
    { id: '4', image: 'stamp-01-04.png', points: 15, lat: 32.8138752, lon: 129.8694144, radius: 10000, name: '浜町店3' },
    { id: '5', image: 'stamp-01-09.png', points: 10, lat: 32.8138752, lon: 129.8694144, radius: 10000, name: '浜町店4' },
    { id: '6', image: 'stamp-01-10.png', points: 15, lat: 32.808665436811026, lon: 129.87430175156737, radius: 30, name: '浜町店5' },
];

let stamps = {};
let sumPoints = 0;
const usePoints = 5;
const intervalTime = 1 * 2 * 1000; // 5分のインターバル（ミリ秒）
let lastStampTime = 0;

function initializeStamps() {
    const savedStamps = localStorage.getItem('stamps');
    const savedPoints = localStorage.getItem('sumPoints');
    const savedLastStampTime = localStorage.getItem('lastStampTime');
    
    if (savedStamps) {
        stamps = JSON.parse(savedStamps);
    } else {
        stampData.forEach(stamp => {
            stamps[stamp.id] = {
                ...stamp,
                read: 0,
                accessCount: 0,
                history: []
            };
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
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function handleStampAcquisition(id) {
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
                stamps[id].history.push({
                    time: new Date().toLocaleString(),
                    name: stamps[id].name
                });
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
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
}

function showHistory() {
    const historyModal = document.getElementById('historyModal');
    const historyContent = document.getElementById('historyContent');
    
    if (!historyContent) {
        console.error('historyContent element not found');
        return;
    }

    let historyHTML = '<ul>';
    Object.values(stamps).forEach(stamp => {
        stamp.history.forEach(entry => {
            historyHTML += `<li>${entry.time}: ${entry.name}</li>`;
        });
    });
    historyHTML += '</ul>';
    
    if (historyHTML === '<ul></ul>') {
        historyContent.innerHTML = '<p>履歴がありません。</p>';
    } else {
        historyContent.innerHTML = historyHTML;
    }
    
    historyModal.style.display = 'block';
}

function usePointsWithPassword() {
    const password = prompt('パスワードを入力してください：');
    if (password === '08') {
        const use = Math.floor(sumPoints / usePoints);
        sumPoints = sumPoints % usePoints;
        Object.values(stamps).forEach(stamp => stamp.accessCount = 0);
        saveData();
        
        const currentUrl = new URL(window.location.href);
        const baseUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}`;
        const redirectUrl = `${baseUrl}?reset=true&use=${use}`;
        window.location.href = redirectUrl;
    } else {
        document.getElementById('message').textContent = 'パスワードが間違っています。';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('usePointsButton').addEventListener('click', usePointsWithPassword);
    document.getElementById('historyButton').addEventListener('click', showHistory);
    
    const historyModal = document.getElementById('historyModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    closeBtn.onclick = function() {
        historyModal.style.display = 'none';
    }
    
    window.onclick = function(event) {
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
        window.location.href = 'https://map.example.com';
    });
    
    document.getElementById('exchangeButton').addEventListener('click', () => {
        window.location.href = '/Map/index.html';
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
