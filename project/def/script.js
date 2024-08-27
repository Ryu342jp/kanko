const customStampIDs = [11501, 21802, 36903, 45804, 50085];
const stampData = [
    { id: '11501', image: 'https://ryu342jp.github.io/kanko/project/stamp-01-05.png', points: 10 },
    { id: '21802', image: 'https://ryu342jp.github.io/kanko/project/stamp-01-06.png', points: 15 },
    { id: '36903', image: 'st3.png', points: 20 },
    { id: '45804', image: 'st4.png', points: 25 },
    { id: '50085', image: 'st5.png', points: 30 },
];
const targetLocations = [
    { lat: 32.74940020598272, lon: 129.87958316982198 },
    { lat: 32.80864261545204, lon: 129.87437337696068 },
    { lat: 32.74274063579224, lon: 129.87767150491538 }
];
const maxDistance = 700;

function initializeStamps() {
    if (!localStorage.getItem('accessCounts')) {
        initializeAccessCounts();
    }
    updateStamps();
    updatePoints();
}

function initializeAccessCounts() {
    const accessCounts = {};
    customStampIDs.forEach(id => {
        accessCounts[id] = 0;
    });
    localStorage.setItem('accessCounts', JSON.stringify(accessCounts));
}

function updateStamps() {
    const accessCounts = JSON.parse(localStorage.getItem('accessCounts') || '{}');
    const stampContainer = document.getElementById('stamp-container');
    stampContainer.innerHTML = '';

    const collectedStamps = customStampIDs.filter(id => accessCounts[id] && accessCounts[id] > 0);

    collectedStamps.forEach(id => {
        const stampInfo = stampData.find(stamp => stamp.id === id.toString());
        if (stampInfo) {
            const newStamp = document.createElement('div');
            newStamp.className = 'stamp collected';
            newStamp.style.backgroundImage = `url(${stampInfo.image})`;
            newStamp.innerHTML = `<div class="stamp-count">${accessCounts[id]}</div>`;
            stampContainer.appendChild(newStamp);
        }
    });
}

function updatePoints() {
    const points = parseInt(localStorage.getItem('points') || '0');
    document.getElementById('points').textContent = `所持ポイント：${points}`;
}

function resetPoints() {
    const password = prompt("パスワードを入力してください");
    if (password === "正しいパスワード") {
        localStorage.setItem('points', '0');
        resetAccessCounts();
        updateStamps();
        updatePoints();
        alert("ポイントとアクセスカウントがリセットされました");
    } else {
        alert("パスワードが間違っています");
    }
}

function resetAccessCounts() {
    const accessCounts = {};
    customStampIDs.forEach(id => {
        accessCounts[id] = 0;
    });
    localStorage.setItem('accessCounts', JSON.stringify(accessCounts));
}

function handleStampAccess(id) {
    const accessCounts = JSON.parse(localStorage.getItem('accessCounts') || '{}');
    const points = parseInt(localStorage.getItem('points') || '0');

    if (!accessCounts[id]) {
        accessCounts[id] = 1;
        const stampInfo = stampData.find(stamp => stamp.id === id.toString());
        if (stampInfo) {
            localStorage.setItem('points', points + stampInfo.points);
        }
    } else if (accessCounts[id] === 1) {
        accessCounts[id]++;
    }

    localStorage.setItem('accessCounts', JSON.stringify(accessCounts));
    updateStamps();
    updatePoints();
}

function checkLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            
            let isNearTarget = false;
            for (const target of targetLocations) {
                const distance = calculateDistance(userLat, userLon, target.lat, target.lon);
                if (distance <= maxDistance) {
                    isNearTarget = true;
                    break;
                }
            }
            
            if (isNearTarget) {
                const urlParams = new URLSearchParams(window.location.search);
                const stampId = urlParams.get('id');
                if (stampId && customStampIDs.includes(parseInt(stampId))) {
                    handleStampAccess(parseInt(stampId));
                    alert("スタンプを獲得しました！");
                } else {
                    alert("スタンプを獲得できる場所にいますが、有効なスタンプIDがありません。");
                }
            } else {
                alert("スタンプを獲得できる場所にいません。");
            }
        }, function(error) {
            alert("位置情報の取得に失敗しました: " + error.message);
        });
    } else {
        alert("お使いのブラウザは位置情報をサポートしていません。");
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
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

window.onload = initializeStamps;
