const stampData = [
    { id: '1', image: 'https://ryu342jp.github.io/kanko/project/stamp-01-05.png', points: 10 },
    { id: '2', image: 'https://ryu342jp.github.io/kanko/project/stamp-01-06.png', points: 15 },
    // 他の店舗のデータを追加...
];

let stamps = {};
let sumPoints = 0;
const usePoints = 5;

function initializeStamps() {
    // ローカルストレージからデータを読み込む
    const savedStamps = localStorage.getItem('stamps');
    const savedPoints = localStorage.getItem('sumPoints');

    if (savedStamps) {
        stamps = JSON.parse(savedStamps);
    } else {
        stampData.forEach(stamp => {
            stamps[stamp.id] = {
                ...stamp,
                read: 0,
                accessCount: 0
            };
        });
    }

    if (savedPoints) {
        sumPoints = parseInt(savedPoints);
    }
}

function saveData() {
    localStorage.setItem('stamps', JSON.stringify(stamps));
    localStorage.setItem('sumPoints', sumPoints.toString());
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

function checkLocation(latitude, longitude) {
    const locations = [
        { lat: 32.74200160651378, lon: 129.87572498701994 },
        { lat: 32.80864747102957, lon: 129.8744035034573 }
    ];
    
    return locations.some(loc => {
        const distance = calculateDistance(latitude, longitude, loc.lat, loc.lon);
        return distance <= 700;
    });
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

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        if (checkLocation(latitude, longitude)) {
            stamps[id].accessCount++;
            if (stamps[id].accessCount === 1) {
                stamps[id].read++;
                sumPoints += stamps[id].points;
            }
            renderStamps();
            updatePointsDisplay();
            saveData();
            document.getElementById('message').textContent = 'スタンプを獲得しました！';
        } else {
            document.getElementById('message').textContent = '指定された範囲内にいません。';
        }
    }, error => {
        document.getElementById('message').textContent = '位置情報の取得に失敗しました。';
    });
}

function usePointsWithPassword() {
    const password = prompt('パスワードを入力してください：');
    if (password === '08') { // 実際のパスワードに置き換えてください
        const use = Math.floor(sumPoints / usePoints);
        sumPoints = sumPoints % usePoints;
        Object.values(stamps).forEach(stamp => stamp.accessCount = 0);
        renderStamps();
        updatePointsDisplay();
        saveData();
        document.getElementById('message').textContent = 
            `ポイントが消費され、スタンプが再度獲得可能になりました。${use}回抽選を行えます！`;
    } else {
        document.getElementById('message').textContent = 'パスワードが間違っています。';
    }
}

document.getElementById('usePointsButton').addEventListener('click', usePointsWithPassword);

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
    window.location.href = 'https://exchange.example.com';
});

initializeStamps();
renderStamps();
updatePointsDisplay();

// URLからIDを取得してスタンプ獲得処理を行う
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
if (id) {
    handleStampAcquisition(id);
}
