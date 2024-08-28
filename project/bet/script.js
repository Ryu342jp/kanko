const stampData = [
    { id: '115011', image: 'https://ryu342jp.github.io/kanko/project/stamp-01-05.png', points: 10 },
    { id: '115012', image: 'https://ryu342jp.github.io/kanko/project/stamp-01-06.png', points: 15 },
    // 他の店舗のデータを追加...
];

let stamps = {};
let sumPoints = 0;
const usePoints = 5;

function initializeStamps() {
    stampData.forEach(stamp => {
        stamps[stamp.id] = {
            ...stamp,
            read: 0,
            accessCount: 0
        };
    });
}

function renderStamps() {
    const container = document.getElementById('stampContainer');
    container.innerHTML = '';
    
    Object.values(stamps).filter(stamp => stamp.read > 0).forEach(stamp => {
        const stampElement = document.createElement('div');
        stampElement.className = 'stamp';
        stampElement.style.backgroundImage = `url(${stamp.image})`;
        container.appendChild(stampElement);
    });
}

function updatePointsDisplay() {
    document.getElementById('totalPoints').textContent = sumPoints;
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
    // ハーバーサイン公式を使用して距離を計算
    const R = 6371e3; // 地球の半径（メートル）
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // メートル単位の距離
}

function handleQRScan(id) {
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
        } else {
            alert('指定された範囲内にいません。');
        }
    }, error => {
        alert('位置情報の取得に失敗しました。');
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
        document.getElementById('message').textContent = 
            `ポイントが消費され、スタンプが再度獲得可能になりました。${use}回抽選を行えます！`;
    } else {
        alert('パスワードが間違っています。');
    }
}

document.getElementById('usePointsButton').addEventListener('click', usePointsWithPassword);

document.getElementById('locationButton').addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(() => {
            alert('位置情報の使用が許可されています。');
        }, () => {
            alert('位置情報の使用を許可してください。');
        });
    } else {
        alert('お使いのブラウザは位置情報をサポートしていません。');
    }
});

// Map と交換所ボタンのリンク（実際のURLに置き換えてください）
document.getElementById('mapButton').addEventListener('click', () => {
    window.location.href = 'https://map.example.com';
});

document.getElementById('exchangeButton').addEventListener('click', () => {
    window.location.href = 'https://exchange.example.com';
});

// 初期化
initializeStamps();
renderStamps();
updatePointsDisplay();


